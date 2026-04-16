# Repository Guidelines

## Scope

This repository exists only to package portable Codex CLI artifacts with GitHub Actions. Do not commit generated binaries, archives, or downloaded npm dependencies.

## Source of truth

- Use the official `@openai/codex` npm package as the upstream source.
- Keep workflow logic platform-neutral when possible.
- Preserve upstream version information in generated metadata.

## Editing rules

- Keep documentation, workflow files, and helper scripts in English.
- Prefer small, reviewable changes.
- Do not hardcode secrets, tokens, or user-specific paths.
- Validate workflow behavior with `workflow_dispatch` after meaningful CI changes.

## Artifact expectations

- Bundles must stay self-contained and portable.
- Bundles must not contain user state from `~/.codex`.
- Linux and macOS artifacts should include both a directory bundle and compressed archives.
- Windows artifacts should include at least a zip archive and the unpacked bundle directory.
