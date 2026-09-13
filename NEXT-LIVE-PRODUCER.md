# Next Live-Producer Experiment

## Arcstone Path A Ingress Lab

**Status:** Ready for next experimental stage  
**Prerequisite:** Evidence Run 001 — PASS / Frozen  
**Scope:** Downstream / Experimental / Non-Canonical

## Purpose

The deterministic offline baseline has passed.

The next admissible experiment is to attach a live nondeterministic external producer to the existing producer-agnostic ingress boundary without modifying the Arcstone Continuity Core.

The experiment asks a narrow question:

> Can output from a live nondeterministic external producer pass through the same raw-byte ingress mechanism while preserving the existing Path A evaluation contract?

This is an ingress experiment.

It is not an AI-safety test, agent-governance test, production authorization test, or validation of the broader Arcstone architecture.

## Architecture

The live producer remains outside the lab:

```text
live external producer
(LLM / agent / API / other process)
             |
             | emitted bytes
             v
     producer-agnostic ingress
             |
             | payload: &[u8]
             | elapsed: controlled Micros fixture
             v
   unchanged Continuity Core
     evaluate_frame_bounds(...)
             |
             v
       Path A result
             |
             v
     experimental evidence
```

The producer does not receive Arcstone authority by participating in the experiment.

## No provider dependency in the lab

Do not add an OpenAI, Gemini, Anthropic, or other model-provider SDK dependency to this repository merely to obtain model output.

The live producer should initially remain an independent external process.

Any API key, provider configuration, model selection, authentication, or network interaction belongs to that external producer process.

The Arcstone Path A Ingress Lab should receive only the resulting bytes.

This preserves the producer-independent experimental boundary.

## Existing ingress surface

The existing stdin adapter is the intended connection point:

```bash
npm run eval:stdin -- --elapsed-us=<controlled-fixture>
```

On Windows:

```powershell
npm.cmd run eval:stdin -- --elapsed-us=<controlled-fixture>
```

The adapter supplies the received bytes and the explicitly selected controlled elapsed fixture to the unchanged Path A predicate.

## Controlled elapsed requirement

`elapsed: Micros` remains a controlled experimental input.

For the first live-producer experiment, use an explicit fixture such as:

```text
5000 µs
```

Do not use:

- model inference duration;
- API response latency;
- network round-trip time;
- tool-call duration;
- host scheduling latency;
- process execution duration; or
- total wall-clock duration.

Those quantities may be measured separately as external experimental metadata if useful, but they must not be supplied as `elapsed` unless a separate investigation establishes the required semantic correspondence.

Measurement alone does not establish semantic equivalence.

## Run 002 experimental protocol

The first live-producer evidence should be recorded as a new run:

```text
evidence/run-002/
```

Evidence Run 001 must remain unchanged.

### Step 1 — Select one live producer

Use one nondeterministic external producer.

The producer may be an LLM, agent runtime, API-backed process, or another external computational system.

The specific producer identity is provenance metadata only.

### Step 2 — Generate one small output

Request an output expected to remain comfortably below the 4096-byte Path A payload boundary.

Do not transform its semantic content for Arcstone.

Preserve the exact byte sequence that will be evaluated.

### Step 3 — Preserve the bytes before evaluation

The exact evaluated payload must be recoverable.

Record at minimum:

```text
producer label
payload byte length
payload SHA-256
controlled elapsed fixture
Path A result
Path A status code
```

The raw payload may also be preserved when appropriate for the experiment.

Do not rely solely on terminal-visible text as proof of the evaluated byte sequence.

### Step 4 — Evaluate with controlled elapsed

Evaluate the preserved bytes using:

```text
elapsed = 5000 µs
```

or another explicitly declared controlled fixture already permitted by the experiment.

The live producer's actual generation duration must not determine this value.

### Step 5 — Replay the exact payload

Evaluate the exact same preserved byte sequence again with the exact same controlled elapsed value.

The replay must use the preserved bytes rather than requesting a second model response.

The expected relationship is:

```text
same payload bytes
+ same controlled elapsed
= same Path A result
```

