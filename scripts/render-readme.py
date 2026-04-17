#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, StrictUndefined


ROOT = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = ROOT / "templates"

TARGETS: list[dict[str, Any]] = [
    {
        "key": "linux_x64",
        "platform_en": "Linux x64",
        "platform_zh": "Linux x64",
        "triple": "x86_64-unknown-linux-musl",
        "preferred_kind": "tar.gz",
        "alternate_kind": "zip",
    },
    {
        "key": "linux_arm64",
        "platform_en": "Linux arm64",
        "platform_zh": "Linux arm64",
        "triple": "aarch64-unknown-linux-musl",
        "preferred_kind": "tar.gz",
        "alternate_kind": "zip",
    },
    {
        "key": "macos_x64",
        "platform_en": "macOS x64",
        "platform_zh": "macOS x64",
        "triple": "x86_64-apple-darwin",
        "preferred_kind": "tar.gz",
        "alternate_kind": "zip",
    },
    {
        "key": "macos_arm64",
        "platform_en": "macOS arm64",
        "platform_zh": "macOS arm64",
        "triple": "aarch64-apple-darwin",
        "preferred_kind": "tar.gz",
        "alternate_kind": "zip",
    },
    {
        "key": "windows_x64",
        "platform_en": "Windows x64",
        "platform_zh": "Windows x64",
        "triple": "x86_64-pc-windows-msvc",
        "preferred_kind": "zip",
        "alternate_kind": None,
    },
    {
        "key": "windows_arm64",
        "platform_en": "Windows arm64",
        "platform_zh": "Windows arm64",
        "triple": "aarch64-pc-windows-msvc",
        "preferred_kind": "zip",
        "alternate_kind": None,
    },
]

QUICK_EXAMPLE_KEYS = {
    "linux": "linux_x64",
    "macos": "macos_arm64",
    "windows": "windows_x64",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Render README files from Jinja templates and release metadata."
    )
    parser.add_argument(
        "--release-json",
        required=True,
        help="Path to JSON metadata from `gh release view --json ...`.",
    )
    parser.add_argument(
        "--repo",
        required=True,
        help="Repository slug, for example HansBug/codex-portable.",
    )
    parser.add_argument(
        "--output-root",
        default=str(ROOT),
        help="Repository root where README.md and README_zh.md should be written.",
    )
    return parser.parse_args()


def load_release_metadata(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def normalize_asset(asset: dict[str, Any], fallback_base_url: str) -> dict[str, Any]:
    name = asset["name"]
    return {
        "name": name,
        "url": asset.get("url") or f"{fallback_base_url}/{name}",
        "digest": asset.get("digest", ""),
        "download_count": asset.get("downloadCount", 0),
    }


def build_context(release_json: dict[str, Any], repo: str) -> dict[str, Any]:
    release_tag = release_json["tagName"]
    release_version = release_tag.removeprefix("v")
    release_url = release_json["url"]
    published_at = release_json.get("publishedAt", "")
    published_date = published_at[:10] if published_at else ""
    releases_url = f"https://github.com/{repo}/releases"
    download_base_url = f"{releases_url}/download/{release_tag}"

    raw_assets = release_json.get("assets", [])
    assets_by_name = {
        asset["name"]: normalize_asset(asset, download_base_url) for asset in raw_assets
    }

    rendered_targets: list[dict[str, Any]] = []
    targets_by_key: dict[str, dict[str, Any]] = {}

    for target in TARGETS:
        bundle_name = f"codex-portable-{target['triple']}-{release_tag}"
        expected_assets = {
            "preferred": f"{bundle_name}.{target['preferred_kind']}",
            "checksum": f"{bundle_name}.sha256",
        }
        if target["alternate_kind"]:
            expected_assets["alternate"] = f"{bundle_name}.{target['alternate_kind']}"

        missing = [name for name in expected_assets.values() if name not in assets_by_name]
        if missing:
            missing_text = ", ".join(sorted(missing))
            raise SystemExit(
                f"Release {release_tag} is missing expected assets for {target['key']}: {missing_text}"
            )

        rendered_target = {
            **target,
            "bundle_name": bundle_name,
            "preferred_asset": assets_by_name[expected_assets["preferred"]],
            "alternate_asset": assets_by_name[expected_assets["alternate"]]
            if "alternate" in expected_assets
            else None,
            "checksum_asset": assets_by_name[expected_assets["checksum"]],
        }
        rendered_targets.append(rendered_target)
        targets_by_key[target["key"]] = rendered_target

    quick_examples = {
        name: targets_by_key[key] for name, key in QUICK_EXAMPLE_KEYS.items()
    }

    return {
        "repo": repo,
        "release": {
            "tag": release_tag,
            "version": release_version,
            "url": release_url,
            "published_at": published_at,
            "published_date": published_date,
            "releases_url": releases_url,
            "download_base_url": download_base_url,
        },
        "targets": rendered_targets,
        "quick_examples": quick_examples,
    }


def create_environment() -> Environment:
    return Environment(
        loader=FileSystemLoader(str(TEMPLATES_DIR)),
        undefined=StrictUndefined,
        keep_trailing_newline=True,
    )


def render_readmes(context: dict[str, Any], output_root: Path) -> None:
    env = create_environment()
    for template_name, output_name in (
        ("README.md.j2", "README.md"),
        ("README_zh.md.j2", "README_zh.md"),
    ):
        template = env.get_template(template_name)
        rendered = template.render(**context)
        output_path = output_root / output_name
        output_path.write_text(rendered, encoding="utf-8")


def main() -> None:
    args = parse_args()
    release_json = load_release_metadata(Path(args.release_json))
    context = build_context(release_json, args.repo)
    render_readmes(context, Path(args.output_root))


if __name__ == "__main__":
    main()
