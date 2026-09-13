import { evaluateWithContinuityCore } from './core.mjs';
import { appendEvidence, sha256 } from './evidence.mjs';

export async function evaluateProducedBytes({ producer, payload, elapsedUs, evidenceFile }) {
  if (typeof producer !== 'string' || !producer) throw new TypeError('producer must be a non-empty string');
  if (!(payload instanceof Uint8Array)) throw new TypeError('payload must be a Uint8Array');

  const result = await evaluateWithContinuityCore(payload, elapsedUs);
  const observation = {
    producer,
    payloadBytes: payload.byteLength,
    payloadSha256: sha256(Buffer.from(payload)),
    elapsedUs,
    result,
  };

  if (evidenceFile) {
    observation.evidence = await appendEvidence(evidenceFile, observation);
  }
  return observation;
}

export function sameExplicitInputs(a, b) {
  return a.payloadSha256 === b.payloadSha256 && a.elapsedUs === b.elapsedUs;
}

export function samePathAResult(a, b) {
  return JSON.stringify(a.result) === JSON.stringify(b.result);
}
