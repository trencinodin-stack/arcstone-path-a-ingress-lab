# AGENTS.md

## Arcstone Path A Ingress Lab

**Status:** EXPERIMENTAL / DOWNSTREAM / NON-CANONICAL  
**Version:** 0.1.0  
**Verified baseline:** Evidence Run 001 — PASS / Frozen  
**Baseline commit:** `49ce5bf`

This file is an operating map for autonomous coding agents and other machine-assisted development tools working in this repository.

It is not an Arcstone specification and does not establish architectural authority.

## 1. Repository Role

`arcstone-path-a-ingress-lab` is an independent downstream experimental repository.

Its purpose is to investigate whether heterogeneous external producers can be reduced to the explicit inputs already accepted by the public Arcstone Path A predicate without modifying or reinterpreting the upstream Continuity Core.

Primary upstream executable reference:

- Repository: `trencinodin-stack/arcstone-continuity-core`
- Release: `v1.3.1-exec`
- Crate version: `1.3.1`
- Anchor: `A-77-DELTA-SHIELD-LOCKED`

This repository is independent, downstream, experimental, evidence-producing, and non-canonical.

It is not:

- a fork of the Continuity Core;
- the complete Arcstone Computational Spine;
- the Arcstone execution membrane;
- an agent framework;
- an MCP server;
- a production authorization system; or
- a source of upstream architectural authority.

## 2. Authority Boundary

Authority flows downstream:

```text
Master Substrate
      |
      v
Continuity Core
      |
      v
Path A Ingress Lab
```

Experimental evidence may flow upward for review:

```text
Path A Ingress Lab
      |
      | evidence
      v
upstream evaluation
```

Evidence does not grant this repository authority over upstream architecture.

A successful downstream experiment does not automatically modify, reinterpret, supersede, or extend upstream semantics.

When documentation in this repository conflicts with the actual public Continuity Core implementation, stop and investigate the discrepancy.

Do not silently reinterpret the upstream implementation.

## 3. Frozen Upstream Contract

The Continuity Core must remain unchanged by this experiment.

Agents MUST NOT:

- modify upstream Continuity Core source;
- change `MAX_BUFFER_BYTES`;
- change `TAU_OVERRIDE_US`;
- change POSIX/status identifiers;
- change lattice precedence;
- introduce new lattice states;
- redefine `evaluate_frame_bounds()`;
- infer precedence from raw numeric status values;
- import broader Arcstone architectural stages into the local predicate; or
- claim that this repository completes the Arcstone execution membrane.

The current Path A predicate accepts:

```text
payload: &[u8]
elapsed: Micros
```

and returns:

```text
PosixSignal
```

Treat this interface according to the upstream executable implementation.

The executable function used by this lab is:

```text
src/lifecycle.rs::evaluate_frame_bounds
```

The bundled upstream snapshot does not contain:

```text
src/hardware/edge_sanitizer.rs
```

Do not invent that path or substitute broader architectural documentation for executable implementation.

## 4. Experimental Contract

For v0.1:

1. External producer output is treated as untrusted data.
2. Producer output may be reduced to raw bytes.
3. Producer identity is metadata only.
4. Producer identity MUST NOT affect Path A evaluation.
5. `elapsed: Micros` MUST use explicit controlled experimental values.
6. Real LLM inference latency MUST NOT be mapped to `elapsed`.
7. Network latency MUST NOT be mapped to `elapsed`.
8. Host scheduling latency MUST NOT be mapped to `elapsed`.
9. Tool-call duration MUST NOT be mapped to `elapsed`.
10. Total wall-clock duration MUST NOT be mapped to `elapsed`.
11. No external object is automatically an Arcstone Frame.
12. `PASS` MUST NOT be interpreted as authorization for a real-world side effect.

Do not describe an LLM response, agent message, JSON-RPC request, tool call, API payload, or other external producer object as an Arcstone Frame unless future upstream architecture explicitly establishes that correspondence.

