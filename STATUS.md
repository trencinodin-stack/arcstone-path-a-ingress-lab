# Status

## Arcstone Path A Ingress Lab

**Repository status:** Experimental / Downstream / Non-Canonical  
**Version:** 0.1.0  
**Baseline verification:** PASS  
**Evidence baseline:** Run 001 — Frozen  
**Baseline commit:** `49ce5bf`  
**Upstream reference:** `arcstone-continuity-core` v1.3.1 (`v1.3.1-exec`)  
**Upstream anchor:** `A-77-DELTA-SHIELD-LOCKED`

## Current state

The deterministic offline baseline for the Arcstone Path A Ingress Lab has been successfully executed, preserved, committed, and independently reproduced by GitHub Actions.

The repository remains a downstream experimental realization. It does not modify the Arcstone Continuity Core and does not establish new Arcstone architectural authority.

## Verification status

Evidence Run 001 completed successfully.

Verified components include:

- Continuity Core Rust unit tests — PASS
- Continuity Core cross-language lifecycle invariants — PASS
- Continuity Core temporal lattice assertions — PASS
- downstream Rust bridge compilation — PASS
- JavaScript contract and evidence tests — PASS
- controlled Path A boundary matrix — PASS
- producer-provenance invariance demonstration — PASS
- random-byte deterministic replay — PASS
- GitHub Actions verification — PASS

The complete local verification command was:

```bash
npm run verify
```

On the Windows verification host:

```powershell
npm.cmd run verify
```

## Evidence Run 001

The frozen evidence package is located at:

```text
evidence/run-001/
```

It contains:

```text
environment.txt
fuzz-evidence.jsonl
matrix-evidence.jsonl
provenance-evidence.jsonl
SHA256SUMS.txt
```

Run 001 is associated with baseline Git commit:

```text
49ce5bf
```

Run 001 must not be rewritten or replaced by later experiments.

Future experimental observations should be preserved under new evidence-run identifiers.

## Verified boundary matrix

The controlled baseline produced the expected local Rust results:

| Payload | Controlled `elapsed` | Result |
|---|---:|---|
| 8 bytes | 5,000 µs | `PASS` |
| 4096 bytes | 11,990 µs | `PASS` |
| 4097 bytes | 5,000 µs | `LEDGER_CORRUPTION` |
| 8 bytes | 11,991 µs | `FREEZE` |
| 4097 bytes | 11,991 µs | `FREEZE` |

These results describe the local Path A predicate only.

They do not establish end-to-end authorization, execution-membrane behavior, or real-world timing semantics.

## Producer-provenance result

Run 001 evaluated identical explicit inputs under multiple declared producer-provenance labels.

Observed result:

```text
identical explicit inputs: true
identical Path A results:  true
producer labels tested:    5
```

Producer identity remained evidence metadata and was not passed into the Rust predicate.

The result supports only the narrow experimental claim that, for the tested cases, changing declared external provenance did not change the result when the explicit predicate inputs remained identical.

## Deterministic replay result

The random-byte replay experiment completed:

```text
iterations:             32
deterministic replays:  32
pass:                   true
```

Controlled elapsed fixtures:

```text
0 µs
5,000 µs
11,990 µs
11,991 µs
```

No measured model, network, tool-call, or host latency was used.

## Environment

Evidence Run 001 was executed locally with:

```text
Node.js: v24.15.0
npm:     11.14.1
rustc:   1.98.1 (48a229cea 2026-09-01)
cargo:   1.98.1 (797e8a9bc 2026-08-05)
```

The baseline was subsequently pushed to the GitHub repository, which was private at the time, and independently verified by the repository's GitHub Actions workflow.

## Architectural status

- Architecture: downstream only
- Upstream authority: unchanged
- Core modifications: none
- Producer-specific semantics: none
- Agent-specific semantics: none
- MCP semantics: none
- Authorization semantics: none
- Actuator semantics: none
- Real-world `elapsed` mapping: intentionally not implemented
- Controlled elapsed fixtures: enabled
- API key requirement: none for baseline verification
- Live nondeterministic producer: not yet part of Run 001
- Public-core function used: `src/lifecycle.rs::evaluate_frame_bounds`
- Producer identity: provenance metadata only
- Evidence direction: downstream observations may inform upstream investigation but do not establish upstream authority

## Upstream implementation boundary

The executable Path A function used by this lab is:

```text
src/lifecycle.rs::evaluate_frame_bounds
```

The bundled upstream snapshot does not contain:

```text
src/hardware/edge_sanitizer.rs
```

The lab does not invent that path or treat broader architectural documentation as executable implementation inside the public Continuity Core.

## Current evidence claim

The present evidence supports the following bounded statement:

> For tested cases, the unchanged public Rust Path A predicate returns the same result for the same explicit payload bytes and controlled elapsed input regardless of external provenance label or producer mechanism.

The current evidence does not establish:

- AI safety or alignment;
- autonomous-agent governance;
- production execution authorization;
- that an agent or tool call is an Arcstone frame;
- complete execution-membrane behavior;
- Hand/Knife conformance;
- cross-framework interoperability;
- real-world timing semantics for `Micros`;
- validation of the broader Arcstone architecture; or
- Phase 0 or Phase 1 completion.

## Next admissible experiment

The deterministic baseline prerequisite has been satisfied.

The next admissible experiment is a live nondeterministic external producer.

The producer must remain outside the Continuity Core and should initially communicate through the existing raw-byte stdin ingress surface.

The experiment must continue to use controlled explicit `elapsed` fixtures.

Live model generation time, network latency, host scheduling time, and total request duration must not be mapped to `elapsed` without an independently justified semantic correspondence.

Any resulting evidence should be preserved as a new evidence run and must not modify Evidence Run 001.

See:

```text
NEXT-LIVE-PRODUCER.md
```

## Stop conditions

Stop rather than expand the lab if a proposed next step requires:

- modifying `arcstone-continuity-core`;
- changing an upstream status, rank, constant, or threshold;
- inventing real-world semantics for `elapsed`;
- treating producer metadata as a canonical Arcstone object;
- importing broader architectural stages into the local Path A predicate;
- interpreting `PASS` as authorization for a real-world side effect;
- converting the lab into an MCP server, agent framework, or production execution service; or
- allowing experimental evidence to redefine upstream authority.

---

**Operating principle:** Evidence before expansion. Preserve the core. Test the boundary.
