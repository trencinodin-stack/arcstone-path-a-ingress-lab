# Build Report

## Arcstone Path A Ingress Lab

**Version:** 0.1.0  
**Status:** Verified experimental baseline  
**Evidence baseline:** Run 001 — Frozen  
**Baseline commit:** `49ce5bf`

## What was built

Version 0.1.0 establishes a producer-agnostic **Path A Ingress Lab** downstream of the Arcstone Continuity Core.

The implementation reflects the experimental architectural boundary:

- the public Rust Continuity Core remains unchanged;
- raw bytes are the only producer output passed to the Path A predicate;
- `elapsed` is a controlled explicit experimental input only;
- producer provenance is evidence metadata, not an Arcstone input;
- no actuator or real-world execution authority is implemented;
- no permit or capability mechanism is implemented;
- no agent-specific schema or semantics are introduced;
- no MCP layer is implemented; and
- no model-provider SDK or API dependency is required.

The lab therefore remains an experimental ingress realization and evidence harness rather than an agent framework, MCP server, or production execution boundary.

## Upstream reference

The lab targets the bundled snapshot of:

```text
arcstone-continuity-core
release: v1.3.1-exec
anchor:  A-77-DELTA-SHIELD-LOCKED
crate:   1.3.1
```

The public Rust function invoked by the downstream bridge is:

```text
src/lifecycle.rs::evaluate_frame_bounds
```

The bundled upstream source is treated as an immutable reference dependency for this experimental baseline.

The lab does not modify its statuses, constants, lattice, thresholds, or predicate behavior.

Reference integrity information is recorded in:

```text
REFERENCE-INTEGRITY.sha256
```

## Initial creation environment

The initial lab artifact was assembled in an environment that had Node.js and npm available but did not have Rust/Cargo installed.

At that stage:

- JavaScript source files were syntax-checked;
- Node-only contract and evidence tests were executed;
- the bundled Continuity Core source structure was inspected;
- the downstream bridge source was generated against the observed public Rust API; and
- Rust compilation and end-to-end bridge execution could not yet be performed in that creation environment.

This was an environment limitation, not a successful Rust verification.

The repository therefore retained full Rust execution as an explicit verification requirement rather than treating generated source as executable evidence.

## Subsequent local verification

The complete repository was later verified on a Windows development host with:

```text
Node.js: v24.15.0
npm:     11.14.1
rustc:   1.98.1 (48a229cea 2026-09-01)
cargo:   1.98.1 (797e8a9bc 2026-08-05)
```

The Windows host also required the Visual Studio C++ build toolchain so Rust could access the MSVC linker.

After that toolchain was installed, the complete verification command succeeded:

```powershell
npm.cmd run verify
```

No weakening of the PowerShell execution policy was required.

## Verification results

The complete local verification path passed.

### Upstream Continuity Core

Rust compilation succeeded for:

```text
arcstone-continuity-core v1.3.1
```

The Rust lifecycle test passed:

```text
lifecycle::tests::test_dual_fault_lattice_homomorphism
```

Result:

```text
1 passed
0 failed
```

The bundled cross-language verification also passed:

```text
lifecycle invariant assertions: PASS
temporal lattice assertions:    PASS
```

### Downstream bridge

The external Rust bridge compiled successfully against the bundled Continuity Core public API.

The bridge invokes:

```rust
evaluate_frame_bounds(&payload, Micros(elapsed_us))
```

Producer provenance is not supplied to the Rust predicate.

### JavaScript contract and evidence tests

All five lab tests passed:

```text
5 passed
0 failed
```

The tests verified:

- local evidence records form the expected experimental hash chain;
- declared producer origin does not alter serialized bytes;
- the bundled public core exposes `evaluate_frame_bounds` in `src/lifecycle.rs`;
- the bundled public core contains the observed boundary constants; and
- the lab does not invent `src/hardware/edge_sanitizer.rs`.

## Controlled boundary matrix

The verified matrix produced:

| Payload | Controlled `elapsed` | Result | Code |
|---|---:|---|---:|
| 8 bytes | 5,000 µs | `PASS` | 0 |
| 4096 bytes | 11,990 µs | `PASS` | 0 |
| 4097 bytes | 5,000 µs | `LEDGER_CORRUPTION` | 30 |
| 8 bytes | 11,991 µs | `FREEZE` | 10 |
| 4097 bytes | 11,991 µs | `FREEZE` | 10 |

The dual-fault local predicate case therefore resolved to `FREEZE` under the existing same-plane dominance behavior of the bundled Rust implementation.

