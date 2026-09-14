# AGENTS.md

## Arcstone Path A Ingress Lab

**Status:** EXPERIMENTAL / DOWNSTREAM / NON-CANONICAL / BOUNDED EVIDENCE  
**Version:** 0.1.0  
**Evidence Run 001:** COMPLETE / FROZEN — deterministic baseline  
**Evidence Run 002:** COMPLETE / FROZEN — live external-producer evidence

This file is an operating map for autonomous coding agents and other machine-assisted development tools working in this repository.

It is not an Arcstone specification and does not establish architectural authority.

---

## 1. Repository Role

`arcstone-path-a-ingress-lab` is an independent downstream experimental repository.

Its purpose is to investigate whether output from heterogeneous external producers can be preserved as raw bytes, reduced to the explicit inputs already accepted by the public Arcstone Continuity Core Path A predicate, evaluated without modifying or reinterpreting that predicate, and exactly replayed.

Primary upstream executable reference:

- Repository: `trencinodin-stack/arcstone-continuity-core`
- Release: `v1.3.1-exec`
- Crate version: `1.3.1`
- Anchor: `A-77-DELTA-SHIELD-LOCKED`

This repository is independent, downstream, experimental, evidence-producing, and non-canonical.

It is not:

- a fork of the Continuity Core;
- the complete Arcstone Computational Spine;
- the Arcstone Execution Boundary;
- an execution membrane;
- an agent framework;
- an MCP server;
- a production authorization system; or
- a source of upstream architectural authority.

---

## 2. Public Research Relationship

The public Arcstone research surface consists of three independently scoped repositories:

```text
arcstone-continuity-core
→ establishes the frozen deterministic Path A reference surface.

arcstone-path-a-ingress-lab — THIS REPOSITORY
→ tests whether output from an external, potentially nondeterministic
  producer can be preserved as raw bytes, evaluated through the unchanged
  Path A predicate using explicit controlled inputs, and exactly replayed.

arcstone-mcp-sidecar — Arcstone Execution Boundary
→ independently tests whether an untrusted or nondeterministic producer
  can cause a protected side effect only when a separate boundary-controlled
  authorization condition has been satisfied.
```

The repository and authority topology is:

```text
                 Arcstone Continuity Core
                        FROZEN
                       /      \
                      /        \
                     v          v
       Path A Ingress Lab    Execution Boundary
            THIS REPO        SIBLING DOWNSTREAM
```

The Path A Ingress Lab and Execution Boundary are sibling downstream investigations of the frozen Arcstone Continuity Core.

This relationship is conceptual and evidentiary.

It is not a mandatory runtime pipeline.

Do not introduce a runtime dependency between the Ingress Lab and Execution Boundary merely because they occupy adjacent positions in the public research progression.

The separation is intentional:

```text
deterministic evaluation
≠ authorization
≠ actuation
≠ observed effect
```

A favorable Path A result does not create execution authority.

The Execution Boundary does not require a Path A result to create authorization authority.

---

## 3. Authority Boundary

Within this repository's public research relationship, authority flows downstream from the frozen executable reference:

```text
Arcstone Continuity Core
        |
        | frozen public Path A predicate
        v
Arcstone Path A Ingress Lab
        |
        | experimental observations
        v
local evidence
```

Experimental evidence may inform later research or review.

It does not grant this repository authority over the Continuity Core.

A successful downstream experiment does not automatically modify, reinterpret, supersede, or extend upstream semantics.

When documentation in this repository conflicts with the actual public Continuity Core executable implementation, stop and investigate the discrepancy.

Do not silently reinterpret the upstream implementation.

---

## 4. Frozen Upstream Contract

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
- import broader Arcstone architectural stages into the local Rust predicate; or
- claim that this repository completes a broader Arcstone execution architecture.

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

---

## 5. Experimental Contract

For v0.1:

1. External producer output is treated as untrusted data.
2. Producer output may be reduced to raw bytes.
3. The exact evaluated byte sequence must be preserved when replay is claimed.
4. Producer identity is provenance metadata only.
5. Producer identity MUST NOT affect Path A evaluation.
6. `elapsed: Micros` MUST use explicit controlled experimental values.
7. Real LLM inference latency MUST NOT be mapped to `elapsed`.
8. Network latency MUST NOT be mapped to `elapsed`.
9. Host scheduling latency MUST NOT be mapped to `elapsed`.
10. Tool-call duration MUST NOT be mapped to `elapsed`.
11. Total wall-clock duration MUST NOT be mapped to `elapsed`.
12. No external object is automatically an Arcstone Frame.
13. `PASS` MUST NOT be interpreted as authorization for a real-world side effect.
14. Producer provenance MUST remain outside the deterministic predicate.
15. Frozen evidence runs MUST NOT be rewritten to accommodate later experiments.

