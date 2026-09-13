# AGENTS.md

## Arcstone Path A Ingress Lab

**Status:** EXPERIMENTAL / DOWNSTREAM / NON-CANONICAL

This file is an operating map for autonomous coding agents and other machine-assisted development tools working in this repository.

It is not an Arcstone specification and does not establish architectural authority.

## 1. Repository Role

`arcstone-path-a-ingress-lab` is an independent downstream experimental repository.

Its purpose is to investigate whether heterogeneous external producers can be reduced to the explicit inputs already accepted by the public Arcstone Path A predicate without modifying or reinterpreting the upstream Continuity Core.

Primary upstream executable reference:

- Repository: `trencinodin-stack/arcstone-continuity-core`
- Release: `v1.3.1-exec`
- Anchor: `A-77-DELTA-SHIELD-LOCKED`

This repository is independent, downstream, experimental, evidence-producing, and non-canonical.

It is not a fork of the Continuity Core, the complete Arcstone Computational Spine, an Arcstone execution membrane, an agent framework, an MCP server, or a production authorization system.

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

Experimental evidence may flow upward for review. Evidence does not grant this repository authority over upstream architecture.

When documentation in this repository conflicts with the actual public Continuity Core implementation, stop and investigate the discrepancy. Do not silently reinterpret the upstream implementation.

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
- import broader Arcstone architectural stages into the local predicate;
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

Treat this interface according to the upstream implementation.

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
10. No external object is automatically an Arcstone Frame.

Do not describe an LLM response, agent message, JSON-RPC request, tool call, or API payload as an Arcstone Frame unless future upstream architecture explicitly establishes that correspondence.

## 5. Current Evidence Question

The initial experiment tests:

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

## 6. Allowed Work

Agents may work on downstream experimental infrastructure including:

- Rust bridge code;
- external producer adapters;
- raw-byte serialization;
- controlled test fixtures;
- evidence recording;
- replay tooling;
- provenance metadata;
- deterministic experiment runners;
- CI;
- documentation;
- tests of this repository.

Changes must preserve the experimental contract.

## 7. Prohibited Expansion

Do not add, unless explicitly authorized by a new experiment:

- OpenAI-specific semantics;
- Gemini-specific semantics;
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
- cloud services;
- distributed systems.

A live LLM may later act as an external byte producer. That does not make the repository an AI framework.

## 8. Separation From Other Arcstone Repositories

### Arcstone Continuity Core

Owns the upstream public Path A executable reference. This repository consumes it and does not redefine it.

### Arcstone Path A Ingress Lab

Owns experimental producer adapters, controlled invocation, provenance, evidence capture, and replay.

### Arcstone MCP Sidecar

If developed, it is a separate downstream operational repository. Do not import MCP-sidecar mechanisms into this lab merely because they exist elsewhere.

## 9. Evidence Discipline

Evidence records should preserve enough information to reproduce a run. Where applicable record:

- run identifier;
- repository commit;
- upstream Continuity Core version;
- upstream anchor;
- environment/tool versions;
- producer label;
- payload byte length;
- payload digest;
- explicit elapsed value;
- returned Path A state;
- replay result;
- evidence-chain information.

Producer labels are observational metadata. They must not influence evaluation.

## 10. Required Baseline Matrix

| Payload | Elapsed | Expected Result |
|---|---:|---|
| small | 5,000 us | `PASS` |
| 4096 bytes | 11,990 us | `PASS` |
| 4097 bytes | 5,000 us | `LEDGER_CORRUPTION` |
| small | 11,991 us | `FREEZE` |
| 4097 bytes | 11,991 us | `FREEZE` |

Do not change expected outcomes to make tests pass. A discrepancy is evidence requiring investigation.

## 11. Verification

Before considering a change complete, run the repository verification sequence.

Expected entry point:

```bash
npm run verify
```

or on Windows:

```powershell
.\scripts\verify.ps1
```

Verification should cover:

1. upstream reference tests;
2. Rust bridge compilation;
3. lab contract tests;
4. controlled boundary matrix;
5. provenance experiment;
6. replay/fuzz experiment.

Do not bypass failing upstream tests.

## 12. Stop Conditions

STOP rather than expanding the architecture if work requires:

- modifying Continuity Core;
- inventing a new Arcstone semantic mapping;
- changing an upstream threshold;
- adding a new lattice state;
- treating model latency as `Micros`;
- declaring agent/tool objects to be Arcstone Frames;
- introducing production authorization;
- converting this lab into an agent framework;
- converting this lab into an MCP implementation;
- making claims unsupported by collected evidence.

When a stop condition is reached, document the discrepancy. Do not solve it by silently broadening scope.

## 13. Claim Discipline

Permitted experimental claim:

> For tested cases, the unchanged public Path A predicate returned the same result for identical explicit payload bytes and controlled elapsed inputs regardless of external producer provenance.

Do not infer from this experiment alone:

- AI safety;
- AI alignment;
- agent governance;
- complete execution authorization;
- production security;
- complete Arcstone membrane conformance;
- real-world timing semantics;
- cross-framework interoperability;
- completion of a broader Arcstone phase.

## 14. Working Principle

**Evidence before expansion.**

Preserve the core.

Test the boundary.
