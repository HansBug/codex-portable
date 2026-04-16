# codex-portable

[English README](./README.md)

使用 GitHub Actions 为 Linux、macOS 和 Windows 构建 OpenAI Codex CLI 的 portable 便携包。

这个仓库不直接提交 Codex 二进制文件。每次发布时，GitHub Actions 会下载官方 `@openai/codex` npm 包，提取原生 Codex 可执行文件和自带的 `rg`，再重新打包成便于离线搬运的压缩包。

## 快速安装

下面的命令默认下载当前最新发布的 portable 版本。如果你想固定旧版本，把自动获取到的 tag 改成例如 `v0.120.0` 即可。

### Linux x64（bash）

```bash
REPO="HansBug/codex-portable"
VER="$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | grep -m1 '"tag_name"' | cut -d '"' -f 4)"
ASSET="codex-portable-x86_64-unknown-linux-musl-${VER}.tar.gz"

curl -fL -o "$ASSET" "https://github.com/$REPO/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib" "$HOME/.local/bin"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/${ASSET%.tar.gz}" "$HOME/.local/lib/codex-portable"
ln -sfn "$HOME/.local/lib/codex-portable/codex" "$HOME/.local/bin/codex"
grep -qxF 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.bashrc" || echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"

source "$HOME/.bashrc"
codex --version
```

### macOS arm64（zsh）

```zsh
REPO="HansBug/codex-portable"
VER="$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | grep -m1 '"tag_name"' | cut -d '"' -f 4)"
ASSET="codex-portable-aarch64-apple-darwin-${VER}.tar.gz"

curl -fL -o "$ASSET" "https://github.com/$REPO/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib" "$HOME/.local/bin"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/${ASSET%.tar.gz}" "$HOME/.local/lib/codex-portable"
ln -sfn "$HOME/.local/lib/codex-portable/codex" "$HOME/.local/bin/codex"
grep -qxF 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.zshrc" || echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"

source "$HOME/.zshrc"
codex --version
```

如果你在 macOS 上用的是 `bash`，把上面的 `~/.zshrc` 改成 `~/.bashrc` 即可。

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

如果 PowerShell 因执行策略不允许脚本运行，可以直接用 `codex.cmd --version`，或者执行：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Windows 命令提示符（CMD）

在 `cmd.exe` 里依次执行：

```cmd
powershell -NoProfile -Command ^
  "$repo='HansBug/codex-portable';" ^
  "$ver=(Invoke-RestMethod \"https://api.github.com/repos/$repo/releases/latest\").tag_name;" ^
  "$asset=\"codex-portable-x86_64-pc-windows-msvc-$ver.zip\";" ^
  "Invoke-WebRequest \"https://github.com/$repo/releases/download/$ver/$asset\" -OutFile $asset;" ^
  "$root=Join-Path $env:LOCALAPPDATA 'Programs';" ^
  "New-Item -ItemType Directory -Force $root | Out-Null;" ^
  "Expand-Archive $asset -DestinationPath $root -Force;" ^
  "Write-Host (Join-Path $root ($asset -replace '\.zip$',''))"
dir /ad /b "%LOCALAPPDATA%\Programs\codex-portable-*"
```

然后把输出出来的目录加到用户 `PATH` 里，重新打开一个新的 `cmd.exe`，再执行：

```cmd
codex --version
```

## 基础配置

把下面示例里的模型名、`base_url` 和 API Key 替换成你自己的真实值。

### Linux 和 macOS

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

如果希望终端重开后仍然生效，把 `export OPENAI_API_KEY=...` 追加到 `~/.bashrc` 或 `~/.zshrc`。

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

如果希望永久生效：

```powershell
[Environment]::SetEnvironmentVariable('OPENAI_API_KEY', 'replace-with-your-api-key', 'User')
```

### Windows 命令提示符（CMD）

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

如果希望永久生效：

```cmd
setx OPENAI_API_KEY "replace-with-your-api-key"
```

## 可选代理配置

如果目标环境访问模型服务必须经过 HTTP 或 SOCKS 代理，再设置下面这些环境变量。

### Linux 和 macOS

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

### Windows 命令提示符（CMD）

```cmd
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set ALL_PROXY=socks5://127.0.0.1:1080
```

## 每个便携包里有什么

每个 bundle 都包含：

- 一个轻量启动器：`codex`、`codex.cmd` 或 `codex.ps1`
- 官方包里的原生 Codex 可执行文件
- Codex 使用的 `rg` 可执行文件
- 一份简短的 portable 使用说明
- 仓库许可证和元数据

这些 bundle 不包含用户数据，例如 `~/.codex`、`auth.json`、会话记录、日志和本地 memory。

## Release 与构建工作流

### Build Portable Codex

`Build Portable Codex` 支持：

- `workflow_dispatch`：手动构建
- `release.published`：在 release 发布后自动构建并把压缩包上传到该 release

手动输入参数：

- `codex_version=latest`：构建最新稳定版 `@openai/codex`
- `codex_version=0.120.0`：构建指定历史版本

### Watch Upstream Codex Release

`Watch Upstream Codex Release` 每 3 小时执行一次，也支持手动触发。

它会：

- 默认从 npm 获取最新稳定版 `@openai/codex`，或者使用你手动传入的 `codex_version`
- 拉取 `openai/codex` 对应的 upstream release 信息
- 用配置好的模型接口生成简短的 release 摘要
- 在本仓库里创建 `vX.Y.Z` 格式的 release
- 再由下游 `release.published` 工作流完成构建和附件上传

需要的仓库 secrets：

- `RELEASE_WORKFLOW_TOKEN`
- `PORTABLE_TEST_BASE_URL`
- `PORTABLE_TEST_API_KEY`
- `PORTABLE_TEST_MODEL`

其中 `RELEASE_WORKFLOW_TOKEN` 必须能在这个仓库里创建 release，因为默认的 `GITHUB_TOKEN` 在创建 release 后不会继续触发下游 workflow。

## Smoke Test

每次构建完成后，workflow 会把刚打出来的 artifact 下载到一台全新的 runner 上，写入最小化的 `config.toml`，然后对真实模型接口执行 `codex exec` 验证。

当前 smoke test 会检查：

- bundle 能正常启动，`codex exec` 可用
- 打包后的文件结构是否完整
- 工具读文件时是否出现 `command_execution` 事件
- 系统写文件时是否出现 `command_execution` 事件

## 本地开发

本地可以直接运行打包脚本：

```bash
node scripts/build-portable.mjs --version latest
```

输出目录是 `dist/`。

## 许可证

本仓库采用 Apache-2.0 许可证。打包分发的 Codex 二进制文件来自 upstream `@openai/codex` npm 包，该包同样采用 Apache-2.0。
