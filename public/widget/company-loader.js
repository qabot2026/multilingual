/**
 * Client embed: one <script> tag. Reads ?botid= from this file's URL, then loads Dialogflow + your CSS + config + app.
 * Host this file in the same folder as company.css, company.config.js, and company.js.
 *
 * Note: with async, document.currentScript is often null — we find this script in the page by src.
 */
(function companyWidgetLoader() {
  function resolveLoaderUrl() {
    const cs = document.currentScript;
    if (cs && cs.src) {
      return cs.src;
    }
    const list = document.getElementsByTagName("script");
    for (let i = list.length - 1; i >= 0; i -= 1) {
      const s = list[i];
      if (s.src && /company-loader\.js($|[?#])/i.test(s.src)) {
        return s.src;
      }
    }
    return "";
  }

  const src = resolveLoaderUrl();
  if (!src) {
    // eslint-disable-next-line no-console
    console.error("Company chat: could not find company-loader.js in the page (keep async; loader was fixed to scan for it — hard-refresh).");
    return;
  }

  const pageUrl = new URL(src);
  const base = new URL(".", pageUrl.href).href;
  const botid = pageUrl.searchParams.get("botid") || "0001";
  window.__DFCHAT_BOT_ID__ = String(botid);

  // Optional: backend base for /contact-form-submissions and /chat-client-context when the widget is embedded
  // on another site (otherwise the browser uses that site's origin, which usually has no API). Example:
  // company-loader.js?botid=0001&api=https://api.yourdomain.com
  const apiBase = pageUrl.searchParams.get("api");
  if (apiBase && String(apiBase).trim()) {
    window.COMPANY_API_BASE_URL = String(apiBase).trim().replace(/\/$/, "");
  }

  const GSTATIC = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/";

  function addCss(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    (document.head || document.documentElement).appendChild(link);
  }

  function addScript(scriptSrc, onload) {
    const s = document.createElement("script");
    s.src = scriptSrc;
    s.async = false;
    if (typeof onload === "function") {
      s.onload = onload;
    }
    const parent = document.body || document.head || document.documentElement;
    parent.appendChild(s);
  }

  function startChain() {
    addCss(GSTATIC + "themes/df-messenger-default.css");
    addCss(new URL("company.css", base).href);

    addScript(GSTATIC + "df-messenger.js", function onDfMessenger() {
      addScript(new URL("company.config.js", base).href, function onConfig() {
        addScript(new URL("company.js", base).href, null);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startChain, { once: true });
  } else {
    startChain();
  }
}());