Do not describe an LLM response, agent message, JSON-RPC request, tool call, API payload, or other external producer object as an Arcstone Frame unless future upstream architecture explicitly establishes that correspondence.

Measurement of a quantity does not establish semantic correspondence with `elapsed: Micros`.

---

## 6. Experimental Question

The core experimental relationship is:

```text
payload bytes P
+ explicit controlled elapsed T
--------------------------------
Path A result R
```

Conceptually:

```text
R = f(P, T)
```

Producer identity or provenance `Q` must not silently transform the predicate into:

```text
R = f(P, T, Q)
```

Producer metadata therefore remains outside the Rust evaluation call.

The lab tests whether producer mechanism can change while the explicit predicate contract remains unchanged.

---

## 7. Evidence Run 001 — Deterministic Baseline

Evidence Run 001 is the frozen deterministic baseline for version 0.1.0.

It established the local verification baseline before introduction of a live nondeterministic external producer.

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

The baseline source state is associated with:

```text
49ce5bf
```

Preserved evidence is located under:

```text
evidence/run-001/
```

Evidence Run 001 MUST NOT be rewritten, replaced, or repurposed.

It is a frozen baseline.

---

## 8. Evidence Run 002 — Live External Producer

Evidence Run 002 is the completed and frozen live external-producer experiment.

Run 002 introduced output originating from a live external nondeterministic producer while preserving the experimental contract.

The producer remained outside the Continuity Core.

The evaluated producer output was preserved as raw bytes before deterministic evaluation.

The experiment used an explicit controlled elapsed fixture.

The preserved payload was then replayed using the same explicit predicate inputs.

The bounded observation established by Run 002 is:

> Serialized output from a live external nondeterministic producer was preserved as raw bytes, evaluated through the unchanged Path A predicate using a controlled explicit elapsed input, and exactly replayed with the same deterministic result.

Run 002 does not establish:

- real model inference timing semantics;
- real network latency semantics;
- model alignment;
- AI safety;
- production authorization;
- execution-boundary behavior;
- general agent security;
- complete Arcstone architecture validation; or
- producer-independent correctness beyond the tested evidence boundary.

Run 002 MUST remain separate from Run 001.

Run 001 is the deterministic baseline.

Run 002 is the live external-producer evidence run.

Neither frozen evidence run may be rewritten to support later claims.

---

## 9. Allowed Work

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

Any future experimental work must create new evidence rather than altering Run 001 or Run 002.

---

## 10. Prohibited Expansion

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

Do not import Execution Boundary mechanisms into this repository merely because they exist in another Arcstone repository.

---

## 11. Separation From Other Public Arcstone Repositories

### Arcstone Continuity Core

`arcstone-continuity-core` owns the upstream public deterministic Path A executable reference.

This repository consumes that frozen reference and does not redefine it.

### Arcstone Path A Ingress Lab

`arcstone-path-a-ingress-lab` owns this downstream experimental surface:

```text
external producer
        |
        | serialized raw bytes
        v
preserved payload
        |
        | payload + controlled elapsed
        v
unchanged Path A predicate
        |
        v
deterministic result
        |
        v
evidence + exact replay
```

This repository owns producer ingress experiments, controlled invocation, provenance metadata, evidence capture, and replay within its stated experimental boundary.

It does not own execution authorization or protected actuation.

### Arcstone Execution Boundary

Repository identity:

```text
arcstone-mcp-sidecar
```

System identity:

```text
Arcstone Execution Boundary
```

The Execution Boundary is a separate sibling downstream experimental repository.

Its bounded research question concerns deterministic authorization and controlled protected actuation from untrusted or nondeterministic producers.

The Ingress Lab does not provide execution authority to the Execution Boundary.

The Execution Boundary does not redefine Path A semantics.

Do not infer:

```text
Path A PASS
⇒ authorization
```

Do not infer:

```text
Ingress Lab
⇒ mandatory Execution Boundary runtime dependency
```

The repositories remain operationally independent unless a future experiment explicitly establishes and tests a new dependency.

---

## 12. Evidence Discipline

Evidence records should preserve enough information to reproduce a run.

Where applicable record:

