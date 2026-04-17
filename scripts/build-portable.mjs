#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  chmodSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const distRoot = path.join(repoRoot, "dist");
const workRoot = path.join(repoRoot, ".work", `${process.platform}-${process.arch}`);

const args = parseArgs(process.argv.slice(2));
const requestedVersion = args.version ?? "latest";
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const packageSpec =
  requestedVersion === "latest"
    ? "@openai/codex@latest"
    : `@openai/codex@${requestedVersion}`;

rmSync(workRoot, { force: true, recursive: true });
mkdirSync(workRoot, { recursive: true });
rmSync(distRoot, { force: true, recursive: true });
mkdirSync(distRoot, { recursive: true });

const installRoot = path.join(workRoot, "install");
mkdirSync(installRoot, { recursive: true });
writeFileSync(
  path.join(installRoot, "package.json"),
  JSON.stringify(
    {
      name: "codex-portable-build",
      private: true,
    },
    null,
    2,
  ) + "\n",
);

runCommand(npmCommand, [
  "install",
  "--no-package-lock",
  "--no-save",
  "--ignore-scripts",
  "--no-audit",
  "--no-fund",
  packageSpec,
], installRoot);

const codexPackageRoot = path.join(installRoot, "node_modules", "@openai", "codex");
if (!existsSync(codexPackageRoot)) {
  throw new Error(`Codex package was not installed at ${codexPackageRoot}`);
}

const codexPackageJson = readJson(path.join(codexPackageRoot, "package.json"));
const platformSearchRoots = [
  path.join(installRoot, "node_modules", "@openai"),
  path.join(codexPackageRoot, "node_modules", "@openai"),
];

let platformPackageRoot = null;
let platformPackageName = null;

for (const searchRoot of platformSearchRoots) {
  if (!existsSync(searchRoot)) {
    continue;
  }

  const candidates = readdirSync(searchRoot).filter(
    (name) => name.startsWith("codex-") && name !== "codex",
  );

  if (candidates.length === 1) {
    platformPackageName = candidates[0];
    platformPackageRoot = path.join(searchRoot, platformPackageName);
    break;
  }

  if (candidates.length > 1) {
    throw new Error(
      `Expected one platform package in ${searchRoot}, found: ${candidates.join(", ")}`,
    );
  }
}

if (!platformPackageRoot || !platformPackageName) {
  throw new Error("Could not locate an installed platform package for @openai/codex");
}
const vendorRoot = path.join(platformPackageRoot, "vendor");
const targetTriples = readdirSync(vendorRoot).filter((entry) =>
  statSync(path.join(vendorRoot, entry)).isDirectory(),
);

if (targetTriples.length !== 1) {
  throw new Error(
    `Expected exactly one target triple directory, found: ${targetTriples.join(", ") || "(none)"}`,
  );
}

const targetTriple = targetTriples[0];
const tripleRoot = path.join(vendorRoot, targetTriple);
const codexBinaryName = process.platform === "win32" ? "codex.exe" : "codex";
const sourceCodexDir = path.join(tripleRoot, "codex");
const sourceBinaryPath = path.join(sourceCodexDir, codexBinaryName);
const sourcePathDir = path.join(tripleRoot, "path");

if (!existsSync(sourceBinaryPath)) {
  throw new Error(`Codex binary not found at ${sourceBinaryPath}`);
}

const resolvedVersion = codexPackageJson.version;
const bundleName = `codex-portable-${targetTriple}-v${resolvedVersion}`;
const bundleRoot = path.join(distRoot, bundleName);
const bundleBinRoot = path.join(bundleRoot, "bin");

mkdirSync(bundleBinRoot, { recursive: true });

const bundledBinaryName = process.platform === "win32" ? "codex-real.exe" : "codex-real";
copyDirectoryContents(sourceCodexDir, bundleBinRoot, {
  rename: (entry) => (entry === codexBinaryName ? bundledBinaryName : entry),
});
copyDirectoryContents(sourcePathDir, bundleBinRoot);

if (process.platform === "win32") {
  const cmdLauncher = [
    "@echo off",
    "setlocal",
    'set "SELF_DIR=%~dp0"',
    'set "BIN_DIR=%SELF_DIR%bin"',
    'if defined PATH (set "PATH=%BIN_DIR%;%PATH%") else (set "PATH=%BIN_DIR%")',
    '"%BIN_DIR%\\codex-real.exe" %*',
  ].join("\r\n");
  writeFileSync(path.join(bundleRoot, "codex.cmd"), `${cmdLauncher}\r\n`);

  const psLauncher = [
    "$ErrorActionPreference = 'Stop'",
    "$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent",
    "$binDir = Join-Path $scriptDir 'bin'",
    "$env:PATH = \"$binDir;$env:PATH\"",
    "& (Join-Path $binDir 'codex-real.exe') @args",
    "exit $LASTEXITCODE",
  ].join("\r\n");
  writeFileSync(path.join(bundleRoot, "codex.ps1"), `${psLauncher}\r\n`);
} else {
  const shLauncher = [
    "#!/usr/bin/env sh",
    "set -eu",
    'SELF_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)',
    'BIN_DIR="$SELF_DIR/bin"',
    'export PATH="$BIN_DIR${PATH:+:$PATH}"',
    'exec "$BIN_DIR/codex-real" "$@"',
  ].join("\n");
  const launcherPath = path.join(bundleRoot, "codex");
  writeFileSync(launcherPath, `${shLauncher}\n`);
  chmodSync(launcherPath, 0o755);
}

