# codex-portable

Build portable OpenAI Codex CLI bundles for Linux, macOS, and Windows with GitHub Actions.

This repository does not commit Codex binaries. Instead, the workflow installs the official `@openai/codex` npm package on each GitHub-hosted runner, extracts the native platform binary plus the bundled `rg` executable, and repackages them into a portable directory and archive artifact.

## What the workflow builds

Each run produces one artifact per platform:

- `ubuntu-22.04` -> Linux x64 portable bundle
- `macos-14` -> macOS arm64 portable bundle
- `windows-2022` -> Windows x64 portable bundle

Each bundle contains:

- a small launcher (`codex`, `codex.cmd`, or `codex.ps1`)
- the native Codex binary from the official package
- the bundled `rg` executable used by Codex
- a short portable usage guide
- repository license and metadata

## Smoke test stage

After the build job finishes, the workflow downloads the generated artifact in a second stage, extracts it on a fresh runner, writes a minimal `config.toml`, and runs multiple real `codex exec` checks against the configured API endpoint.

The smoke test currently validates:

- basic artifact startup and `codex exec`
- bundle layout and expected packaged files
- a tool-read probe that confirms a `command_execution` event happened while reading a workspace file
- a system-operation probe that confirms a `command_execution` event happened while creating a workspace file

The smoke test expects these repository secrets:

- `PORTABLE_TEST_BASE_URL`
- `PORTABLE_TEST_API_KEY`
- `PORTABLE_TEST_MODEL`

## Workflows

### Build Portable Codex

Use the `Build Portable Codex` workflow to run an on-demand build, or let it run automatically when this repository publishes a GitHub release.

- `workflow_dispatch` builds artifacts and runs smoke tests
- `release.published` builds artifacts, runs smoke tests, and uploads the generated archives to the matching GitHub release with overwrite enabled

Optional `workflow_dispatch` input:

- `codex_version=latest` builds the latest published `@openai/codex`
- `codex_version=0.121.0` pins the package version

### Watch Upstream Codex Release

The `Watch Upstream Codex Release` workflow runs every 3 hours and also supports `workflow_dispatch`.

It:

- resolves the latest stable `@openai/codex` version from npm, or uses the manually provided version
- fetches the matching upstream GitHub release from `openai/codex`
- uses the configured model endpoint to generate short release highlights
- creates a repository release tagged as `vX.Y.Z`
- relies on the downstream `release.published` trigger to build and attach portable artifacts

Manual examples:

- leave `codex_version=latest` to publish the newest stable npm release
- set `codex_version=0.120.0` to backfill or rebuild a specific older Codex version as `v0.120.0`

This watcher requires one extra repository secret:

- `RELEASE_WORKFLOW_TOKEN`

Use a PAT or fine-grained token with permission to create releases in this repository. This is required because the default `GITHUB_TOKEN` does not trigger downstream workflows when it creates a release.

The smoke tests and the release-note generation both expect these repository secrets:

- `PORTABLE_TEST_BASE_URL`
- `PORTABLE_TEST_API_KEY`
- `PORTABLE_TEST_MODEL`

## Manual build usage
Use the `Build Portable Codex` workflow and optionally provide a `codex_version` input if you want artifacts without creating a release.

- `codex_version=latest` builds the latest stable npm release
- `codex_version=0.120.0` builds a pinned historical release without creating a GitHub release

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
