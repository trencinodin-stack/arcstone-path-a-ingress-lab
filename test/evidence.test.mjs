import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { appendEvidence, sha256 } from '../src/evidence.mjs';

test('evidence records form a local hash chain', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'arcstone-path-a-evidence-'));
  const file = path.join(dir, 'evidence.jsonl');
  const first = await appendEvidence(file, { producer: 'a', payloadSha256: sha256('x') });
  const second = await appendEvidence(file, { producer: 'b', payloadSha256: sha256('y') });
  assert.equal(first.previousHash, 'GENESIS');
  assert.equal(second.previousHash, first.recordHash);
  const rows = (await readFile(file, 'utf8')).trim().split('\n').map(JSON.parse);
  assert.equal(rows.length, 2);
});
