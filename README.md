# Arcstone Path A Ingress Lab

**Status:** disposable downstream experiment  
**Version:** 0.1.0  
**Reference implementation:** bundled, unchanged snapshot of `arcstone-continuity-core` v1.3.1 public Path A surface  
**Purpose:** test producer-independent invocation of the existing Rust Path A predicate without adding agent semantics or modifying the frozen core.

## Repository guidance

- [`AGENTS.md`](AGENTS.md) — operating boundaries for coding agents and machine-assisted development.
- [`FAQ.md`](FAQ.md) — human-facing conceptual and architectural boundaries.
- [`STATUS.md`](STATUS.md) — current experimental status.
- [`BUILD-REPORT.md`](BUILD-REPORT.md) — build and verification notes.


## Why this exists

The current public Continuity Core exposes a deliberately small Rust surface. In the supplied repository snapshot, the relevant implementation is:

```text
src/lifecycle.rs -> evaluate_frame_bounds(payload: &[u8], elapsed: Micros)
src/lattice.rs   -> explicit same-plane dominance ranks
src/lib.rs       -> public constants and status identifiers
```

There is **no** `src/hardware/edge_sanitizer.rs` in the supplied public repository snapshot. This lab does not invent one and does not try to make broader upstream architectural documents appear executable inside the public core.

The lab instead asks one narrow downstream question:

> Does an unchanged deterministic Path A predicate preserve its result when the origin of the input bytes changes, provided the explicit inputs are identical?

## Frozen experimental contract

This repository intentionally fixes the experiment to the following rules:

1. `arcstone-continuity-core` is unchanged.
2. External producer output is reduced only to raw bytes before the Path A call.
3. No producer output is called an "Arcstone frame", "agent frame", certificate, or canonical object.
4. `elapsed: Micros` uses **controlled explicit fixture values only** in v0.1.
5. Model inference time, network time, total tool-call duration, and host scheduling latency are **not** mapped to `elapsed`.
6. The lab does not add `S`, `rho`, `C_ops`, certificates, Hand/Knife semantics, actuator semantics, or agent identity to the Rust function.
7. The lab stops rather than modifying the core or inventing new Arcstone semantics.

## Architecture

```text
external producer
(static / human / script / fuzz / future LLM)
              |
              | bytes
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

The producer is outside Arcstone authority. The lab records the declared producer label only as experimental provenance metadata. That label is never passed into the Rust predicate.

## What is bundled

`reference/arcstone-continuity-core/` is a copy of the repository snapshot supplied for this experiment. The lab bridge depends on that local crate by path and calls only its public API.

The core source is not modified by the lab.

## Controlled boundary matrix

The baseline experiment uses the actual constants observed in the supplied source:

| Payload | Controlled `elapsed` | Expected local Rust result |
|---|---:|---|
| small | 5,000 us | `PASS` |
| 4096 bytes | 11,990 us | `PASS` |
| 4097 bytes | 5,000 us | `LEDGER_CORRUPTION` |
| small | 11,991 us | `FREEZE` |
| 4097 bytes | 11,991 us | `FREEZE` |

These are Path A predicate tests. They are not claims about end-to-end agent latency, authorization, or the complete Arcstone architecture.

## Run everything that does not require an API key

Requirements:

- Rust stable with `cargo`
- Node.js 22+
- npm

Then run:

```bash
npm run verify
```

That performs:

1. the verification commands declared by the bundled Continuity Core;
2. compilation of the tiny external Rust bridge;
3. JavaScript contract/evidence tests;
4. the controlled boundary matrix;
5. the producer-provenance invariance demonstration; and
6. a small random-byte replay experiment using controlled elapsed fixtures.

No LLM and no API key are required.

## Individual experiments

### Baseline matrix

```bash
npm run matrix
```

Evidence: `runtime/matrix-evidence.jsonl`

### Producer-provenance demonstration

```bash
npm run demo:provenance -- "same bytes from every declared producer"
```

The same UTF-8 byte sequence is tagged with several *external provenance labels*. The label is not an Arcstone input. The experiment verifies that identical explicit inputs receive identical Path A results.

Evidence: `runtime/provenance-evidence.jsonl`

### Random byte replay

```bash
npm run demo:fuzz
```

For each random payload, the exact same bytes are evaluated again with the same controlled elapsed fixture. Any result mismatch is treated as failure.

Evidence: `runtime/fuzz-evidence.jsonl`

Set a different small iteration count if desired:

```bash
ARCSTONE_LAB_ITERATIONS=100 npm run demo:fuzz
```

### Pipe any external producer into the lab

The lab is producer-agnostic. Any local process can emit bytes on stdout and pipe them to the harness:

```bash
printf 'hello' | npm run eval:stdin -- --elapsed-us=5000
```

This is the intended future connection point for an LLM or agent runtime. Adding such a producer later does not require changing the Continuity Core.

## Evidence interpretation

A successful run permits only a narrow conclusion:

> For the tested cases, the unchanged public Rust Path A predicate returns the same result for the same explicit payload bytes and controlled elapsed input regardless of the external provenance label or producer mechanism.

It does **not** establish:

- general AI safety or alignment;
- autonomous-agent governance;
- that an agent tool call is an Arcstone frame;
- production execution authorization;
- Hand/Knife conformance;
- a complete execution membrane;
- cross-framework interoperability;
- real-world timing semantics for `Micros`;
- Phase 0 or Phase 1 completion.

## Stop conditions

Stop rather than extend the lab if the next step requires:

- modifying `arcstone-continuity-core`;
- adding or changing a status, rank, constant, or threshold;
- inventing a mapping from LLM/agent runtime duration to `elapsed`;
- treating model/tool metadata as a canonical Arcstone object;
- importing broader architectural stages into the local Rust predicate;
- turning this repository into an agent framework or production service.

## Next step after a green offline run

Only after the complete offline verification passes should a live nondeterministic producer be attached. The preferred interface is simply stdout/raw bytes into `eval:stdin`, with the same controlled elapsed fixtures. The live producer remains external and untrusted.