### Step 6 — Compare the observations

Confirm that the original evaluation and deterministic replay contain:

```text
identical payload SHA-256
identical payload byte length
identical controlled elapsed
identical Path A signal
identical Path A code
```

A mismatch is an experimental failure requiring investigation.

Do not modify the Continuity Core to eliminate a mismatch.

### Step 7 — Preserve Run 002 evidence

Create a new immutable evidence directory:

```text
evidence/run-002/
```

Record sufficient environment and provenance information to identify the experiment and reproduce the Path A evaluation.

Create SHA-256 bindings for the preserved evidence artifacts.

Run 002 must not overwrite, replace, or amend Run 001.

## Byte-preservation caution

Shell pipelines may alter the byte sequence through newline insertion, text encoding, or shell-specific behavior.

For a live evidence run, the preferred procedure is:

```text
external producer
       |
       v
preserve exact output bytes
       |
       +----> SHA-256 / byte length
       |
       v
Path A stdin adapter
       |
       v
replay same preserved bytes
```

The experiment should establish which bytes were actually evaluated rather than assuming that visually identical terminal text implies byte identity.

## Optional oversized case

After the first small-output experiment succeeds, an intentionally oversized external payload may be tested.

The payload must exceed:

```text
4096 bytes
```

while using a controlled elapsed value below the temporal threshold, such as:

```text
5000 µs
```

For the current bundled Path A implementation, the expected local predicate result is:

```text
LEDGER_CORRUPTION
code: 30
```

This optional case tests the existing size boundary with live-producer-originated bytes.

It does not establish broader ingress staging or production authorization behavior.

## Producer provenance

Producer information may be recorded as experimental metadata, for example:

```text
producer_class = "llm"
provider = "<external provider>"
model = "<external model identifier>"
```

This metadata must remain outside the inputs passed to:

```text
evaluate_frame_bounds(payload, elapsed)
```

Changing producer identity must not cause the lab to invent additional Path A inputs.

## What Run 002 may establish

A successful Run 002 may support the bounded statement:

> For the tested live-producer case, output from a nondeterministic external producer was preserved as raw bytes, evaluated by the unchanged public Rust Path A predicate using a controlled elapsed fixture, and reproduced with the same Path A result when the exact explicit inputs were replayed.

If supported by the actual evidence, this extends the experimental observations from synthetic and declared-provenance inputs to a real nondeterministic external producer.

## What Run 002 cannot establish

Run 002 does not establish:

- general AI safety or alignment;
- model correctness or trustworthiness;
- autonomous-agent governance;
- that LLM output is an Arcstone Frame;
- that an agent tool call is an Arcstone Frame;
- semantic correspondence between model latency and `elapsed`;
- production execution authorization;
- permission to perform irreversible side effects;
- complete execution-membrane behavior;
- Hand/Knife conformance;
- cross-framework interoperability;
- validation of the broader Arcstone architecture; or
- Phase 0 or Phase 1 completion.

## Stop conditions

Stop the experiment if proceeding requires:

- modifying `arcstone-continuity-core`;
- modifying the Path A predicate;
- adding or changing an upstream status, rank, constant, or threshold;
- mapping measured model or network latency to `elapsed` without independent justification;
- treating producer metadata as an Arcstone predicate input;
- declaring model output to be a canonical Arcstone Frame;
- introducing agent-specific semantics into the Continuity Core;
- adding authorization or actuator behavior to the Ingress Lab;
- interpreting `PASS` as permission for a real-world side effect;
- adding an MCP layer merely to conduct this experiment; or
- rewriting Evidence Run 001.

If one of these becomes necessary, the proposed correspondence requires a separate investigation.

## Success condition

Run 002 succeeds if a live nondeterministic producer can remain external while its exact emitted bytes are:

1. preserved;
2. identified by byte length and cryptographic hash;
3. evaluated using the unchanged Path A predicate and a controlled elapsed fixture;
4. replayed exactly; and
5. observed to produce the same Path A result for the same explicit inputs.

No stronger claim is required.

---

**Operating principle:** Evidence before expansion. Preserve the core. Test the boundary.
