# codex-portable

[中文说明 / Chinese README](./README_zh.md)

Portable OpenAI Codex CLI bundles for Linux, macOS, and Windows.

Each GitHub release repackages the official `@openai/codex` binary and bundled `rg` into archives that are easy to move into restricted or offline environments.

Release page:

- `https://github.com/HansBug/codex-portable/releases`

## Start here

Pick one path:

- `Fast install`: the target machine has internet access and can download directly from GitHub.
- `Manual / offline install`: you download the archive on one machine, transfer it manually, then extract and start it on the target machine.

## Fast install

These commands download the latest portable release. To pin an older release, replace the auto-detected tag with a fixed tag such as `v0.120.0`.

### Linux x64 (bash)

```bash
REPO="HansBug/codex-portable"
VER="$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | sed -n 's/.*"tag_name": "\([^"]*\)".*/\1/p')"
ASSET="codex-portable-x86_64-unknown-linux-musl-${VER}.tar.gz"

touch "$HOME/.bashrc"
curl -fL -o "$ASSET" "https://github.com/$REPO/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/${ASSET%.tar.gz}" "$HOME/.local/lib/codex-portable"
grep -qxF 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' "$HOME/.bashrc" || echo 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' >> "$HOME/.bashrc"

source "$HOME/.bashrc"
codex --version
```

### macOS arm64 (zsh)

```zsh
REPO="HansBug/codex-portable"
VER="$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | sed -n 's/.*"tag_name": "\([^"]*\)".*/\1/p')"
ASSET="codex-portable-aarch64-apple-darwin-${VER}.tar.gz"

touch "$HOME/.zshrc"
curl -fL -o "$ASSET" "https://github.com/$REPO/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/${ASSET%.tar.gz}" "$HOME/.local/lib/codex-portable"
grep -qxF 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' "$HOME/.zshrc" || echo 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' >> "$HOME/.zshrc"

source "$HOME/.zshrc"
codex --version
```

If you use `bash` on macOS, write the PATH line to `~/.bashrc` instead of `~/.zshrc`.

### Windows PowerShell

```powershell
$Repo = 'HansBug/codex-portable'
$Ver = (Invoke-RestMethod "https://api.github.com/repos/$Repo/releases/latest").tag_name
$Asset = "codex-portable-x86_64-pc-windows-msvc-$Ver.zip"

Invoke-WebRequest "https://github.com/$Repo/releases/download/$Ver/$Asset" -OutFile $Asset
$Root = Join-Path $env:LOCALAPPDATA 'Programs'
New-Item -ItemType Directory -Force $Root | Out-Null
Expand-Archive $Asset -DestinationPath $Root -Force
$Bundle = Join-Path $Root ($Asset -replace '\.zip$','')
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
for /f %i in ('powershell -NoProfile -Command "(Invoke-RestMethod ''https://api.github.com/repos/HansBug/codex-portable/releases/latest'').tag_name"') do set "VER=%i"
```

```cmd
powershell -NoProfile -Command "$asset='codex-portable-x86_64-pc-windows-msvc-%VER%.zip'; $root=Join-Path $env:LOCALAPPDATA 'Programs'; Invoke-WebRequest \"https://github.com/HansBug/codex-portable/releases/download/%VER%/$asset\" -OutFile $asset; New-Item -ItemType Directory -Force $root | Out-Null; Expand-Archive $asset -DestinationPath $root -Force; $bundle=Join-Path $root ($asset -replace '\.zip$',''); $userPath=[Environment]::GetEnvironmentVariable('Path','User'); if([string]::IsNullOrWhiteSpace($userPath)){[Environment]::SetEnvironmentVariable('Path',$bundle,'User')} elseif(($userPath -split ';') -notcontains $bundle){[Environment]::SetEnvironmentVariable('Path',\"$userPath;$bundle\",'User')}; Write-Host $bundle"
```

Open a new `cmd.exe` and verify:

```cmd
codex.cmd --version
```

## Manual / offline install

Use this when the target machine has no internet access, or when you prefer to download and transfer the archive manually.

### 1. Open the release page

- `https://github.com/HansBug/codex-portable/releases`