Measurement of a quantity does not establish semantic correspondence with `elapsed: Micros`.

## 5. Current Evidence Question

The baseline experiment tests:

```text
identical payload bytes
+ identical explicit elapsed value
----------------------------------
identical Path A result
```

regardless of producer provenance.

Conceptually:

```text
R = f(P, T)
```

Producer identity `Q` must not silently transform the predicate into:

```text
R = f(P, T, Q)
```

Producer metadata therefore remains outside the Rust evaluation call.

## 6. Verified Baseline

Evidence Run 001 is the frozen deterministic baseline for version 0.1.0.

It passed:

- upstream Continuity Core Rust tests;
- upstream cross-language lifecycle verification;
- upstream temporal lattice verification;
- downstream Rust bridge compilation;
- lab contract and evidence tests;
- controlled boundary matrix;
- producer-provenance invariance demonstration;
- random-byte deterministic replay; and
- GitHub Actions verification.

The baseline source state is:

```text
49ce5bf
```

Preserved evidence is located under:

```text
evidence/run-001/
```

Evidence Run 001 MUST NOT be rewritten, replaced, or repurposed for later experiments.

Future evidence belongs in new run directories.

## 7. Allowed Work

Agents may work on downstream experimental infrastructure including:

- Rust bridge code;
- external producer adapters;
- raw-byte serialization;
- byte-preservation tooling;
- controlled test fixtures;
- evidence recording;
- evidence hashing;
- replay tooling;
- provenance metadata;
- deterministic experiment runners;
- CI;
- documentation; and
- tests belonging to this repository.

Changes must preserve the experimental contract.

A downstream experimental adapter may change without changing the Continuity Core.

The existence of an adapter does not establish new upstream semantics.

## 8. Prohibited Expansion

Do not add, unless explicitly authorized by a new experiment:

- OpenAI-specific Arcstone semantics;
- Gemini-specific Arcstone semantics;
- Anthropic-specific Arcstone semantics;
- agent-specific Arcstone semantics;
- MCP architecture;
- A2A architecture;
- actuator systems;
- capability grants;
- execution authorization;
- production policy engines;
- new Arcstone states;
- new Arcstone timing semantics;
- UI layers;
- cloud services; or
- distributed systems.

Do not add a model-provider SDK merely to obtain experimental producer output when the producer can remain external.

A live LLM or agent may act as an external byte producer.

That does not make this repository an AI framework.

## 9. Separation From Other Arcstone Repositories

### Arcstone Continuity Core

Owns the upstream public Path A executable reference.

This repository consumes it and does not redefine it.

### Arcstone Path A Ingress Lab

Owns downstream experimental producer adapters, controlled invocation, provenance, evidence capture, and replay.

It does not own production execution authorization.

### Arcstone MCP Sidecar

If developed, it is a separate downstream operational repository.

Conceptually:

```text
arcstone-continuity-core
         /       \
        /         \
       v           v
ingress-lab     mcp-sidecar
experiment      implementation
```

Do not import MCP-sidecar mechanisms into this lab merely because they exist elsewhere.

The Ingress Lab and MCP Sidecar must not become architecturally dependent on one another merely for implementation convenience.

## 10. Evidence Discipline

Evidence records should preserve enough information to reproduce a run.

Where applicable record:

- run identifier;
- repository commit;
- upstream Continuity Core version;
- upstream release;
- upstream anchor;
- environment and tool versions;
- producer class or label;
- payload byte length;
- payload cryptographic digest;
- explicit controlled elapsed value;
- returned Path A state;
- returned Path A status code;
- replay result; and
- evidence-chain or evidence-integrity information.

Producer labels are observational metadata.

They MUST NOT influence Path A evaluation.

For live-producer experiments, preserve the exact evaluated byte sequence or otherwise establish an unambiguous byte-identical artifact before claiming deterministic replay.

