import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const bridgeBinary = path.join(
  repoRoot,
  'bridge',
  'target',
  'debug',
  process.platform === 'win32' ? 'arcstone-path-a-bridge.exe' : 'arcstone-path-a-bridge',
);

export function bridgePath() {
  return bridgeBinary;
}

export async function evaluateWithContinuityCore(payload, elapsedUs) {
  if (!(payload instanceof Uint8Array)) {
    throw new TypeError('payload must be a Uint8Array');
  }
  if (!Number.isSafeInteger(elapsedUs) || elapsedUs < 0) {
    throw new TypeError('elapsedUs must be a non-negative safe integer');
  }

  return new Promise((resolve, reject) => {
    const child = spawn(bridgeBinary, ['--elapsed-us', String(elapsedUs)], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const stdout = [];
    const stderr = [];

    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      const errText = Buffer.concat(stderr).toString('utf8');
      if (code !== 0) {
        reject(new Error(`bridge exited ${code}: ${errText}`));
        return;
      }
      const text = Buffer.concat(stdout).toString('utf8').trim();
      try {
        resolve(JSON.parse(text));
      } catch (error) {
        reject(new Error(`invalid bridge output: ${text}`, { cause: error }));
      }
    });

    child.stdin.end(Buffer.from(payload));
  });
}
