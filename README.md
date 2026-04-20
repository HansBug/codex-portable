<!--
Generated from templates/README.md.j2 by scripts/render-readme.py.
Edit the template, not this file.
-->
# codex-portable

[中文说明 / Chinese README](./README_zh.md)

Portable OpenAI Codex CLI bundles for Linux, macOS, and Windows.

Each GitHub release repackages the official `@openai/codex` binary and bundled `rg` into archives that are easy to move into restricted or offline environments.

Release pages:

- All releases: `https://github.com/HansBug/codex-portable/releases`
- Current documented release: [`v0.122.0`](https://github.com/HansBug/codex-portable/releases/tag/v0.122.0) published on `2026-04-20`

Supported release targets:

- Linux x64: `x86_64-unknown-linux-musl`
- Linux arm64: `aarch64-unknown-linux-musl`
- macOS x64: `x86_64-apple-darwin`
- macOS arm64: `aarch64-apple-darwin`
- Windows x64: `x86_64-pc-windows-msvc`
- Windows arm64: `aarch64-pc-windows-msvc`


## Current release assets

This README is pinned to the currently published release `v0.122.0`. The table below is refreshed from the actual attached release assets after the release upload job finishes.

| Platform | Preferred archive | Alternate archive | SHA-256 file |
| --- | --- | --- | --- |
| Linux x64 | [codex-portable-x86_64-unknown-linux-musl-v0.122.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-unknown-linux-musl-v0.122.0.tar.gz) | [codex-portable-x86_64-unknown-linux-musl-v0.122.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-unknown-linux-musl-v0.122.0.zip) | [codex-portable-x86_64-unknown-linux-musl-v0.122.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-unknown-linux-musl-v0.122.0.sha256) |
| Linux arm64 | [codex-portable-aarch64-unknown-linux-musl-v0.122.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-unknown-linux-musl-v0.122.0.tar.gz) | [codex-portable-aarch64-unknown-linux-musl-v0.122.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-unknown-linux-musl-v0.122.0.zip) | [codex-portable-aarch64-unknown-linux-musl-v0.122.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-unknown-linux-musl-v0.122.0.sha256) |
| macOS x64 | [codex-portable-x86_64-apple-darwin-v0.122.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-apple-darwin-v0.122.0.tar.gz) | [codex-portable-x86_64-apple-darwin-v0.122.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-apple-darwin-v0.122.0.zip) | [codex-portable-x86_64-apple-darwin-v0.122.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-apple-darwin-v0.122.0.sha256) |
| macOS arm64 | [codex-portable-aarch64-apple-darwin-v0.122.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-apple-darwin-v0.122.0.tar.gz) | [codex-portable-aarch64-apple-darwin-v0.122.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-apple-darwin-v0.122.0.zip) | [codex-portable-aarch64-apple-darwin-v0.122.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-apple-darwin-v0.122.0.sha256) |
| Windows x64 | [codex-portable-x86_64-pc-windows-msvc-v0.122.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-pc-windows-msvc-v0.122.0.zip) | - | [codex-portable-x86_64-pc-windows-msvc-v0.122.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-x86_64-pc-windows-msvc-v0.122.0.sha256) |
| Windows arm64 | [codex-portable-aarch64-pc-windows-msvc-v0.122.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-pc-windows-msvc-v0.122.0.zip) | - | [codex-portable-aarch64-pc-windows-msvc-v0.122.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.122.0/codex-portable-aarch64-pc-windows-msvc-v0.122.0.sha256) |


## Start here

Pick one path:

- `Fast install`: the target machine has internet access and can download directly from GitHub.
- `Manual / offline install`: you download the archive on one machine, transfer it manually, then extract and start it on the target machine.

## Fast install

These commands install the current documented release `v0.122.0` directly. If you need an older Codex version, open the Releases page and replace the fixed tag and asset names below with the older release you want.

The command blocks below show one common architecture per platform. For the other supported architectures, keep the same steps and replace only the asset name with one from the asset table above.

### Linux x64 (bash)

```bash
VER="v0.122.0"
ASSET="codex-portable-x86_64-unknown-linux-musl-v0.122.0.tar.gz"

touch "$HOME/.bashrc"
curl -fL -o "$ASSET" "https://github.com/HansBug/codex-portable/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/codex-portable-x86_64-unknown-linux-musl-v0.122.0" "$HOME/.local/lib/codex-portable"
grep -qxF 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' "$HOME/.bashrc" || echo 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' >> "$HOME/.bashrc"

export PATH="$HOME/.local/lib/codex-portable:$PATH"
codex --version
```

### macOS arm64 (zsh)

```zsh
VER="v0.122.0"
ASSET="codex-portable-aarch64-apple-darwin-v0.122.0.tar.gz"

touch "$HOME/.zshrc"
curl -fL -o "$ASSET" "https://github.com/HansBug/codex-portable/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/codex-portable-aarch64-apple-darwin-v0.122.0" "$HOME/.local/lib/codex-portable"
grep -qxF 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' "$HOME/.zshrc" || echo 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' >> "$HOME/.zshrc"

export PATH="$HOME/.local/lib/codex-portable:$PATH"
codex --version
```

If you use `bash` on macOS, write the PATH line to `~/.bashrc` instead of `~/.zshrc`.

### Windows PowerShell

```powershell
$Ver = 'v0.122.0'
$Asset = 'codex-portable-x86_64-pc-windows-msvc-v0.122.0.zip'

Invoke-WebRequest "https://github.com/HansBug/codex-portable/releases/download/$Ver/$Asset" -OutFile $Asset
$Root = Join-Path $env:LOCALAPPDATA 'Programs'
New-Item -ItemType Directory -Force $Root | Out-Null
Expand-Archive $Asset -DestinationPath $Root -Force
$Bundle = Join-Path $Root 'codex-portable-x86_64-pc-windows-msvc-v0.122.0'
$UserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ([string]::IsNullOrWhiteSpace($UserPath)) {
  [Environment]::SetEnvironmentVariable('Path', $Bundle, 'User')
} elseif (($UserPath -split ';') -notcontains $Bundle) {
  [Environment]::SetEnvironmentVariable('Path', "$UserPath;$Bundle", 'User')
}
$env:Path = "$Bundle;$env:Path"

codex --version
```

If PowerShell script execution is restricted, use `codex.cmd --version` or enable local scripts:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Windows Command Prompt

Run these in `cmd.exe`:

```cmd
set "VER=v0.122.0"
set "ASSET=codex-portable-x86_64-pc-windows-msvc-v0.122.0.zip"
```

```cmd
powershell -NoProfile -Command "$asset='%ASSET%'; $root=Join-Path $env:LOCALAPPDATA 'Programs'; Invoke-WebRequest \"https://github.com/HansBug/codex-portable/releases/download/%VER%/$asset\" -OutFile $asset; New-Item -ItemType Directory -Force $root | Out-Null; Expand-Archive $asset -DestinationPath $root -Force; $bundle=Join-Path $root 'codex-portable-x86_64-pc-windows-msvc-v0.122.0'; $userPath=[Environment]::GetEnvironmentVariable('Path','User'); if([string]::IsNullOrWhiteSpace($userPath)){[Environment]::SetEnvironmentVariable('Path',$bundle,'User')} elseif(($userPath -split ';') -notcontains $bundle){[Environment]::SetEnvironmentVariable('Path',\"$userPath;$bundle\",'User')}; Write-Host $bundle"
```

Open a new `cmd.exe` and verify:

```cmd
codex.cmd --version
```

## Manual / offline install

Use this when the target machine has no internet access, or when you prefer to download and transfer the archive manually.

### 1. Open the release page

- Current release: `https://github.com/HansBug/codex-portable/releases/tag/v0.122.0`
- All releases: `https://github.com/HansBug/codex-portable/releases`

### 2. Download the correct asset

Prefer `tar.gz` on Linux and macOS because it preserves executable permissions. The current release `v0.122.0` assets are already linked in the asset table above.

### 3. Extract and start

Keep the extracted directory intact. Do not copy only `codex`, `codex.cmd`, or `codex.ps1` into another folder, because the launcher expects its neighboring bundled files.

#### Linux x64

```bash
tar -xzf codex-portable-x86_64-unknown-linux-musl-v0.122.0.tar.gz
cd codex-portable-x86_64-unknown-linux-musl-v0.122.0
./codex --version
```

#### macOS arm64

```zsh
tar -xzf codex-portable-aarch64-apple-darwin-v0.122.0.tar.gz
cd codex-portable-aarch64-apple-darwin-v0.122.0
./codex --version
```

#### Windows

1. Extract `codex-portable-x86_64-pc-windows-msvc-v0.122.0.zip`.
2. Open `cmd.exe` or PowerShell in the extracted folder.
3. Start with `codex.cmd --version`.
4. If you prefer PowerShell, run `.\codex.ps1 --version`.
5. If PowerShell blocks script execution, either keep using `codex.cmd` or run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 4. Optional: add the extracted folder to PATH

- Linux/macOS: add the extracted bundle directory itself to `PATH`
- Windows: add the extracted folder itself to the user `Path`

For Linux:

```bash
echo 'export PATH="/path/to/codex-portable-x86_64-unknown-linux-musl-v0.122.0:$PATH"' >> "$HOME/.bashrc"
export PATH="/path/to/codex-portable-x86_64-unknown-linux-musl-v0.122.0:$PATH"
```

For macOS:

```zsh
echo 'export PATH="/path/to/codex-portable-aarch64-apple-darwin-v0.122.0:$PATH"' >> "$HOME/.zshrc"
export PATH="/path/to/codex-portable-aarch64-apple-darwin-v0.122.0:$PATH"
```

On Windows, add the extracted folder in System Settings or with PowerShell:

```powershell
[Environment]::SetEnvironmentVariable('Path', "$env:Path;C:\path\to\codex-portable-x86_64-pc-windows-msvc-v0.122.0", 'User')
```

## Basic config

Replace the placeholder values with your real model, base URL, and API key.

### Linux and macOS

```bash
mkdir -p "$HOME/.codex"
cat > "$HOME/.codex/config.toml" <<'EOF'
model = "gpt-5"
model_provider = "portable_provider"

[model_providers.portable_provider]
name = "Portable Provider"
base_url = "https://your-api.example.com/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"
EOF

export OPENAI_API_KEY="replace-with-your-api-key"
```

To keep the key across terminal restarts, append the export line to `~/.bashrc` or `~/.zshrc`.

### Windows PowerShell

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex" | Out-Null
@'
model = "gpt-5"
model_provider = "portable_provider"

[model_providers.portable_provider]
name = "Portable Provider"
base_url = "https://your-api.example.com/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"
'@ | Set-Content "$env:USERPROFILE\.codex\config.toml"

$env:OPENAI_API_KEY = 'replace-with-your-api-key'
```

To keep the key across terminal restarts:

```powershell
[Environment]::SetEnvironmentVariable('OPENAI_API_KEY', 'replace-with-your-api-key', 'User')
```

### Windows Command Prompt

```cmd
mkdir "%USERPROFILE%\.codex"
(
echo model = "gpt-5"
echo model_provider = "portable_provider"
echo.
echo [model_providers.portable_provider]
echo name = "Portable Provider"
echo base_url = "https://your-api.example.com/v1"
echo env_key = "OPENAI_API_KEY"
echo wire_api = "responses"
) > "%USERPROFILE%\.codex\config.toml"

set OPENAI_API_KEY=replace-with-your-api-key
```

To keep the key across terminal restarts:

```cmd
setx OPENAI_API_KEY "replace-with-your-api-key"
```

## Optional proxy setup

Only use these if your target environment must reach the model provider through an HTTP or SOCKS proxy.

### Linux and macOS

```bash
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
export ALL_PROXY="socks5://127.0.0.1:1080"
```

### Windows PowerShell

```powershell
$env:HTTP_PROXY = 'http://127.0.0.1:7890'
$env:HTTPS_PROXY = 'http://127.0.0.1:7890'
$env:ALL_PROXY = 'socks5://127.0.0.1:1080'
```

### Windows Command Prompt

```cmd
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set ALL_PROXY=socks5://127.0.0.1:1080
```

## What is inside each bundle

Each bundle contains:

- a launcher: `codex`, `codex.cmd`, or `codex.ps1`
- the native Codex binary from the official package
- bundled Windows helper executables when upstream ships them
- the bundled `rg` executable
- a short portable usage note
- repository license and metadata

The bundle does not include user state such as `~/.codex`, `auth.json`, sessions, logs, or memories.

## Validation

The Linux `Fast install`, `Manual / offline install`, and `Basic config` flows for the current documented release `v0.122.0` were validated locally in clean Ubuntu-based Docker containers before publication.

## Release and build workflows

### Build Portable Codex

`Build Portable Codex` supports:

- `workflow_dispatch` for manual builds
- `release.published` for release builds that upload archives to the GitHub release and then refresh the generated READMEs

Build matrix targets:

- `ubuntu-22.04` for Linux x64
- `ubuntu-22.04-arm` for Linux arm64
- `macos-15-intel` for macOS x64
- `macos-14` for macOS arm64
- `windows-2022` for Windows x64
- `windows-11-arm` for Windows arm64


Manual input:

- `codex_version=latest` builds the newest stable `@openai/codex`
- `codex_version=0.120.0` builds a pinned historical version

After a published release finishes uploading assets, the workflow renders `README.md` and `README_zh.md` from `templates/*.j2` using the actual release asset list and commits the refreshed docs back to `main`.

### Watch Upstream Codex Release

`Watch Upstream Codex Release` runs every 3 hours and also supports `workflow_dispatch`.

It:

- resolves the latest stable `@openai/codex` version from npm unless you pass a fixed `codex_version`
- fetches the matching upstream GitHub release from `openai/codex`
- uses the configured model endpoint to generate release notes
- creates a repository release tagged as `vX.Y.Z`
- lets the downstream `release.published` workflow build, attach the portable archives, and refresh the generated READMEs

Required repository secrets:

- `RELEASE_WORKFLOW_TOKEN`
- `PORTABLE_TEST_BASE_URL`
- `PORTABLE_TEST_API_KEY`
- `PORTABLE_TEST_MODEL`

`RELEASE_WORKFLOW_TOKEN` must be able to create releases in this repository, because the default `GITHUB_TOKEN` does not trigger downstream workflows when it creates a release.

## Smoke tests

After each build, GitHub Actions downloads the generated archive on a fresh runner, writes a minimal `config.toml`, and runs real `codex exec` checks against the configured API endpoint.
