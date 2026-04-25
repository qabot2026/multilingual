#!/usr/bin/env python3
"""
Rebuild dist/ from static/ (single JS bundle for embeds that load one script).

  python scripts/build_widget_bundle.py

Output:
  dist/company-widget.bundle.js  — company.config.js + company.js (same order as myweb.html)
  dist/company.css                — copy of static/company.css (load as a second request)

If your site uses the bundle, run this after every change to static/* before deploy.
"""
from __future__ import annotations

import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"
DIST = ROOT / "dist"
CFG = STATIC / "company.config.js"
MAIN = STATIC / "company.js"
CSS = STATIC / "company.css"

ERR = 1


def main() -> int:
    for p in (CFG, MAIN, CSS):
        if not p.is_file():
            print(f"Missing required file: {p}", file=sys.stderr)
            return ERR
    DIST.mkdir(parents=True, exist_ok=True)
    config = CFG.read_text(encoding="utf-8")
    main_js = MAIN.read_text(encoding="utf-8")
    header = "/* Built by scripts/build_widget_bundle.py — do not edit by hand */\n"
    (DIST / "company-widget.bundle.js").write_text(
        f"{header}{config}\n\n{main_js}",
        encoding="utf-8",
    )
    (DIST / "company.css").write_bytes(CSS.read_bytes())
    out_js = DIST / "company-widget.bundle.js"
    out_css = DIST / "company.css"
    print(f"OK: {out_js} ({out_js.stat().st_size} bytes)")
    print(f"OK: {out_css} ({out_css.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
