# Windows quick start

Install:

- Rust stable (`rustup` / `cargo`)
- Node.js 22+

Open PowerShell in this repository and run:

```powershell
.\scripts\verify.ps1
```

No API key is required.

After that passes, any external producer can be tested by piping bytes to the lab with an explicit controlled elapsed value. Example:

```powershell
"hello" | npm run eval:stdin -- --elapsed-us=5000
```
