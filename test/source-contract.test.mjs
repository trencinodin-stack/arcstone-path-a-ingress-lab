import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const lifecycle = await readFile(path.join(root, 'reference/arcstone-continuity-core/src/lifecycle.rs'), 'utf8');
const lib = await readFile(path.join(root, 'reference/arcstone-continuity-core/src/lib.rs'), 'utf8');

test('bundled public core exposes evaluate_frame_bounds in lifecycle.rs', () => {
  assert.match(lifecycle, /pub fn evaluate_frame_bounds\(payload: &\[u8\], elapsed: Micros\)/);
});

test('bundled public core carries the observed bounds', () => {
  assert.match(lib, /MAX_BUFFER_BYTES: usize = 4096/);
  assert.match(lib, /TAU_OVERRIDE_US: u64 = 11_990/);
});

test('lab does not invent src\/hardware\/edge_sanitizer.rs', async () => {
  await assert.rejects(readFile(path.join(root, 'reference/arcstone-continuity-core/src/hardware/edge_sanitizer.rs'), 'utf8'));
});