### 2. Download the correct asset

Prefer `tar.gz` on Linux and macOS because it preserves executable permissions.

- Linux x64: `codex-portable-x86_64-unknown-linux-musl-vX.Y.Z.tar.gz`
- macOS arm64: `codex-portable-aarch64-apple-darwin-vX.Y.Z.tar.gz`
- Windows x64: `codex-portable-x86_64-pc-windows-msvc-vX.Y.Z.zip`
- Optional checksum files: matching `*.sha256`

### 3. Extract and start

Keep the extracted directory intact. Do not copy only `codex`, `codex.cmd`, or `codex.ps1` into another folder, because the launcher expects its neighboring bundled files.

#### Linux x64

```bash
tar -xzf codex-portable-x86_64-unknown-linux-musl-vX.Y.Z.tar.gz
cd codex-portable-x86_64-unknown-linux-musl-vX.Y.Z
./codex --version
```

#### macOS arm64

```zsh
tar -xzf codex-portable-aarch64-apple-darwin-vX.Y.Z.tar.gz
cd codex-portable-aarch64-apple-darwin-vX.Y.Z
./codex --version
```

#### Windows

1. Extract `codex-portable-x86_64-pc-windows-msvc-vX.Y.Z.zip`.
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
echo 'export PATH="/path/to/codex-portable-x86_64-unknown-linux-musl-vX.Y.Z:$PATH"' >> "$HOME/.bashrc"
source "$HOME/.bashrc"
```

For macOS:

```zsh
echo 'export PATH="/path/to/codex-portable-aarch64-apple-darwin-vX.Y.Z:$PATH"' >> "$HOME/.zshrc"
source "$HOME/.zshrc"
```

On Windows, add the extracted folder in System Settings or with PowerShell:

```powershell
[Environment]::SetEnvironmentVariable('Path', "$env:Path;C:\path\to\codex-portable-x86_64-pc-windows-msvc-vX.Y.Z", 'User')
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
- the bundled `rg` executable
- a short portable usage note
- repository license and metadata

The bundle does not include user state such as `~/.codex`, `auth.json`, sessions, logs, or memories.

## Validation

The Linux `Fast install`, `Manual / offline install`, and `Basic config` flows in this README were validated locally in clean Ubuntu-based Docker containers before publication.

## Release and build workflows

### Build Portable Codex

`Build Portable Codex` supports:

- `workflow_dispatch` for manual builds
- `release.published` for release builds that also upload archives to the GitHub release

Manual input:

- `codex_version=latest` builds the newest stable `@openai/codex`
- `codex_version=0.120.0` builds a pinned historical version

### Watch Upstream Codex Release

`Watch Upstream Codex Release` runs every 3 hours and also supports `workflow_dispatch`.

It:

- resolves the latest stable `@openai/codex` version from npm unless you pass a fixed `codex_version`
- fetches the matching upstream GitHub release from `openai/codex`
- uses the configured model endpoint to generate release notes
- creates a repository release tagged as `vX.Y.Z`
- lets the downstream `release.published` workflow build and attach the portable archives

Required repository secrets:

- `RELEASE_WORKFLOW_TOKEN`
- `PORTABLE_TEST_BASE_URL`
- `PORTABLE_TEST_API_KEY`
- `PORTABLE_TEST_MODEL`

`RELEASE_WORKFLOW_TOKEN` must be able to create releases in this repository, because the default `GITHUB_TOKEN` does not trigger downstream workflows when it creates a release.

## Smoke tests

After each build, GitHub Actions downloads the generated artifact on a fresh runner, writes a minimal `config.toml`, and runs real `codex exec` checks against the configured API endpoint.

The smoke tests verify:

- bundle startup and normal `codex exec`
- packaged file layout
- a tool-read probe that emits a `command_execution` event
- a system-write probe that emits a `command_execution` event

## Local development

Run the packaging script locally with:

```bash
node scripts/build-portable.mjs --version latest
```

The script writes its output to `dist/`.

## License

This repository is licensed under Apache-2.0. Packaged Codex binaries are redistributed from the upstream `@openai/codex` package, which is also published under Apache-2.0.
