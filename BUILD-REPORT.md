# Build Report

## What was built

This revision replaces the earlier agent-specific lab with a producer-agnostic **Path A ingress lab**.

The implementation now reflects the final architectural gate:

- current public Rust core remains unchanged;
- raw bytes are the only producer output passed to Path A;
- `elapsed` is controlled experimental input only;
- producer provenance is evidence metadata, not an Arcstone input;
- there is no actuator, permit, agent schema, MCP layer, or OpenAI dependency in v0.1.

## Local environment verification

The creation environment had Node.js and npm available but did not have Rust/Cargo installed. Therefore:

- all JavaScript source files were syntax-checked;
- Node-only contract/evidence tests were run;
- the bundled core source structure was inspected;
- the bridge source was generated against the actual public API;
- Rust compilation and end-to-end bridge execution could not be performed locally in this environment.

The included GitHub Actions workflow installs Rust and performs the full verification path.
