# Next live-producer step (deferred until offline green)

Do not add an SDK dependency to this lab merely to obtain model output.

After `npm run verify` passes, the cleanest live experiment is to keep the model/agent process external and pipe only its emitted bytes into the existing producer-agnostic stdin adapter:

```text
live model / agent process
        |
        | stdout bytes
        v
npm run eval:stdin -- --elapsed-us=<controlled fixture>
        |
        v
unchanged Path A predicate
```

The API key belongs to the external producer process, not to the Arcstone Path A bridge.

For the first live trial:

1. choose one small output well under 4096 bytes;
2. preserve the exact emitted bytes;
3. evaluate those bytes at a controlled `elapsed` such as `5000`;
4. replay the exact same bytes with the same controlled value;
5. compare the results;
6. repeat with an intentionally oversized external output if desired.

Do not feed model inference duration into `elapsed`.
