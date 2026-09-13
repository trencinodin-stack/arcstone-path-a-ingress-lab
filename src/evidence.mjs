import { createHash } from 'node:crypto';
import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export function sha256(data) {
  return createHash('sha256').update(data).digest('hex');
}

export async function appendEvidence(file, record) {
  await mkdir(path.dirname(file), { recursive: true });
  let previousHash = 'GENESIS';
  try {
    const text = await readFile(file, 'utf8');
    const lines = text.trim().split('\n').filter(Boolean);
    if (lines.length) previousHash = JSON.parse(lines.at(-1)).recordHash;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  const body = {
    schema: 'arcstone-path-a-ingress-lab/evidence-v1',
    recordedAt: new Date().toISOString(),
    previousHash,
    ...record,
  };
  const canonicalForHash = JSON.stringify(body);
  const entry = { ...body, recordHash: sha256(canonicalForHash) };
  await appendFile(file, `${JSON.stringify(entry)}\n`, 'utf8');
  return entry;
}
