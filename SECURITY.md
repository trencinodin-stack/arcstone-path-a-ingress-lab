# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, evidence-harness bypass, byte-deserialization defect, or experimental-integrity failure affecting `arcstone-path-a-ingress-lab`, please **do not open a public issue**.

Submit reports through either of the following private channels:

1. **GitHub Private Vulnerability Reporting (Recommended):**
   * Go to the **Security** tab of this repository (`trencinodin-stack/arcstone-path-a-ingress-lab`).
   * Click **Report a vulnerability**.
   * Fill out the form to submit a private report directly to maintainers.

2. **Email:**
   * Contact us at **security@arcstoneos.com**.

---

## What to Include

Please include, where applicable:
* A description of the vulnerability, harness flaw, or evidence-integrity failure.
* Minimal reproduction steps or script (`npm run verify` / `npm run matrix`).
* The affected commit hash, run identifier (e.g., Run 001 / Run 002), or test fixture.
* Whether the issue involves:
  * Ingress byte stream or stdin adapter deserialization/truncation bugs;
  * Producer metadata ($Q$) leaking into or influencing the pure Rust Path A predicate $R = f(P, T)$;
  * Mapping real-world LLM inference time, network latency, or total tool duration directly to `elapsed: Micros`;
  * Silent modification or corruption of frozen baseline evidence (`evidence/run-001/`);
  * Cryptographic digest mismatches in `REFERENCE-INTEGRITY.sha256`;
  * Treating a Path A `PASS` (`POSIX 0`) result as execution authorization for real-world side effects.

---

## Immutability of Frozen Research Evidence

Evidence Run 001 is complete, verified, and frozen at commit `49ce5bf`.

* **No Silent Evidence Mutation:** Discovering a defect or vulnerability after a freeze does not authorize silent modification, regeneration, or replacement of historical evidence records under `evidence/run-001/`.
* **Explicit Annotation:** Historical errors or harness defects affecting frozen evidence must be documented as explicit annotations.
* **New Experiment Identities:** Remediation that alters experimental semantics, producer adapters, or boundary conditions must be executed under a new run identity (e.g., Run 003+).

---

## Bounded Experimental Scope

`arcstone-path-a-ingress-lab` is an experimental downstream testbed. Its security and containment claims are limited strictly to the tested byte-reduction protocol:
* **Scope:** Verification that identical explicit payload bytes and controlled elapsed fixtures yield identical Path A predicate results regardless of external producer provenance.

This repository explicitly does **not** claim:
* General AI safety, model alignment, or prompt-injection immunity;
* Production execution authorization or capability management;
* Real-world timing bounds or network latency enforcement;
* Universal OS, container, or agent sandbox security.

---

## Response Timeline

We will acknowledge receipt within **48 hours** and coordinate an appropriate remediation and disclosure timeline.
