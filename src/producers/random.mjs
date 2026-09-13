import { randomBytes } from 'node:crypto';

export function randomProducer(byteLength) {
  if (!Number.isSafeInteger(byteLength) || byteLength < 0) {
    throw new TypeError('byteLength must be a non-negative safe integer');
  }
  return {
    producer: 'random-bytes',
    payload: randomBytes(byteLength),
  };
}
