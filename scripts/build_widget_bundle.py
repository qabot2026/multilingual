"""
Build dist/company-widget.bundle.js from static/company.config.js + static/company.js.
No Node.js required — run with Python 3:

    python scripts/build_widget_bundle.py

Also copies static/company.css to dist/company.css.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
CONFIG = ROOT / "static" / "company.config.js"
COMPANY = ROOT / "static" / "company.js"
CSS_SRC = ROOT / "static" / "company.css"
OUT_JS = DIST / "company-widget.bundle.js"
OUT_CSS = DIST / "company.css"


def main() -> None:
    DIST.mkdir(parents=True, exist_ok=True)
    bundle = CONFIG.read_text(encoding="utf-8") + "\n" + COMPANY.read_text(encoding="utf-8")
    banner = "/* Built by scripts/build_widget_bundle.py — do not edit by hand */\n"
    OUT_JS.write_text(banner + bundle, encoding="utf-8")
    OUT_CSS.write_bytes(CSS_SRC.read_bytes())
    print("Wrote:", OUT_JS)
    print("Copied:", OUT_CSS)
    print("Upload dist/ + embed/company-loader.js to your HTTPS host, or run Flask (see examples/serve_embed_flask.py).")


if __name__ == "__main__":
    main()
