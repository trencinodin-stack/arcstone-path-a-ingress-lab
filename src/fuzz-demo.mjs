import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { evaluateProducedBytes, samePathAResult } from './experiment.mjs';
import { randomProducer } from './producers/random.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const evidenceFile = path.join(root, 'runtime', 'fuzz-evidence.jsonl');
await rm(evidenceFile, { force: true });

const iterations = Number.parseInt(process.env.ARCSTONE_LAB_ITERATIONS || '32', 10);
const controlledElapsed = [0, 5_000, 11_990, 11_991];

let deterministicReplays = 0;
for (let i = 0; i < iterations; i += 1) {
  const byteLength = Math.floor(Math.random() * 5_000);
  const produced = randomProducer(byteLength);
  const elapsedUs = controlledElapsed[i % controlledElapsed.length];

  const first = await evaluateProducedBytes({ ...produced, elapsedUs, evidenceFile });
  const replay = await evaluateProducedBytes({
    producer: 'replay-same-bytes',
    payload: produced.payload,
    elapsedUs,
    evidenceFile,
  });

  if (!samePathAResult(first, replay)) {
    throw new Error(`non-deterministic result at iteration ${i}`);
  }
  deterministicReplays += 1;
}

console.log(JSON.stringify({
  iterations,
  deterministicReplays,
  elapsedValuesAreControlledFixtures: controlledElapsed,
  pass: deterministicReplays === iterations,
}, null, 2));
