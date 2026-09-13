import test from 'node:test';
import assert from 'node:assert/strict';

import { declaredOriginProducer } from '../src/producers/declared-origin.mjs';
import { sha256 } from '../src/evidence.mjs';

test('declared producer origin does not alter serialized bytes', () => {
  const text = 'same external output';
  const a = declaredOriginProducer('fixture', text);
  const b = declaredOriginProducer('llm-placeholder', text);
  assert.deepEqual(a.payload, b.payload);
  assert.equal(sha256(a.payload), sha256(b.payload));
  assert.notEqual(a.producer, b.producer);
});
