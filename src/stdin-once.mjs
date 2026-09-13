import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { evaluateProducedBytes } from './experiment.mjs';

const elapsedArg = process.argv.find((arg) => arg.startsWith('--elapsed-us='));
if (!elapsedArg) throw new Error('usage: npm run eval:stdin -- --elapsed-us=<controlled integer>');
const elapsedUs = Number(elapsedArg.split('=')[1]);
if (!Number.isSafeInteger(elapsedUs) || elapsedUs < 0) throw new Error('invalid --elapsed-us');

const payload = await readFile(0);
const here = path.dirname(fileURLToPath(import.meta.url));
const evidenceFile = path.resolve(here, '..', 'runtime', 'stdin-evidence.jsonl');
const observation = await evaluateProducedBytes({ producer: 'stdin-external-producer', payload, elapsedUs, evidenceFile });
console.log(JSON.stringify(observation, null, 2));
