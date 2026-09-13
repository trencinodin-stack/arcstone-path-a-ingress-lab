import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { evaluateProducedBytes } from './experiment.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const evidenceFile = path.join(root, 'runtime', 'matrix-evidence.jsonl');
await rm(evidenceFile, { force: true });

const cases = [
  { name: 'small-under-time', payload: Buffer.from('arcstone'), elapsedUs: 5_000 },
  { name: 'max-size-at-boundary', payload: Buffer.alloc(4_096, 0x41), elapsedUs: 11_990 },
  { name: 'oversize-under-time', payload: Buffer.alloc(4_097, 0x41), elapsedUs: 5_000 },
  { name: 'small-overtime', payload: Buffer.from('arcstone'), elapsedUs: 11_991 },
  { name: 'oversize-overtime', payload: Buffer.alloc(4_097, 0x41), elapsedUs: 11_991 },
];

for (const testCase of cases) {
  const observation = await evaluateProducedBytes({
    producer: `fixture:${testCase.name}`,
    payload: testCase.payload,
    elapsedUs: testCase.elapsedUs,
    evidenceFile,
  });
  console.log(JSON.stringify({ name: testCase.name, ...observation.result }));
}
