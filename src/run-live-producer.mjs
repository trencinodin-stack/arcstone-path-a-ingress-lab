import { parseArgs } from 'node:util';

import { runLiveProducerEvidence } from './live-producer-run.mjs';

const { values } = parseArgs({
  options: {
    input: { type: 'string' },
    producer: { type: 'string' },
    'elapsed-us': { type: 'string' },
    'run-id': { type: 'string', default: 'run-002' },
  },
  strict: true,
  allowPositionals: false,
});

if (!values.input || !values.producer || values['elapsed-us'] === undefined) {
  throw new Error(
    'usage: node src/run-live-producer.mjs --input=<file> --producer=<label> --elapsed-us=<controlled integer> [--run-id=run-002]',
  );
}

if (!/^[0-9]+$/.test(values['elapsed-us'])) {
  throw new Error('--elapsed-us must be a non-negative integer');
}
const elapsedUs = Number(values['elapsed-us']);
if (!Number.isSafeInteger(elapsedUs)) throw new Error('--elapsed-us is outside the safe integer range');

const result = await runLiveProducerEvidence({
  inputFile: values.input,
  producer: values.producer,
  elapsedUs,
  runId: values['run-id'],
});

console.log(JSON.stringify(result, null, 2));
if (result.experimentStatus !== 'PASS') process.exitCode = 1;
