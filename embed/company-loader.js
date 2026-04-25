/**
 * One-tag integration: loads Dialogflow CSS, your company.css, df-messenger.js, then the widget bundle.
 *
 * Host these files on HTTPS (same folder as this script, or set data-base):
 *   - company-loader.js   (this file)
 *   - company-widget.bundle.js  (from: node scripts/build-widget-bundle.mjs)
 *   - company.css
 *
 * Client page (minimum):
 *   <script src="https://YOUR-CDN/embed/company-loader.js" async data-base="https://YOUR-CDN/embed/"></script>
 *
 * Optional: <meta name="dfchat-api-base-url" content="https://client-api.example.com/">
 */
(function () {
    /**
     * `document.currentScript` is null for `async`/`defer` external scripts in most browsers,
     * so the loader would silently do nothing. Fall back to finding this file by URL.
     */
    function resolveLoaderScript() {
        if (document.currentScript) {
            return document.currentScript;
        }
        var nodes = document.getElementsByTagName("script");
        for (var i = nodes.length - 1; i >= 0; i--) {
            var el = nodes[i];
            var src = el.src || "";
            if (src.indexOf("company-loader.js") !== -1) {
                return el;
            }
        }
        return null;
    }
    var cur = resolveLoaderScript();
    if (!cur) {
        return;
    }
    var base = (cur.getAttribute("data-base") || "").trim();
    if (!base) {
        try {
            base = new URL(".", cur.src).href;
        } catch (e) {
            return;
        }
    }
    if (base.slice(-1) !== "/") {
        base += "/";
    }

    var DF_CSS = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
    var DF_JS = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
    var OUR_CSS = base + "company.css";
    var BUNDLE = base + "company-widget.bundle.js";

    function linkCss(href) {
        var l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;
        (document.head || document.documentElement).appendChild(l);
    }

    function loadScript(src, onload, asyncFlag) {
        var s = document.createElement("script");
        s.src = src;
        /* false = classic blocking order so `df-messenger` registers before the bundle runs. */
        s.async = asyncFlag !== false;
        s.onerror = function () {
            console.error("[company-loader] failed to load:", src);
        };
        if (onload) {
            s.onload = onload;
        }
        (document.body || document.head || document.documentElement).appendChild(s);
    }

    linkCss(DF_CSS);
    linkCss(OUR_CSS);
    /* Both scripts non-async: guarantee registration order vs. the widget bundle. */
    loadScript(DF_JS, function () {
        loadScript(BUNDLE, null, false);
    }, false);
})();
