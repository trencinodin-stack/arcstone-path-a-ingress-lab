import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { evaluateProducedBytes, sameExplicitInputs, samePathAResult } from './experiment.mjs';
import { declaredOriginProducer } from './producers/declared-origin.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const evidenceFile = path.join(root, 'runtime', 'provenance-evidence.jsonl');
await rm(evidenceFile, { force: true });

const text = process.argv.slice(2).join(' ') || 'identical bytes, different declared producer labels';
const elapsedUs = 5_000;
const origins = ['static-fixture', 'human', 'script', 'llm-placeholder', 'agent-placeholder'];
const observations = [];

for (const origin of origins) {
  const produced = declaredOriginProducer(origin, text);
  observations.push(await evaluateProducedBytes({ ...produced, elapsedUs, evidenceFile }));
}

const baseline = observations[0];
const inputInvariant = observations.every((o) => sameExplicitInputs(baseline, o));
const resultInvariant = observations.every((o) => samePathAResult(baseline, o));

console.log(JSON.stringify({
  hypothesis: 'producer provenance does not affect Path A result when explicit inputs are identical',
  elapsedUs,
  payloadBytes: baseline.payloadBytes,
  payloadSha256: baseline.payloadSha256,
  producerCount: observations.length,
  identicalExplicitInputs: inputInvariant,
  identicalResults: resultInvariant,
  result: baseline.result,
}, null, 2));

if (!inputInvariant || !resultInvariant) process.exitCode = 1;