writeFileSync(path.join(bundleRoot, "README-portable.txt"), buildPortableReadme({
  bundleName,
  targetTriple,
  resolvedVersion,
}));
cpSync(path.join(repoRoot, "LICENSE"), path.join(bundleRoot, "LICENSE"));
cpSync(path.join(repoRoot, "AGENTS.md"), path.join(bundleRoot, "AGENTS.md"));

const metadata = {
  bundleName,
  bundleRoot,
  hostPlatform: process.platform,
  hostArchitecture: process.arch,
  nodeVersion: process.version,
  requestedVersion,
  resolvedVersion,
  npmPackage: codexPackageJson.name,
  npmLicense: codexPackageJson.license,
  platformPackageName,
  targetTriple,
  generatedAtUtc: new Date().toISOString(),
  hostname: os.hostname(),
};

writeFileSync(
  path.join(bundleRoot, "portable-metadata.json"),
  JSON.stringify(metadata, null, 2) + "\n",
);
writeFileSync(
  path.join(distRoot, "build-metadata.json"),
  JSON.stringify(metadata, null, 2) + "\n",
);

writeGitHubOutput("bundle_name", bundleName);
writeGitHubOutput("bundle_root", bundleRoot);
writeGitHubOutput("resolved_version", resolvedVersion);
writeGitHubOutput("target_triple", targetTriple);

console.log(`Built ${bundleName}`);
console.log(`Bundle directory: ${bundleRoot}`);

function buildPortableReadme({ bundleName, targetTriple, resolvedVersion }) {
  if (process.platform === "win32") {
    return [
      `Codex Portable Bundle: ${bundleName}`,
      `Codex Version: ${resolvedVersion}`,
      `Target Triple: ${targetTriple}`,
      "",
      "Contents",
      "- codex.cmd / codex.ps1: launcher scripts",
      "- bin/codex-real.exe: native Codex binary",
      "- bin/*.exe: bundled helper executables when provided by upstream",
      "- bin/rg.exe: bundled ripgrep executable when provided by upstream",
      "",
      "Usage",
      "1. Extract this directory anywhere on the target machine.",
      "2. Run codex.cmd from Command Prompt, or codex.ps1 from PowerShell.",
      "",
      "Proxy examples",
      "- set HTTP_PROXY=http://127.0.0.1:7890",
      "- set HTTPS_PROXY=http://127.0.0.1:7890",
      "- set ALL_PROXY=socks5://127.0.0.1:1080",
      "",
      "Configuration",
      "- Default config path: %USERPROFILE%\\.codex\\config.toml",
      "- This bundle does not include user state from .codex.",
      "",
      "Notes",
      "- HTTPS providers require valid CA certificates on the target system.",
      "- Credentials can be supplied with interactive login or provider-specific environment variables.",
      "",
    ].join("\r\n");
  }

  return [
    `Codex Portable Bundle: ${bundleName}`,
    `Codex Version: ${resolvedVersion}`,
    `Target Triple: ${targetTriple}`,
    "",
    "Contents",
    "- ./codex: launcher script",
    "- ./bin/codex-real: native Codex binary",
    "- ./bin/rg: bundled ripgrep executable when provided by upstream",
    "",
    "Usage",
    "1. Extract this directory anywhere on the target machine.",
    "2. Ensure executables keep their execute bit after extraction.",
    "3. Start with ./codex",
    "",
    "Proxy examples",
    "- HTTP_PROXY=http://127.0.0.1:7890 HTTPS_PROXY=http://127.0.0.1:7890 ./codex",
    "- ALL_PROXY=socks5://127.0.0.1:1080 ./codex",
    "",
    "Configuration",
    "- Default config path: ~/.codex/config.toml",
    "- This bundle does not include user state from ~/.codex.",
    "",
    "Notes",
    "- HTTPS providers require valid CA certificates on the target system.",
    "- Credentials can be supplied with interactive login or provider-specific environment variables.",
    "",
  ].join("\n");
}

function copyDirectoryContents(sourceDir, targetDir, options = {}) {
  if (!existsSync(sourceDir)) {
    return;
  }

  const rename = options.rename ?? ((entry) => entry);
  for (const entry of readdirSync(sourceDir)) {
    const sourceEntry = path.join(sourceDir, entry);
    const renamedEntry = rename(entry);
    const targetEntry = path.join(targetDir, renamedEntry);
    cpSync(sourceEntry, targetEntry, { recursive: true });
    if (process.platform !== "win32" && statSync(targetEntry).isFile()) {
      chmodSync(targetEntry, 0o755);
    }
  }
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--version") {
      parsed.version = argv[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`Unsupported argument: ${arg}`);
  }
  return parsed;
}

function readJson(filename) {
  return JSON.parse(readFileSync(filename, "utf8"));
}

function runCommand(command, commandArgs, cwd) {
  if (process.platform === "win32") {
    const wrappedArgs = ["/d", "/s", "/c", command, ...commandArgs];
    console.log(`Running: cmd.exe ${wrappedArgs.join(" ")}`);
    execFileSync("cmd.exe", wrappedArgs, {
      cwd,
      stdio: "inherit",
    });
    return;
  }

  console.log(`Running: ${command} ${commandArgs.join(" ")}`);
  execFileSync(command, commandArgs, {
    cwd,
    stdio: "inherit",
  });
}

function writeGitHubOutput(key, value) {
  if (!process.env.GITHUB_OUTPUT) {
    return;
  }
  const line = `${key}=${String(value)}\n`;
  writeFileSync(process.env.GITHUB_OUTPUT, line, { flag: "a" });
}
