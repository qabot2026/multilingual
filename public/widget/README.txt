WIDGET FOLDER (simple guide)
============================

What this folder is for
  You put the LOADER + your 3 chat files on your website. The client only adds ONE line of HTML to their page.

Do you need to put this on your website?
  YES — the client's browser must load the files from a real web address (https://). Your computer (localhost) is only for testing.

What to upload
  1) company-loader.js   (this folder — do not rename unless you change the <script> you give to clients)
  2) company.css         (copy from your project: static/company.css)
  3) company.config.js   (copy from: static/company.config.js)
  4) company.js          (copy from: static/company.js)

  Put all 4 in the SAME folder on your server, e.g.:
    https://YOURDOMAIN.com/widget/company-loader.js
    https://YOURDOMAIN.com/widget/company.css
    https://YOURDOMAIN.com/widget/company.config.js
    https://YOURDOMAIN.com/widget/company.js

The one line you give to the client (use YOUR real GitHub Pages URL, not the text YOURDOMAIN)
--------------------------------------------------------------------------------------------
<script src="https://YOUR-USER.github.io/YOUR-REPO/widget/company-loader.js?botid=0001" async></script>

  botid=0001 picks the bot from window.DFCHAT_BOT_MAP in company.config.js (edit the map to add more bots).

If the chat does not show:
  - Replace YOUR-USER and YOUR-REPO with your real names; open that loader URL in a new tab (must show JS, not 404).
  - Put company.css, company.config.js, company.js in the SAME folder as company-loader.js on the site.
  - After updating company-loader.js, push again and do a hard refresh (Ctrl+F5). The loader was fixed to work with async=.

FRESH (auto welcome) not working on live / embed
  - FRESH only runs after the CHAT PANEL is OPEN. With autoOpenChat in company.config (delayMs), the panel opens
    automatically; if it is off, the user must open the chat first.
  - The Dialogflow agent must be built to handle the "FRESH" event / flow with that name (see company.js).
  - In Google / Dialogflow, check widget / domain allowlist if the connection fails on some sites.

Forms not opening or submit 404 on another website
  - A form PANEL is opened when the AGENT returns payload: { "action": "open_form" } (optional "form_id").
    Build that in your agent; the config alone does not show the form without the bot.
  - Submit posts to: page origin + /contact-form-submissions. On a static client site (or github.io) that path often
    does not exist. Add your API base in the script URL: ...&api=https://api.yourdomain.com
  - Your server must support CORS for the embedding sites.

After you change static CSS/JS
  Copy the updated files from static/ into this folder on the server again (or use your own deploy process).

Name of folder
  "public/widget" in the project is just a name on your computer. On the server you can use /widget/ or /chat/ or any name — the URL in the <script> must match.
