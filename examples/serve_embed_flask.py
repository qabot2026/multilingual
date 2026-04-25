"""
Minimal Flask app to serve the chat embed files over HTTP (for tests or a small host).

1. Build the bundle (Python, no Node):
       python scripts/build_widget_bundle.py

2. Install Flask once:
       pip install flask

3. From the project root folder run:
       python examples/serve_embed_flask.py

4. Open:
       http://127.0.0.1:5000/test-embed
   (Direct CSS + gstatic + bundle — mirrors a normal page.) For the one-liner:
       http://127.0.0.1:5000/test-embed-loader

For production, use a real WSGI server (gunicorn, waitress) behind HTTPS, not this dev server.
"""
from pathlib import Path

from flask import Flask, send_from_directory, Response

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
EMBED = ROOT / "embed"

app = Flask(__name__)


@app.route("/embed/<path:filename>")
def serve_embed(filename: str):
    """Serves company-loader.js from embed/; bundle + css from dist/."""
    if filename in ("company-widget.bundle.js", "company.css"):
        if not DIST.exists():
            return (
                "Run first: python scripts/build_widget_bundle.py",
                503,
                {"Content-Type": "text/plain; charset=utf-8"},
            )
        return send_from_directory(DIST, filename)
    return send_from_directory(EMBED, filename)


DF_MESSENGER_CSS = (
    "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
)
DF_MESSENGER_JS = (
    "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
)


@app.route("/test-embed")
def test_page() -> Response:
    """Same script order as a normal page: gstatic → company.css → df-messenger.js → bundle (no loader)."""
    html = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Embed test (direct scripts)</title>
  <link rel="stylesheet" href="{DF_MESSENGER_CSS}">
  <link rel="stylesheet" href="/embed/company.css">
</head>
<body>
  <h1>Flask embed test (direct)</h1>
  <p>Chat should appear like <code>myweb.html</code> with static/bundle paths replaced by
     <code>/embed/company.css</code> and <code>/embed/company-widget.bundle.js</code>.</p>
  <p>One-liner loader: <a href="/test-embed-loader">/test-embed-loader</a></p>
  <script src="{DF_MESSENGER_JS}"></script>
  <script src="/embed/company-widget.bundle.js"></script>
</body></html>"""
    return Response(html, mimetype="text/html; charset=utf-8")


@app.route("/test-embed-loader")
def test_page_loader() -> Response:
    """Client-style single script tag; uses <code>data-base</code> (adjust host if needed)."""
    html = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Embed test (loader)</title></head>
<body>
  <h1>Flask embed test (company-loader.js)</h1>
  <p>Async loader: ensure Network shows 200 for gstatic + bundle + company.css.</p>
  <p>Direct scripts (no loader): <a href="/test-embed">/test-embed</a></p>
  <script src="/embed/company-loader.js" async data-base="http://127.0.0.1:5000/embed/"></script>
</body></html>"""
    return Response(html, mimetype="text/html; charset=utf-8")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
