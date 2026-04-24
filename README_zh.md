<!--
Generated from templates/README_zh.md.j2 by scripts/render-readme.py.
请编辑模板文件，不要直接编辑这个生成文件。
-->
# codex-portable

[English README](./README.md)

面向 Linux、macOS 和 Windows 的 OpenAI Codex CLI portable 便携包。

每个 GitHub release 都会把官方 `@openai/codex` 二进制和自带的 `rg` 重新打包成便于搬运的归档文件，适合受限网络环境或完全离线环境使用。

Release 页面：

- 全部版本：`https://github.com/HansBug/codex-portable/releases`
- 当前文档固定版本：[`v0.125.0`](https://github.com/HansBug/codex-portable/releases/tag/v0.125.0)，发布日期 `2026-04-24`

当前支持发布的目标：

- Linux x64：`x86_64-unknown-linux-musl`
- Linux arm64：`aarch64-unknown-linux-musl`
- macOS x64：`x86_64-apple-darwin`
- macOS arm64：`aarch64-apple-darwin`
- Windows x64：`x86_64-pc-windows-msvc`
- Windows arm64：`aarch64-pc-windows-msvc`


## 当前 release 附件

本 README 固定到当前已发布的 `v0.125.0`。下表会在 release 附件全部上传完成后，基于真实附件列表自动刷新。

| 平台 | 推荐归档 | 备用归档 | SHA-256 文件 |
| --- | --- | --- | --- |
| Linux x64 | [codex-portable-x86_64-unknown-linux-musl-v0.125.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-unknown-linux-musl-v0.125.0.tar.gz) | [codex-portable-x86_64-unknown-linux-musl-v0.125.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-unknown-linux-musl-v0.125.0.zip) | [codex-portable-x86_64-unknown-linux-musl-v0.125.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-unknown-linux-musl-v0.125.0.sha256) |
| Linux arm64 | [codex-portable-aarch64-unknown-linux-musl-v0.125.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-unknown-linux-musl-v0.125.0.tar.gz) | [codex-portable-aarch64-unknown-linux-musl-v0.125.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-unknown-linux-musl-v0.125.0.zip) | [codex-portable-aarch64-unknown-linux-musl-v0.125.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-unknown-linux-musl-v0.125.0.sha256) |
| macOS x64 | [codex-portable-x86_64-apple-darwin-v0.125.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-apple-darwin-v0.125.0.tar.gz) | [codex-portable-x86_64-apple-darwin-v0.125.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-apple-darwin-v0.125.0.zip) | [codex-portable-x86_64-apple-darwin-v0.125.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-apple-darwin-v0.125.0.sha256) |
| macOS arm64 | [codex-portable-aarch64-apple-darwin-v0.125.0.tar.gz](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-apple-darwin-v0.125.0.tar.gz) | [codex-portable-aarch64-apple-darwin-v0.125.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-apple-darwin-v0.125.0.zip) | [codex-portable-aarch64-apple-darwin-v0.125.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-apple-darwin-v0.125.0.sha256) |
| Windows x64 | [codex-portable-x86_64-pc-windows-msvc-v0.125.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-pc-windows-msvc-v0.125.0.zip) | - | [codex-portable-x86_64-pc-windows-msvc-v0.125.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-x86_64-pc-windows-msvc-v0.125.0.sha256) |
| Windows arm64 | [codex-portable-aarch64-pc-windows-msvc-v0.125.0.zip](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-pc-windows-msvc-v0.125.0.zip) | - | [codex-portable-aarch64-pc-windows-msvc-v0.125.0.sha256](https://github.com/HansBug/codex-portable/releases/download/v0.125.0/codex-portable-aarch64-pc-windows-msvc-v0.125.0.sha256) |


## 先选安装路径

你可以按场景选择：

- `Fast install`：目标机器本身能联网，能直接从 GitHub 下载
- `Manual / offline install`：先在别的机器下载归档，再手工拷贝到目标机器解压运行

## Fast install

下面的命令会直接安装当前文档固定版本 `v0.125.0`。如果你需要更老的 Codex 版本，请打开 Releases 页面，把下面固定写死的 tag 和资源文件名替换成目标版本即可。

下面每个平台只展示一个最常见架构的命令。其他已支持架构的安装步骤相同，只需要把资源文件名替换成上面附件表里对应的那个即可。

### Linux x64（bash）

```bash
VER="v0.125.0"
ASSET="codex-portable-x86_64-unknown-linux-musl-v0.125.0.tar.gz"

touch "$HOME/.bashrc"
curl -fL -o "$ASSET" "https://github.com/HansBug/codex-portable/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/codex-portable-x86_64-unknown-linux-musl-v0.125.0" "$HOME/.local/lib/codex-portable"
grep -qxF 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' "$HOME/.bashrc" || echo 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' >> "$HOME/.bashrc"

export PATH="$HOME/.local/lib/codex-portable:$PATH"
codex --version
```

### macOS arm64（zsh）

```zsh
VER="v0.125.0"
ASSET="codex-portable-aarch64-apple-darwin-v0.125.0.tar.gz"

touch "$HOME/.zshrc"
curl -fL -o "$ASSET" "https://github.com/HansBug/codex-portable/releases/download/$VER/$ASSET"
mkdir -p "$HOME/.local/lib"
tar -xzf "$ASSET" -C "$HOME/.local/lib"
ln -sfn "$HOME/.local/lib/codex-portable-aarch64-apple-darwin-v0.125.0" "$HOME/.local/lib/codex-portable"
grep -qxF 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' "$HOME/.zshrc" || echo 'export PATH="$HOME/.local/lib/codex-portable:$PATH"' >> "$HOME/.zshrc"

export PATH="$HOME/.local/lib/codex-portable:$PATH"
codex --version
```

如果你在 macOS 上用的是 `bash`，把 PATH 那一行写到 `~/.bashrc` 即可。

### Windows PowerShell

```powershell
$Ver = 'v0.125.0'
$Asset = 'codex-portable-x86_64-pc-windows-msvc-v0.125.0.zip'

Invoke-WebRequest "https://github.com/HansBug/codex-portable/releases/download/$Ver/$Asset" -OutFile $Asset
$Root = Join-Path $env:LOCALAPPDATA 'Programs'
New-Item -ItemType Directory -Force $Root | Out-Null
Expand-Archive $Asset -DestinationPath $Root -Force
$Bundle = Join-Path $Root 'codex-portable-x86_64-pc-windows-msvc-v0.125.0'
$UserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ([string]::IsNullOrWhiteSpace($UserPath)) {
  [Environment]::SetEnvironmentVariable('Path', $Bundle, 'User')
} elseif (($UserPath -split ';') -notcontains $Bundle) {
  [Environment]::SetEnvironmentVariable('Path', "$UserPath;$Bundle", 'User')
}
$env:Path = "$Bundle;$env:Path"

codex --version
```

如果 PowerShell 执行策略阻止脚本，可以直接运行 `codex.cmd --version`，或者先执行：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Windows 命令提示符（CMD）

在 `cmd.exe` 中执行：

```cmd
set "VER=v0.125.0"
set "ASSET=codex-portable-x86_64-pc-windows-msvc-v0.125.0.zip"
```

```cmd
powershell -NoProfile -Command "$asset='%ASSET%'; $root=Join-Path $env:LOCALAPPDATA 'Programs'; Invoke-WebRequest \"https://github.com/HansBug/codex-portable/releases/download/%VER%/$asset\" -OutFile $asset; New-Item -ItemType Directory -Force $root | Out-Null; Expand-Archive $asset -DestinationPath $root -Force; $bundle=Join-Path $root 'codex-portable-x86_64-pc-windows-msvc-v0.125.0'; $userPath=[Environment]::GetEnvironmentVariable('Path','User'); if([string]::IsNullOrWhiteSpace($userPath)){[Environment]::SetEnvironmentVariable('Path',$bundle,'User')} elseif(($userPath -split ';') -notcontains $bundle){[Environment]::SetEnvironmentVariable('Path',\"$userPath;$bundle\",'User')}; Write-Host $bundle"
```

重新打开一个新的 `cmd.exe`，再验证：

```cmd
codex.cmd --version
```

## Manual / offline install

如果目标机器完全没网，或者你希望手工搬运归档文件，就走这一条。

### 1. 打开 release 页面

- 当前版本：`https://github.com/HansBug/codex-portable/releases/tag/v0.125.0`
- 全部版本：`https://github.com/HansBug/codex-portable/releases`

### 2. 下载正确的归档文件

Linux 和 macOS 推荐优先下载 `tar.gz`，因为它能保留可执行权限。当前 `v0.125.0` 的真实附件已经在上面的附件表中全部列出。

### 3. 解压并启动

请保持整个解压目录完整，不要只把 `codex`、`codex.cmd` 或 `codex.ps1` 单独拷到别的目录里；启动器依赖同目录下的配套文件。

#### Linux x64

```bash
tar -xzf codex-portable-x86_64-unknown-linux-musl-v0.125.0.tar.gz
cd codex-portable-x86_64-unknown-linux-musl-v0.125.0
./codex --version
```

#### macOS arm64

```zsh
tar -xzf codex-portable-aarch64-apple-darwin-v0.125.0.tar.gz
cd codex-portable-aarch64-apple-darwin-v0.125.0
./codex --version
```

#### Windows

1. 解压 `codex-portable-x86_64-pc-windows-msvc-v0.125.0.zip`
2. 在解压后的目录里打开 `cmd.exe` 或 PowerShell
3. 优先运行 `codex.cmd --version`
4. 如果你习惯 PowerShell，也可以运行 `.\codex.ps1 --version`
5. 如果 PowerShell 阻止执行脚本，可以继续用 `codex.cmd`，或者执行：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 4. 可选：把解压后的目录加入 PATH

- Linux/macOS：把解压出来的 bundle 目录本身加入 `PATH`
- Windows：把解压后的目录本身加入用户 `Path`

Linux 示例：

```bash
echo 'export PATH="/path/to/codex-portable-x86_64-unknown-linux-musl-v0.125.0:$PATH"' >> "$HOME/.bashrc"
export PATH="/path/to/codex-portable-x86_64-unknown-linux-musl-v0.125.0:$PATH"
```

macOS 示例：

```zsh
echo 'export PATH="/path/to/codex-portable-aarch64-apple-darwin-v0.125.0:$PATH"' >> "$HOME/.zshrc"
export PATH="/path/to/codex-portable-aarch64-apple-darwin-v0.125.0:$PATH"
```

Windows 可以在系统设置里手工加，也可以用 PowerShell：

```powershell
[Environment]::SetEnvironmentVariable('Path', "$env:Path;C:\path\to\codex-portable-x86_64-pc-windows-msvc-v0.125.0", 'User')
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

如果希望终端重开后依然生效，把 export 那一行追加到 `~/.bashrc` 或 `~/.zshrc`。

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

只有当目标环境访问模型服务必须经过 HTTP 或 SOCKS 代理时，才需要设置这些环境变量。

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

## 每个 bundle 里有什么

每个 bundle 都包含：

- 启动器：`codex`、`codex.cmd` 或 `codex.ps1`
- 官方包里的原生 Codex 可执行文件
- 如果 upstream 提供，还会包含 Windows 辅助可执行文件
- 自带的 `rg`
- 一份简短的 portable 说明
- 仓库许可证和元数据

bundle 不包含用户数据，例如 `~/.codex`、`auth.json`、历史会话、日志或 memory。

## 验证情况

当前文档固定版本 `v0.125.0` 的 Linux `Fast install`、`Manual / offline install` 和 `Basic config` 已在干净的 Ubuntu Docker 容器中实际验证后再发布。

## Release 与构建工作流

### Build Portable Codex

`Build Portable Codex` 支持：

- `workflow_dispatch`：手动构建
- `release.published`：release 发布后自动构建、上传归档文件，并刷新生成式 README

构建矩阵使用的 runner：

- `ubuntu-22.04`：Linux x64
- `ubuntu-22.04-arm`：Linux arm64
- `macos-15-intel`：macOS x64
- `macos-14`：macOS arm64
- `windows-2022`：Windows x64
- `windows-11-arm`：Windows arm64


手动输入参数：

- `codex_version=latest`：构建最新稳定版 `@openai/codex`
- `codex_version=0.120.0`：构建指定历史版本

在 release 附件全部上传完成后，这个 workflow 会根据真实附件列表，用 `templates/*.j2` 重新渲染 `README.md` 和 `README_zh.md`，然后把刷新后的文档提交回 `main`。

### Watch Upstream Codex Release

`Watch Upstream Codex Release` 每 3 小时运行一次，也支持手动触发。

它会：

- 默认从 npm 解析最新稳定版 `@openai/codex`，或者使用你手动传入的 `codex_version`
- 拉取 `openai/codex` 对应的 upstream release
- 使用配置好的模型接口生成 release 文本
- 创建 `vX.Y.Z` 格式的仓库 release
- 再由下游 `release.published` workflow 完成构建、附件上传和 README 刷新

需要的仓库 secrets：

- `RELEASE_WORKFLOW_TOKEN`
- `PORTABLE_TEST_BASE_URL`
- `PORTABLE_TEST_API_KEY`
- `PORTABLE_TEST_MODEL`

其中 `RELEASE_WORKFLOW_TOKEN` 需要能在这个仓库里创建 release，因为默认 `GITHUB_TOKEN` 创建 release 后不会继续触发下游 workflow。

## Smoke tests

每次构建完成后，GitHub Actions 都会把生成的归档文件下载到全新 runner，写入最小 `config.toml`，并对真实模型接口执行 `codex exec` 验证。
