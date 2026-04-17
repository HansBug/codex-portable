# Repository Guidelines

## Scope

This repository exists only to package portable Codex CLI artifacts with GitHub Actions. Do not commit generated binaries, archives, or downloaded npm dependencies.

## Current state

- This repository builds portable Codex bundles for six GitHub-hosted runner targets:
  - `ubuntu-22.04` / `x86_64-unknown-linux-musl`
  - `ubuntu-22.04-arm` / `aarch64-unknown-linux-musl`
  - `macos-15-intel` / `x86_64-apple-darwin`
  - `macos-14` / `aarch64-apple-darwin`
  - `windows-2022` / `x86_64-pc-windows-msvc`
  - `windows-11-arm` / `aarch64-pc-windows-msvc`
- The main release pipeline builds bundles, runs smoke tests in clean jobs, uploads release assets, and then refreshes the repository README files from templates using the actual published asset list.
- Release documentation is intentionally pinned to the real published release, not resolved dynamically at read time.

## Source of truth

- Use the official `@openai/codex` npm package as the upstream source.
- Keep workflow logic platform-neutral when possible.
- Preserve upstream version information in generated metadata.

## README and template rules

- `README.md` and `README_zh.md` are generated files. Do not manually edit them.
- The source of truth for README content is:
  - `templates/README.md.j2`
  - `templates/README_zh.md.j2`
  - `scripts/render-readme.py`
- If you need to change wording, examples, structure, or release-pinned documentation behavior, edit the templates or the renderer, then regenerate the README outputs.
- Keep the generated README files pinned to the currently published release and actual uploaded assets. Do not reintroduce `latest` download links into the published README outputs.

## Editing rules

- Keep documentation, workflow files, and helper scripts in English.
- Prefer small, reviewable changes.
- Do not hardcode secrets, tokens, or user-specific paths.
- Validate workflow behavior with `workflow_dispatch` after meaningful CI changes.
- When changing README behavior, verify both the templates and rendered outputs.

## Artifact expectations

- Bundles must stay self-contained and portable.
- Bundles must not contain user state from `~/.codex`.
- Linux and macOS artifacts should include both a directory bundle and compressed archives.
- Windows artifacts should include at least a zip archive and the unpacked bundle directory.
