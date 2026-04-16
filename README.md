# codex-portable

Build portable OpenAI Codex CLI bundles for Linux, macOS, and Windows with GitHub Actions.

This repository does not commit Codex binaries. Instead, the workflow installs the official `@openai/codex` npm package on each GitHub-hosted runner, extracts the native platform binary plus the bundled `rg` executable, and repackages them into a portable directory and archive artifact.

## What the workflow builds

Each run produces one artifact per platform:

- `ubuntu-22.04` -> Linux x64 portable bundle
- `macos-13` -> macOS x64 portable bundle
- `windows-2022` -> Windows x64 portable bundle

Each bundle contains:

- a small launcher (`codex`, `codex.cmd`, or `codex.ps1`)
- the native Codex binary from the official package
- the bundled `rg` executable used by Codex
- a short portable usage guide
- repository license and metadata

## Triggering a build

Use the `Build Portable Codex` workflow and optionally provide a `codex_version` input.

- `latest` builds the latest published `@openai/codex`
- an explicit version such as `0.121.0` pins the package version

## Artifact behavior

The generated bundles do not include user state such as `~/.codex`, `auth.json`, sessions, logs, or local memories.

The target machine is still expected to provide:

- network access, or a working HTTP/SOCKS proxy if the chosen model provider requires remote access
- valid CA certificates for HTTPS providers
- configuration and credentials if you are not using the interactive login flow

## Local development

The repository script can be run locally with:

```bash
node scripts/build-portable.mjs --version latest
```

The script writes its output to `dist/`.

## License

This repository is licensed under Apache-2.0. Packaged Codex binaries are redistributed from the upstream `@openai/codex` package, which is also published under Apache-2.0.
