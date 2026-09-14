# Arcstone Path A Ingress Lab

**Status:** Experimental / Downstream / Non-Canonical  
**Version:** 0.1.0  
**Upstream reference:** `arcstone-continuity-core` v1.3.1 (`v1.3.1-exec`)  
**Purpose:** Test producer-independent invocation of the existing Rust Path A predicate without modifying the frozen Continuity Core or introducing producer-specific semantics.

This repository occupies the **middle experimental position** in the public Arcstone research progression. It tests external-producer ingress and replay against the unchanged Continuity Core predicate. Its results do not confer execution authority.

## Overview

Arcstone Path A Ingress Lab is a downstream experimental reference environment for testing how arbitrary external producers can be reduced to the explicit inputs already accepted by the public Arcstone Continuity Core Path A predicate.

The lab does not extend the Continuity Core and does not define new Arcstone architecture.

It asks one narrow question:

> Does the unchanged deterministic Path A predicate preserve its result when the origin of the input bytes changes, provided the explicit inputs are identical?

The experiment treats producer identity as provenance metadata only. It is not an input to the Rust predicate.

## Public research relationship

The public Arcstone research surface consists of three independently scoped repositories:

**[`arcstone-continuity-core`](https://github.com/trencinodin-stack/arcstone-continuity-core)**  
→ establishes the frozen deterministic Path A reference surface.

**`arcstone-path-a-ingress-lab` — this repository**  
→ tests whether output from an external, potentially nondeterministic producer can be preserved as raw bytes, evaluated through the unchanged Path A predicate using explicit controlled inputs, and exactly replayed.

**[`arcstone-mcp-sidecar`](https://github.com/trencinodin-stack/arcstone-mcp-sidecar) — Arcstone Execution Boundary**  
→ independently tests whether an untrusted or nondeterministic producer can cause a protected side effect only when a separate boundary-controlled authorization condition has been satisfied.

The repository and authority topology is:

```text
                 Arcstone Continuity Core
                        FROZEN
                       /      \
                      /        \
                     ▼          ▼
       Path A Ingress Lab    Execution Boundary
            THIS REPO       SIBLING DOWNSTREAM
```

The Path A Ingress Lab and Execution Boundary are sibling downstream investigations of the frozen Arcstone Continuity Core.

The three repositories also form a conceptual research and evidence progression:

```text
deterministic evaluation
        ↓
external-producer ingress and replay
        ↓
independent authorization and controlled actuation
```

This progression is **not a mandatory runtime pipeline**.

The Execution Boundary does not derive authorization from this lab, and a favorable Path A result does not itself authorize actuation.

The separation is intentional:

**deterministic evaluation ≠ authorization ≠ actuation ≠ observed effect**

Each repository is independently scoped, testable, and reproducible within its stated evidence boundary.

## Current evidence

Evidence Run 001 established the local deterministic baseline for version 0.1.0.

The complete verification chain passed:

- bundled Continuity Core Rust tests;
- bundled cross-language lifecycle and temporal conformance tests;
- downstream bridge compilation;
- JavaScript contract and evidence tests;
- controlled Path A boundary matrix;
- producer-provenance invariance demonstration; and
- random-byte deterministic replay.

Run 001 is preserved under:

```text
evidence/run-001/
```

with an environment record, JSONL evidence, and SHA-256 manifest.

The verified Run 001 baseline is associated with Git commit:

```text
49ce5bf
```

GitHub Actions independently reproduced the verification workflow for that baseline.

### Evidence Run 002

Evidence Run 002 extended the experiment to output from a live external nondeterministic producer.

The producer remained outside the Continuity Core. Its serialized output was preserved as raw bytes and evaluated through the unchanged Path A predicate using an explicitly controlled `elapsed` fixture.

For the preserved Run 002 case:

- external producer output was preserved as raw bytes;
- the preserved payload was 235 bytes;
- controlled `elapsed` was 5,000 µs;
- the unchanged local Path A predicate returned `PASS`; and
- exact replay of the preserved explicit inputs returned the same result.

Run 002 is complete and frozen.

Its bounded result supports only the claim that serialized output from a live external nondeterministic producer can be preserved, evaluated through the unchanged Path A predicate using controlled explicit inputs, and exactly replayed with the same result.

Run 002 does **not** establish model alignment, AI safety, production authorization, real network or inference latency semantics, a complete execution membrane, or framework-wide interoperability.

## Repository relationship

This repository is downstream of, but operationally independent from, the Arcstone Continuity Core.

```text
Arcstone architecture
        |
        | authority
        v
arcstone-continuity-core
        |
        | stable public Path A predicate
        v
arcstone-path-a-ingress-lab
        |
        | experimental evidence
        ^
        |
external producers
```

Authority does not flow from this lab back into the Continuity Core.

Evidence may inform later investigation, but experimental results in this repository do not modify or redefine upstream semantics.

The Arcstone Execution Boundary is a separate sibling downstream investigation. This lab does not issue, imply, or confer authorization for that repository.

## Repository guidance

- [`AGENTS.md`](AGENTS.md) — operating boundaries for coding agents and machine-assisted development.
- [`FAQ.md`](FAQ.md) — human-facing conceptual and architectural boundaries.
- [`STATUS.md`](STATUS.md) — current experimental status.
- [`BUILD-REPORT.md`](BUILD-REPORT.md) — build and verification notes.
- [`NEXT-LIVE-PRODUCER.md`](NEXT-LIVE-PRODUCER.md) — preserved prospective constraints used for the live external-producer experiment.
- [`evidence/run-001/`](evidence/run-001/) — preserved deterministic baseline evidence.
- [`evidence/run-002/`](evidence/run-002/) — preserved live external-producer evidence.

## Upstream executable surface

The bundled Continuity Core exposes the relevant public Rust surface through:

```text
src/lifecycle.rs -> evaluate_frame_bounds(payload: &[u8], elapsed: Micros)
src/lattice.rs   -> explicit same-plane dominance ranks
src/lib.rs       -> public constants and status identifiers
```

The lab bridge calls this existing public API.

No additional Path A stages are inserted into the Rust predicate.

## Frozen experimental contract

Version 0.1 intentionally fixes the experiment to the following rules:

1. `arcstone-continuity-core` remains unchanged.
2. External producer output is reduced only to raw bytes before the Path A call.
3. Producer output is not automatically classified as an Arcstone frame, agent frame, certificate, or canonical Arcstone object.
4. `elapsed: Micros` uses controlled explicit fixture values only.
5. Model inference time, network time, total tool-call duration, and host scheduling latency are not mapped to `elapsed`.
6. Producer identity remains experimental provenance metadata and is not passed to the Rust predicate.
7. The lab does not add new statuses, ranks, thresholds, certificates, authorization semantics, actuator semantics, or producer-specific semantics to the core.
8. If an experiment requires changing the frozen core or inventing unsupported Arcstone semantics, the experiment stops.

## Experimental architecture

```text
external producer
(static / human / script / fuzz / live nondeterministic producer)
              |
              | raw bytes
              v
    downstream experimental host
              |
              | payload: &[u8]
              | elapsed: controlled Micros fixture
              v
    unchanged arcstone-continuity-core
      evaluate_frame_bounds(...)
              |
              v
      existing Path A result
              |
              v
     local experiment evidence
```

The external producer is not granted Arcstone authority by participating in the experiment.

## Bundled reference snapshot

`reference/arcstone-continuity-core/` contains the upstream repository snapshot used by this experiment.

The bridge depends on that local Rust crate by path and invokes its public API.

`REFERENCE-INTEGRITY.sha256` records the reference source integrity information used by the lab.

The bundled snapshot does not contain `src/hardware/edge_sanitizer.rs`. This repository therefore does not invent that implementation or treat broader architectural documentation as executable code inside the public core.

## Controlled boundary matrix

Version 0.1 uses the constants present in the bundled reference source:

| Payload | Controlled `elapsed` | Expected local Rust result |
|---|---:|---|
| small | 5,000 µs | `PASS` |
| 4096 bytes | 11,990 µs | `PASS` |
| 4097 bytes | 5,000 µs | `LEDGER_CORRUPTION` |
| small | 11,991 µs | `FREEZE` |
| 4097 bytes | 11,991 µs | `FREEZE` |

These are local Path A predicate tests.

They are not claims about end-to-end producer latency, execution authorization, or the complete Arcstone architecture.

## Verification

### Requirements

- Rust stable with `cargo`
- Node.js 22+
- npm

Run the complete verification suite:

```bash
npm run verify
```

On Windows systems where PowerShell blocks the npm `.ps1` shim:

```powershell
npm.cmd run verify
```

The verification sequence performs:

1. the verification commands declared by the bundled Continuity Core;
2. compilation of the downstream Rust bridge;
3. JavaScript contract and evidence tests;
4. the controlled boundary matrix;
5. the producer-provenance invariance demonstration; and
6. random-byte deterministic replay using controlled elapsed fixtures.

No LLM or API key is required for the deterministic verification suite.

## Individual experiments

### Controlled boundary matrix

```bash
npm run matrix
```

Runtime evidence:

```text
runtime/matrix-evidence.jsonl
```

### Producer-provenance demonstration

```bash
npm run demo:provenance -- "same bytes from every declared producer"
```

The same UTF-8 byte sequence is associated with several external provenance labels.

Those labels are not Arcstone inputs.

The experiment verifies that identical explicit predicate inputs receive identical Path A results.

Runtime evidence:

```text
runtime/provenance-evidence.jsonl
```

### Random-byte replay

```bash
npm run demo:fuzz
```

Each generated payload is evaluated and then replayed with the exact same bytes and controlled elapsed fixture. Any result mismatch is a failure.

Runtime evidence:

```text
runtime/fuzz-evidence.jsonl
```

A different small iteration count may be selected:

```bash
ARCSTONE_LAB_ITERATIONS=100 npm run demo:fuzz
```

### External producer boundary

Any local process capable of emitting bytes can use the stdin adapter:

```bash
printf 'hello' | npm run eval:stdin -- --elapsed-us=5000
```

The producer remains outside the Continuity Core. The adapter supplies only the serialized bytes and an explicitly controlled elapsed fixture to the existing predicate.

This boundary was used as the conceptual connection point for the completed live external-producer experiment preserved as Run 002.

## Evidence interpretation

A successful experiment permits only the narrow conclusion supported by its observations:

> For tested cases, the unchanged public Rust Path A predicate returns the same result for the same explicit payload bytes and controlled elapsed input regardless of external provenance label or producer mechanism.

Run 002 additionally demonstrates, within its preserved bounded case, that serialized output from a live external nondeterministic producer can be preserved as raw bytes, evaluated through the unchanged predicate using a controlled explicit elapsed fixture, and exactly replayed with the same result.

This evidence does not establish:

- general AI safety or alignment;
- autonomous-agent governance;
- that an agent or tool call is an Arcstone frame;
- production execution authorization;
- complete execution-membrane behavior;
- Hand/Knife conformance;
- cross-framework interoperability;
- real-world timing semantics for `Micros`;
- Phase 0 or Phase 1 completion; or
- validation of the broader Arcstone architecture.

## Stop conditions

Stop rather than extend the experiment if the next step requires:

- modifying `arcstone-continuity-core`;
- adding or changing an upstream status, rank, constant, or threshold;
- inventing a mapping from model or agent runtime duration to `elapsed`;
- treating producer/tool metadata as a canonical Arcstone object;
- importing broader architectural stages into the local Rust predicate;
- treating a `PASS` result as authorization for a real-world side effect; or
- turning this repository into an agent framework, execution service, or production membrane.

## Experimental status

Run 001 and Run 002 are complete and frozen.

Run 001 establishes the deterministic local baseline and replay behavior.

Run 002 preserves the live external-producer case and its exact replay.

No additional experiment is required to support the current bounded claims of version 0.1.0.

Future work, if any, requires a separately admitted research question and must not rewrite the frozen Run 001 or Run 002 evidence, modify the Continuity Core, or reinterpret a Path A result as execution authorization.

---

**Operating principle:** Evidence before expansion. Preserve the core. Test the boundary.
