# Frequently Asked Questions

## Arcstone Path A Ingress Lab

### What is this repository?

`arcstone-path-a-ingress-lab` is an independent downstream experimental repository for testing how external producers can invoke the public Arcstone Path A predicate without modifying the Arcstone Continuity Core.

It is an experimental ingress realization and evidence harness. It does not define new Arcstone architecture or establish upstream authority.

### Why does this repository exist?

The public Continuity Core already exposes a small deterministic Path A predicate. External systems, however, can be heterogeneous and nondeterministic.

This repository investigates the boundary between those two domains:

```text
external producer
      |
      v
   raw bytes
      |
      v
ingress experiment
      |
      v
Path A predicate
```

The objective is to test that boundary rather than expand the core.

### Is this part of `arcstone-continuity-core`?

No.

The repositories are linked architecturally but independent operationally. The Continuity Core is the upstream executable reference. The Ingress Lab is a downstream experimental consumer.

They have separate repositories, histories, releases, CI, evidence, and development lifecycles.

### Is this a fork of the Continuity Core?

No.

The lab does not exist to modify or extend the upstream repository. It consumes the upstream public interface while preserving the upstream implementation.

### Why is a copy of the Continuity Core bundled in this repository?

The lab uses a fixed upstream snapshot so that an experimental run can be reproduced against an identified executable baseline.

The bundled copy is a reference dependency, not a fork and not a new source of Arcstone authority.

Its source is not modified by the lab. Reference integrity information is recorded separately so changes to the experimental host can be distinguished from changes to the upstream executable surface.

### What Continuity Core baseline does the lab target?

The initial baseline is:

```text
v1.3.1-exec
A-77-DELTA-SHIELD-LOCKED
```

Experimental records should identify the exact upstream baseline used.

### What does the experiment test?

The initial proposition is:

```text
same payload bytes
+ same controlled elapsed input
= same Path A result
```

regardless of where those bytes originated.

Producer provenance should not become an implicit input to the deterministic predicate.

### What is an external producer?

Anything capable of producing input data, including static fixtures, humans, scripts, APIs, randomized generators, LLMs, autonomous agents, and future computational systems.

The Path A predicate does not need to understand which producer generated the bytes.

### Is this an AI-agent project?

No.

Agents are one possible external producer class. The repository is deliberately producer-agnostic.

An LLM or autonomous agent can provide experimental inputs without changing the identity of the repository.

### Is this an MCP server?

No.

MCP integration belongs in a separate downstream implementation if developed. This lab should not become an MCP server merely because MCP agents may eventually be used as experimental producers.

### Is this the Arcstone execution membrane?

No.

The lab exercises a public Path A predicate. It does not claim to implement the complete Arcstone execution membrane, authorization architecture, Computational Spine, or broader system.

### Does PASS authorize a real-world action?

No.

In this repository, a Path A predicate result is an experimental observation only.

`PASS` does not constitute an authorization certificate, capability grant, actuator permission, or permission to perform an irreversible side effect.

Operational execution authorization belongs outside this lab.

### Why are elapsed values controlled?

The public predicate accepts an `elapsed: Micros` input.

A justified mapping from real LLM generation time, network latency, host scheduling latency, or total tool-call duration to that field has not been established for this experiment.

Therefore v0.1 supplies explicit controlled elapsed values. This prevents an experimental convenience from becoming an invented architectural semantic.

### Why not simply measure LLM response time?

Because measurement is easy while semantic correspondence is the actual question.

A number can be measured without establishing that it represents the quantity expected by the upstream predicate. Until that correspondence is established, model latency remains outside the Path A call.

### Are LLM responses Arcstone Frames?

No such correspondence is established by this repository.

An LLM response may be serialized into raw bytes for experimental evaluation. Serialization does not transform the source object into a canonical Arcstone Frame.

### What happens to producer identity?

Producer identity is evidence metadata, for example:

```text
producer = "fixture"
producer = "human"
producer = "random"
producer = "llm"
```

That label may be recorded alongside the experiment. It must not alter the inputs passed to the Path A predicate.

### Why test provenance if the predicate is deterministic?

The core's deterministic behavior can already be tested with fixtures.

This lab adds evidence about the boundary around that deterministic primitive: external production, serialization, provenance separation, evidence capture, replay, and later nondeterministic producers.

The experiment therefore tests the integration boundary, not whether a deterministic function is mathematically deterministic.

### What is Evidence Run 001?

Evidence Run 001 is the frozen baseline verification run for version 0.1.0.

It includes:

- upstream Continuity Core tests;
- bridge compilation;
- lab contract tests;
- the controlled boundary matrix;
- producer-provenance invariance testing;
- random-byte deterministic replay;
- environment information; and
- SHA-256-bound evidence records.

The preserved evidence is available under:

```text
evidence/run-001/
```

Run 001 passed locally and was independently reproduced by the repository's GitHub Actions verification workflow.

The baseline source state is identified by Git commit:

```text
49ce5bf
```

No API key or live model was required.

### Does evidence from this lab change the Continuity Core?

No.

Authority flows from the upstream architecture and Continuity Core into this downstream experiment.

Experimental evidence may flow back upstream for later evaluation, but it does not automatically modify, reinterpret, or supersede upstream semantics.

A successful experiment is evidence about the tested boundary, not new architectural authority.

### When is a live nondeterministic producer added?

Only after the frozen deterministic baseline has passed.

That prerequisite is now satisfied by Evidence Run 001.

The first live producer experiment should remain external to the lab and provide bytes through the same ingress surface used by other producers. The Continuity Core must not change because the producer happens to be an LLM, agent, API, or other nondeterministic system.

Any live-producer evidence should be preserved as a new evidence run rather than modifying Run 001.

### What would a successful live-producer experiment establish?

At most, it would add evidence that the same ingress mechanism can accept output originating from a nondeterministic external producer while preserving the existing Path A evaluation contract.

It would not by itself establish AI safety, alignment, production authorization, autonomous-agent governance, cross-framework interoperability, or validation of the broader Arcstone architecture.

### What happens if the experiment requires changing the Continuity Core?

Stop.

That result means the proposed downstream correspondence needs investigation. The lab should not modify the upstream core simply to make the experiment work.

### What is the relationship to `arcstone-mcp-sidecar`?

They are separate downstream repositories:

```text
arcstone-continuity-core
         /       \
        /         \
       v           v
ingress-lab     mcp-sidecar
experiment      implementation
```

The Ingress Lab investigates producer-to-Path-A correspondence.

The MCP Sidecar, if developed, addresses operational execution-boundary problems.

Neither should depend architecturally on the other merely for convenience, and mechanisms belonging to one downstream repository should not be imported into the other without independent justification.

### Could this lab eventually become something permanent?

Possibly, but not yet.

If repeated experiments across heterogeneous producers produce useful, reproducible evidence, the work could justify a stable downstream reference adapter.

That decision should follow evidence rather than precede it.

### What is the governing development principle?

**Evidence before expansion.**

Preserve the core.

Test the boundary.