- run identifier;
- repository commit;
- upstream Continuity Core version;
- upstream release;
- upstream anchor;
- environment and tool versions;
- producer class or provenance label;
- exact preserved payload bytes or unambiguous byte-identical artifact;
- payload byte length;
- payload cryptographic digest;
- explicit controlled elapsed value;
- returned Path A state;
- returned Path A status code;
- replay result; and
- evidence-chain or evidence-integrity information.

Producer labels are observational metadata.

They MUST NOT influence Path A evaluation.

For external-producer experiments, preserve the exact evaluated byte sequence or otherwise establish an unambiguous byte-identical artifact before claiming deterministic replay.

Do not rely solely on visually identical terminal text as evidence of byte identity.

Shells, pipes, encodings, serialization, and newline behavior may alter bytes.

Replay means evaluating the exact previously preserved bytes again with the same explicit controlled predicate inputs.

A second response from a nondeterministic producer is not a replay.

---

## 13. Required Baseline Matrix

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

---

## 14. Verification

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

Frozen Run 001 and Run 002 evidence must remain unchanged.

---

## 15. Completed Live-Producer Boundary

The first live nondeterministic external-producer experiment has been completed as Evidence Run 002.

The admissible boundary used for that experiment was:

```text
live external producer
        |
        | output
        v
preserved raw bytes
        |
        | exact payload
        | controlled elapsed fixture
        v
experimental ingress
        |
        v
unchanged Path A predicate
        |
        v
deterministic result
        |
        v
exact replay of preserved bytes
```

The producer remained outside the deterministic predicate.

Producer identity remained provenance metadata.

The experiment did not map real producer latency, model inference latency, network latency, or total wall-clock duration to `elapsed: Micros`.

The exact preserved bytes, rather than a newly generated producer response, formed the replay input.

Run 002 is complete and frozen.

Any future live-producer experiment requires a new evidence-run identifier.

Do not rewrite Run 002.

`NEXT-LIVE-PRODUCER.md` may remain as historical/prospective experiment documentation, but it must not be interpreted as evidence that Run 002 is still pending.

---

## 16. Stop Conditions

STOP rather than expanding the architecture if work requires:

- modifying Continuity Core;
- inventing a new Arcstone semantic mapping;
- changing an upstream threshold;
- adding a new lattice state;
- treating model latency as `Micros`;
- declaring agent, tool, API, or model objects to be Arcstone Frames;
- introducing production authorization into this repository;
- attaching irreversible real-world execution to a Path A `PASS`;
- converting this lab into an agent framework;
- converting this lab into an MCP implementation;
- importing Execution Boundary mechanisms;
- creating a mandatory runtime dependency on the Execution Boundary;
- rewriting frozen Run 001 evidence;
- rewriting frozen Run 002 evidence;
- allowing producer metadata to affect the Path A predicate; or
- making claims unsupported by collected evidence.

When a stop condition is reached, document the discrepancy.

Do not solve it by silently broadening scope.

---

## 17. Claim Discipline

Permitted deterministic baseline claim from Run 001:

> For tested cases, the unchanged public Path A predicate returned the same result for identical explicit payload bytes and controlled elapsed inputs regardless of external producer provenance.

Permitted bounded live-producer claim from Run 002:

> Serialized output from a live external nondeterministic producer was preserved as raw bytes, evaluated through the unchanged Path A predicate using a controlled explicit elapsed input, and exactly replayed with the same deterministic result.

Do not expand either claim beyond the collected evidence.

Do not infer from this repository alone:

- AI safety;
- AI alignment;
- model correctness;
- agent governance;
- execution authorization;
- production security;
- complete execution-membrane behavior;
- MCP security;
- production MCP integration;
- real-world timing semantics;
- cross-framework interoperability;
- validation of the broader Arcstone architecture;
- universal producer independence;
- protected-actuation guarantees; or
- completion of a broader Arcstone research phase.

---

## 18. Repository Freeze Discipline

Run 001 and Run 002 are completed evidence milestones.

Preserve them.

Do not continue modifying this repository merely to expand its conceptual scope.

Future work belongs here only when it tests a new admissible ingress question without changing the frozen Continuity Core or rewriting completed evidence.

If a proposed investigation primarily concerns authorization, protected resources, or controlled actuation, it belongs in the Arcstone Execution Boundary rather than this repository.

If no new ingress question is justified by evidence, preserve the current repository state.

---

## 19. Working Principle

> **Evidence before expansion. Preserve the core. Test the boundary. Freeze completed evidence.**
