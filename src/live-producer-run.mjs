import { access, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { evaluateWithContinuityCore } from './core.mjs';
import { appendEvidence, sha256 } from './evidence.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultEvidenceRoot = path.resolve(here, '..', 'evidence');

function requireSafeRunId(runId) {
  if (typeof runId !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(runId)) {
    throw new TypeError('runId must contain only letters, digits, dot, underscore, or hyphen and must start with a letter or digit');
  }
}

function requireProducer(producer) {
  if (typeof producer !== 'string' || !producer.trim()) {
    throw new TypeError('producer must be a non-empty string');
  }
}

function requireElapsed(elapsedUs) {
  if (!Number.isSafeInteger(elapsedUs) || elapsedUs < 0) {
    throw new TypeError('elapsedUs must be a non-negative safe integer');
  }
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

function sameResult(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function sha256File(file) {
  return sha256(await readFile(file));
}

export async function runLiveProducerEvidence({
  inputFile,
  producer,
  elapsedUs,
  runId = 'run-002',
  evidenceRoot = defaultEvidenceRoot,
  evaluate = evaluateWithContinuityCore,
  recordedAt = () => new Date().toISOString(),
}) {
  if (typeof inputFile !== 'string' || !inputFile) throw new TypeError('inputFile must be a non-empty path string');
  requireProducer(producer);
  requireElapsed(elapsedUs);
  requireSafeRunId(runId);
  if (typeof evaluate !== 'function') throw new TypeError('evaluate must be a function');

  const targetDir = path.resolve(evidenceRoot, runId);
  if (await exists(targetDir)) {
    throw new Error(`evidence run already exists and will not be overwritten: ${targetDir}`);
  }

  await mkdir(path.resolve(evidenceRoot), { recursive: true });
  const tempDir = path.resolve(evidenceRoot, `.${runId}.in-progress-${process.pid}-${Date.now()}`);
  await mkdir(tempDir, { recursive: false });

  const preservedPayloadFile = path.join(tempDir, 'producer-output.bin');
  const observationsFile = path.join(tempDir, 'observations.jsonl');
  const summaryFile = path.join(tempDir, 'summary.json');
  const environmentFile = path.join(tempDir, 'environment.txt');
  const sumsFile = path.join(tempDir, 'SHA256SUMS.txt');

  let finalized = false;
  try {
    // Capture and preserve the exact serialized bytes before any Path A evaluation.
    const sourceBytes = await readFile(inputFile);
    const sourceHash = sha256(sourceBytes);
    await writeFile(preservedPayloadFile, sourceBytes);

    const preservedBytes = await readFile(preservedPayloadFile);
    const preservedHash = sha256(preservedBytes);
    if (sourceHash !== preservedHash || sourceBytes.byteLength !== preservedBytes.byteLength) {
      throw new Error('preserved payload does not match source bytes');
    }

    const initialResult = await evaluate(preservedBytes, elapsedUs);
    const initial = {
      runId,
      phase: 'initial',
      producer,
      payloadBytes: preservedBytes.byteLength,
      payloadSha256: preservedHash,
      elapsedUs,
      result: initialResult,
    };
    await appendEvidence(observationsFile, initial);

    // Replay by re-reading the preserved evidence payload, not the original source file.
    const replayBytes = await readFile(preservedPayloadFile);
    const replayHash = sha256(replayBytes);
    const replayResult = await evaluate(replayBytes, elapsedUs);
    const replay = {
      runId,
      phase: 'replay',
      producer,
      payloadBytes: replayBytes.byteLength,
      payloadSha256: replayHash,
      elapsedUs,
      result: replayResult,
    };
    await appendEvidence(observationsFile, replay);

    const identicalExplicitInputs =
      initial.payloadSha256 === replay.payloadSha256 &&
      initial.payloadBytes === replay.payloadBytes &&
      initial.elapsedUs === replay.elapsedUs;
    const identicalResults = sameResult(initial.result, replay.result);
    const experimentStatus = identicalExplicitInputs && identicalResults ? 'PASS' : 'FAIL';

    const summary = {
      schema: 'arcstone-path-a-ingress-lab/live-producer-run-v1',
      runId,
      experimentStatus,
      completedAt: recordedAt(),
      producer,
      sourceFileName: path.basename(inputFile),
      payloadBytes: initial.payloadBytes,
      payloadSha256: initial.payloadSha256,
      controlledElapsedUs: elapsedUs,
      elapsedSemantics: 'controlled-explicit-fixture-only',
      initialPathAResult: initial.result,
      replayPathAResult: replay.result,
      identicalExplicitInputs,
      identicalResults,
      claimBoundary: 'External producer identity is metadata only; the preserved raw bytes and controlled elapsed value are the only experiment inputs passed to the existing Path A evaluation boundary.',
    };
    await writeFile(summaryFile, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

    const environment = [
      `run_id=${runId}`,
      `experiment_status=${experimentStatus}`,
      `recorded_at=${summary.completedAt}`,
      `node=${process.version}`,
      `platform=${process.platform}`,
      `arch=${process.arch}`,
      `producer=${producer}`,
      `payload_bytes=${initial.payloadBytes}`,
      `payload_sha256=${initial.payloadSha256}`,
      `controlled_elapsed_us=${elapsedUs}`,
      'elapsed_semantics=controlled-explicit-fixture-only',
      'wall_clock_latency_used=false',
    ].join('\n');
    await writeFile(environmentFile, `${environment}\n`, 'utf8');

    const filesForManifest = [
      'environment.txt',
      'observations.jsonl',
      'producer-output.bin',
      'summary.json',
    ];
    const manifestLines = [];
    for (const name of filesForManifest) {
      manifestLines.push(`${await sha256File(path.join(tempDir, name))}  ${name}`);
    }
    await writeFile(sumsFile, `${manifestLines.join('\n')}\n`, 'utf8');

    await rename(tempDir, targetDir);
    finalized = true;

    return {
      ...summary,
      evidenceDirectory: targetDir,
      files: [...filesForManifest, 'SHA256SUMS.txt'],
    };
  } finally {
    if (!finalized && (await exists(tempDir))) {
      // Failed runs are not promoted into an immutable evidence/run-* directory.
      await rm(tempDir, { recursive: true, force: true });
    }
  }
}
