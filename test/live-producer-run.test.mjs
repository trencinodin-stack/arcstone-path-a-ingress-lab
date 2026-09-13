import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { runLiveProducerEvidence } from '../src/live-producer-run.mjs';
import { sha256 } from '../src/evidence.mjs';

test('live producer run preserves exact bytes, replays them, and creates immutable evidence', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'arcstone-live-producer-'));
  const input = path.join(dir, 'external-output.bin');
  const payload = Buffer.from([0x00, 0x41, 0x0a, 0xff, 0x42]);
  await writeFile(input, payload);

  const calls = [];
  const fakeEvaluate = async (bytes, elapsedUs) => {
    calls.push({ bytes: Buffer.from(bytes), elapsedUs });
    return { signal: 'PASS', code: 0, payloadBytes: bytes.byteLength, elapsedUs };
  };

  const evidenceRoot = path.join(dir, 'evidence');
  const result = await runLiveProducerEvidence({
    inputFile: input,
    producer: 'test-external-producer',
    elapsedUs: 5000,
    runId: 'run-test',
    evidenceRoot,
    evaluate: fakeEvaluate,
    recordedAt: () => '2026-09-13T00:00:00.000Z',
  });

  assert.equal(result.experimentStatus, 'PASS');
  assert.equal(result.payloadBytes, payload.byteLength);
  assert.equal(result.payloadSha256, sha256(payload));
  assert.equal(result.identicalExplicitInputs, true);
  assert.equal(result.identicalResults, true);
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[0].bytes, payload);
  assert.deepEqual(calls[1].bytes, payload);
  assert.equal(calls[0].elapsedUs, 5000);
  assert.equal(calls[1].elapsedUs, 5000);

  const preserved = await readFile(path.join(evidenceRoot, 'run-test', 'producer-output.bin'));
  assert.deepEqual(preserved, payload);

  const observations = (await readFile(path.join(evidenceRoot, 'run-test', 'observations.jsonl'), 'utf8'))
    .trim()
    .split('\n')
    .map(JSON.parse);
  assert.equal(observations.length, 2);
  assert.equal(observations[0].phase, 'initial');
  assert.equal(observations[1].phase, 'replay');
  assert.equal(observations[1].previousHash, observations[0].recordHash);

  await assert.rejects(
    () =>
      runLiveProducerEvidence({
        inputFile: input,
        producer: 'test-external-producer',
        elapsedUs: 5000,
        runId: 'run-test',
        evidenceRoot,
        evaluate: fakeEvaluate,
      }),
    /already exists and will not be overwritten/,
  );
});