Do not rely solely on visually identical terminal text as evidence of byte identity.

Shells, pipes, encodings, and newline behavior may alter bytes.

## 11. Required Baseline Matrix

| Payload | Controlled `elapsed` | Expected Result |
|---|---:|---|
| small | 5,000 µs | `PASS` |
| 4096 bytes | 11,990 µs | `PASS` |
| 4097 bytes | 5,000 µs | `LEDGER_CORRUPTION` |
| small | 11,991 µs | `FREEZE` |
| 4097 bytes | 11,991 µs | `FREEZE` |

Do not change expected outcomes to make tests pass.

A discrepancy is evidence requiring investigation.

The dual-fault local case:

```text
payload > 4096 bytes
elapsed > 11,990 µs
```

must continue to resolve according to the existing upstream same-plane lattice behavior.

Do not infer lattice precedence from raw status-code magnitude.

## 12. Verification

Before considering a change complete, run the repository verification sequence.

Expected entry point:

```bash
npm run verify
```

On Windows, where the PowerShell npm shim may be blocked:

```powershell
npm.cmd run verify
```

The repository also provides:

```powershell
.\scripts\verify.ps1
```

Verification should cover:

1. upstream reference tests;
2. Rust bridge compilation;
3. lab contract tests;
4. controlled boundary matrix;
5. provenance experiment; and
6. replay/fuzz experiment.

Do not bypass failing upstream tests.

Do not alter expected results merely to obtain a green build.

Documentation-only changes do not require rewriting a frozen evidence run.

## 13. Live-Producer Experiment Boundary

The deterministic baseline prerequisite has been satisfied by Evidence Run 001.

A live nondeterministic producer may now be introduced as a new downstream experiment.

The producer should initially remain external to the lab:

```text
live producer
      |
      | bytes
      v
experimental ingress
      |
      v
unchanged Path A predicate
```

For the first live-producer experiment:

- preserve the exact evaluated bytes;
- record payload length and cryptographic digest;
- use a controlled explicit elapsed fixture;
- evaluate the preserved payload;
- replay the exact same bytes with the same elapsed fixture;
- compare the Path A result;
- preserve observations under a new evidence-run identifier.

Do not request a second model response and call it a replay.

Replay means evaluating the exact previously preserved bytes again.

Any live-producer evidence must remain separate from Evidence Run 001.

See:

```text
NEXT-LIVE-PRODUCER.md
```

## 14. Stop Conditions

STOP rather than expanding the architecture if work requires:

- modifying Continuity Core;
- inventing a new Arcstone semantic mapping;
- changing an upstream threshold;
- adding a new lattice state;
- treating model latency as `Micros`;
- declaring agent, tool, API, or model objects to be Arcstone Frames;
- introducing production authorization;
- attaching irreversible real-world execution to a Path A `PASS`;
- converting this lab into an agent framework;
- converting this lab into an MCP implementation;
- importing MCP-sidecar mechanisms;
- rewriting frozen evidence;
- allowing producer metadata to affect the Path A predicate; or
- making claims unsupported by collected evidence.

When a stop condition is reached, document the discrepancy.

Do not solve it by silently broadening scope.

## 15. Claim Discipline

Permitted baseline experimental claim:

> For tested cases, the unchanged public Path A predicate returned the same result for identical explicit payload bytes and controlled elapsed inputs regardless of external producer provenance.

A future live-producer experiment may extend this claim only to the observations actually collected.

Do not infer from this experiment alone:

- AI safety;
- AI alignment;
- model correctness;
- agent governance;
- complete execution authorization;
- production security;
- complete Arcstone membrane conformance;
- real-world timing semantics;
- cross-framework interoperability;
- validation of the broader Arcstone architecture; or
- completion of a broader Arcstone phase.

## 16. Working Principle

**Evidence before expansion.**

Preserve the core.

Test the boundary.