These results describe the local Path A predicate only.

## Producer-provenance experiment

The provenance demonstration used identical explicit predicate inputs while changing only the declared external provenance label.

Observed result:

```text
producerCount:           5
identicalExplicitInputs: true
identicalResults:        true
```

The tested payload contained:

```text
51 bytes
```

with SHA-256:

```text
521cc3f0a309f21db1e172f065feaffb31d136ffadca4132705b14a34d0da599
```

Controlled elapsed input:

```text
5000 µs
```

Observed Path A result:

```text
PASS
code: 0
```

The producer label remained outside the Rust predicate.

## Random-byte deterministic replay

The fuzz/replay experiment completed successfully:

```text
iterations:            32
deterministicReplays: 32
pass:                  true
```

Controlled elapsed fixtures were restricted to:

```text
0
5000
11990
11991
```

No model latency, network latency, host scheduling latency, or measured wall-clock duration was mapped to `elapsed`.

## Evidence Run 001

After successful local verification, the baseline evidence was preserved under:

```text
evidence/run-001/
```

The evidence package contains:

```text
environment.txt
fuzz-evidence.jsonl
matrix-evidence.jsonl
provenance-evidence.jsonl
SHA256SUMS.txt
```

The recorded SHA-256 bindings are:

```text
environment.txt
8B0B77E721E0C03571655737B9A361A550F3B2D5FED5D7B5C4BF3787BB21B0EB

fuzz-evidence.jsonl
4D76D0C401243454C4DD2ED071372A4BCFFFFADDE13B52AA8E3C72C05F1B67AC

matrix-evidence.jsonl
22D7068666A652225220E153DD971C7A6911CC4868E4361A4905E03C34CD20BA

provenance-evidence.jsonl
42CFE097C6F62DDB726FC8669EB96AE4261BAF001BCFC65BAAC0A6EC9F5C0817
```

Evidence Run 001 is frozen.

Later experiments must use new evidence-run directories rather than rewriting or replacing Run 001.

## Baseline source commit

The verified baseline was committed as:

```text
49ce5bf
Establish verified Path A ingress lab baseline
```

This commit represents the source state associated with Evidence Run 001.

Subsequent documentation or experimental development should occur in later commits rather than rewriting this baseline.

## GitHub Actions verification

The baseline was pushed to the repository and the GitHub Actions workflow independently executed the verification path.

Result:

```text
path-a-ingress-lab / verify (push)
Successful
```

The remote verification passed.

This establishes the baseline verification chain:

```text
local verification
        |
        v
Evidence Run 001
        |
        v
SHA-256 evidence bindings
        |
        v
Git commit 49ce5bf
        |
        v
remote repository
        |
        v
GitHub Actions verification
        |
        v
PASS
```

## What this build establishes

The verified build establishes that the downstream lab can invoke the unchanged public Path A predicate using explicit raw payload bytes and controlled elapsed fixtures.

For the tested cases, the observed predicate result is reproducible when the explicit inputs are reproduced.

The provenance experiment additionally shows that changing the declared producer label does not change the Path A result when the explicit predicate inputs remain identical.

## What this build does not establish

The build does not establish:

- general AI safety or alignment;
- autonomous-agent governance;
- that model output or an agent tool call is an Arcstone Frame;
- production execution authorization;
- actuator or capability semantics;
- complete Arcstone execution-membrane behavior;
- Hand/Knife conformance;
- cross-framework interoperability;
- real-world semantic correspondence for `elapsed: Micros`;
- validation of the broader Arcstone architecture; or
- Phase 0 or Phase 1 completion.

## Current build state

```text
Architecture:                    downstream experimental
Continuity Core modifications:  none
Rust bridge:                     compiled
Core verification:              PASS
Lab tests:                       PASS
Boundary matrix:                 PASS
Provenance experiment:           PASS
Deterministic replay:            PASS
Evidence Run 001:                frozen
Local full verification:         PASS
GitHub Actions verification:     PASS
Real-world elapsed mapping:      not implemented
Live nondeterministic producer:  not yet tested
Production authorization:        not implemented
```

## Next build boundary

The deterministic offline baseline is complete.

The next experimental step may attach a live nondeterministic external producer through the existing raw-byte ingress surface.

That experiment must not require modification of the Continuity Core and must continue to use controlled explicit elapsed fixtures.

Any resulting observations should be recorded as a new evidence run.

---

**Build conclusion:** Version 0.1.0 has a reproducible verified baseline. Evidence before expansion remains the governing constraint.
