/**
 * Company Chat UI settings (edit only this file).
 *
 * How to use:
 * - Change values in this file, save, hard-refresh the page (Ctrl+F5) so the
 *   browser reloads this script (cache-bust ?v= on the script tag in HTML helps).
 * - `company.js` reads `window.COMPANY_CHAT_UI_CONFIG` once at startup.
 *
 * This file must load *before* `company.js` (see `company.html` script order).
 */

window.COMPANY_CHAT_UI_CONFIG = {
  // =========================
  // COMMON (same for all)
  // =========================
  common: {
    // Project + Agent settings (Dialogflow CX).
    dialogflow: {
      projectId: "qabot01",
      location: "us-central1",
      agentId: "05ce7add-9025-4534-990c-fd7a25dadde1"
    },

    // Header text + images.
    header: {
      title: "Chat Support",
      subtitle: "🟢 We are online to assist you",
      chatIconUrl: "https://storage.googleapis.com/companybucket/Images/cat.png",
      chatTitleIconUrl: "https://storage.googleapis.com/companybucket/Images/cat.png",
      botWritingText: "🤖 Typing...",
      // `false` to leave Dialogflow’s default (arrow/locale) title dismiss; default true = always ×, all languages.
      forceCloseIconX: true,
      // Optional public URL (https://…) for the **collapse** (title) icon. If unset, a built-in X SVG (data URL) is used.
      // chatCollapseIconUrl: "https://example.com/chat-collapse-x.svg",
    },

    // Bot line above each agent reply: small image OR emoji + time (IST-style clock via timeZone).
    // `mode: "image"` hides the thread-side bot avatar (no duplicate of the persona image). `threadAvatarSizePx` applies when `mode` is `emojiTime`.
    botPersona: {
      mode: "image",
      threadAvatarSizePx: 28,
      emojiTime: {
        label: "🤖",
        showTime: true,
        timeZone: "Asia/Kolkata"
      },
      image: {
        url: "https://storage.googleapis.com/companybucket/Images/cat.png",
        widthPx: 32,
        heightPx: 32,
        showTime: true,
        timeZone: "Asia/Kolkata"
      }
    },

    // Features ON / OFF — each block should include `enabled: true` or `false`.
    features: {
      // --- Languages (simple mental model) ---
      // - ON  → user can switch language in the chat (picker / buttons next to Send).
      // - OFF → no picker; the agent uses `defaultLanguage` only.
      // - `code` = language code for Dialogflow (`language-code` on df-messenger); `label` = text in the menu.
      // - Changing language = same conversation language + UI labels we translate (not a new “command”).
      multiLanguage: {
        enabled: true,
        defaultLanguage: "en"
        // Composer hint (`placeholder-text`). Keys = same `code` values as below. Optional: add `inputPlaceholder` on each language row to override only that row.
        // inputPlaceholderByLanguage: {
        //   en: "Ask something in English…",
        //   hi: "कुछ पूछें…",
        //   mr: "इथे टाइप करा…"
        // },
        // enabledLanguages: [
        //   { code: "en", label: "English" },
        //   { code: "hi", label: "Hindi" },
        //   { code: "mr", label: "Marathi" }
        // ]
      },

      // Restart button in footer.
      restartChat: {
        enabled: true,
        label: "Restart"
      }
    },

    // Language + Restart pill (next to Send). All values are pixels. Tune after you set `chatLayout.side`
    // (right-docked chat usually keeps Send on the right; nudges only move the pill, not the bubble).
    footerActionBar: {
      nudgeRightPx: 150,
      nudgeUpPx: -10,
      nudgeDownPx: 2,
      nudgeLeftPx: 150,
      gapBeforeSendPx: 8,
      // When the composer row is taller than this (multiline), keep Language/Restart at the same `top` as single-line.
      lockVerticalWhenComposerRowTallerThanPx: 72
    },

    // -------------------------------------------------------------------------
    // Footer message row (Dialogflow `.input-box-wrapper` inside `df-messenger-user-input`).
    // - Sets CSS variables on `df-messenger` (they inherit into shadow DOM).
    // - `alignItems` / `overflowY` are injected with !important (Google hardcodes align-items: flex-end).
    // - Applied after `dfMessengerTheme`, so values here win for the same variables.
    // -------------------------------------------------------------------------
    footerInputBox: {
      // Full `--df-messenger-input-padding` shorthand: top right bottom left (inset of composer vs chat card).
      padding: "19px 0 50px 20px",
      // Or omit `padding` and set all four:
      // paddingTopPx: 19,
      // paddingRightPx: 0,
      // paddingBottomPx: 50,
      // paddingLeftPx: 20,

      scrollbarGutter: "stable",
      inputMaxWidth: null,
      chatMaxWidth: null,

      // Optional (requires shadow inject): flex-end | flex-start | center | stretch | baseline | start | end
      // alignItems: "center",
      // overflowY: "auto"
    },

    // -------------------------------------------------------------------------
    // "Powered by …" (fixed line above the type-your-message area when chat is open)
    // - Shown text: prefix + value  (e.g. "Powered by " + "demo" → "Powered by demo")
    // - Position: use nudgeUpPx / nudgeDownPx / nudgeLeftPx / nudgeRightPx (px) to move
    //   the strip in that direction. Then add offsetTopPx / offsetLeftPx for extra fine tune.
    //   Formula: finalTop += offsetTopPx + nudgeDownPx - nudgeUpPx
    //            finalLeft += offsetLeftPx + nudgeRightPx - nudgeLeftPx
    // - Look: color (CSS color), fontSizePx, textAlign, lineHeightPx
    // - widthOffsetPx: add/subtract from strip width. gap* keys tune spacing from composer/window.
    // - linkUrl: optional. If set (e.g. "https://www.google.com"), the strip is a link; click opens a new tab.
    // -------------------------------------------------------------------------
    poweredBy: {
      enabled: true,
      prefix: "⚡by ",
      value: "demo",
      linkUrl: "https://www.google.com",

      color: "#0f766e",
      fontSizePx: 12,
      textAlign: "center",
      lineHeightPx: 18,

      nudgeUpPx: 10,
      nudgeDownPx: 15,
      nudgeLeftPx: 0,
      nudgeRightPx: 110,

      offsetTopPx: 0,
      offsetLeftPx: 0,
      widthOffsetPx: 0,

      gapAboveComposerPx: 2,
      fallbackGapFromWindowBottomPx: 10
    },

    // Page colors.
    theme: {
      "--company-bg-1": "#e8f3f4",
      "--company-bg-2": "#f7fbff",
      "--company-brand-900": "#0f172a",
      "--company-brand-700": "#0f766e",
      "--company-brand-500": "#14b8a6",
      "--company-accent-200": "#d7f2ef",
      "--company-surface": "#ffffff",
      "--company-text": "#0f172a",
      "--company-text-soft": "#475569",
      "--company-border": "#dbe5ec"
    },

    // Where the chat bubble + “Hi” strip sit: "right" | "left" (one switch for both).
    // Use matching edges everywhere below:
    // - "right" → `rightPx` + `bottomPx` (set `leftPx: null` on desktop/mobile bubble + both launcherStrips)
    // - "left"  → `leftPx` + `bottomPx` (set `rightPx: null`)
    chatLayout: {
      side: "right"
    },

    // Message list (conversation) scrollbar inside the open chat card.
    // - `showScrollbar: true` (default) — Dialogflow’s default overflow is `hidden scroll` (y=scroll = always on).
    // - `showScrollbar: false` — company.js sets `--df-messenger-chat-overflow: hidden auto` on df-messenger + bubble
    //   (see Google’s CSS) and hides the track; wheel/touch scrolling still works.
    chatMessageList: {
      showScrollbar: false
    },

    // -------------------------------------------------------------------------
    // FLOATING CHAT BUTTON (when the chat window is closed)
    // -------------------------------------------------------------------------
    // This is the small button that stays on the screen so visitors can open chat again.
    // You do not need to know CSS — change the plain options below.
    //
    // - keepRoundShape: true  → the site keeps the button as a circle (recommended).
    //   false → only “corner roundness” is used (softer, more like a rounded square).
    //
    // - cornerRoundness: how round the button outline is. Examples:
    //   "50%"  = full circle (best with keepRoundShape: true),
    //   "32px" = gently rounded corners (try with keepRoundShape: false).
    //
    // - clipPictureToCircle: true  → the photo/icon inside is cropped to match the round button.
    //   false → picture keeps a square look inside the button.
    //
    // - hideOverflow: true  → cleans up the edges so color does not spill outside the round shape.
    //
    // - buttonSizePx: diameter of the button in pixels (same width and height). Example: 64
    //   Leave null to use the default size from the chat widget.
    //
    // - iconSizePx: size of the picture inside the button. Leave null and we size it from buttonSizePx.
    //   Or set both yourself, e.g. button 72 and icon 60.
    // -------------------------------------------------------------------------
    chatBubbleLauncher: {
      keepRoundShape: true,
      cornerRoundness: "50%",
      clipPictureToCircle: true,
      hideOverflow: true,
      buttonSizePx: null,
      iconSizePx: null
    },

    // Chat colors + other widget styling (technical names — ask a developer if unsure).
    // Tip: the floating button’s roundness is controlled above in `chatBubbleLauncher` (easier for edits).
    dfMessengerTheme: {
      "--df-messenger-input-inner-padding": "0 46px 0 12px",
      "--df-messenger-input-box-padding": "17px 0 5px 18px",
      "--df-messenger-input-box-focus-padding": "17px 0 5px 18px",
      "--df-messenger-input-border-top": "1px solid rgba(20, 184, 166, 0.28)",
      "--df-messenger-input-font-size": "16px",
      "--df-messenger-input-font-weight": "600",
      "--df-messenger-primary-color": "#0d9488",
      "--df-messenger-chat-background": "linear-gradient(180deg, #f6fdfc 0%, #eff7f4 50%, #e8f1ee 100%)",
      "--df-messenger-message-bot-background": "rgba(255, 255, 255, 0.98)",
      "--df-messenger-message-bot-font-color": "#0f172a",
      "--df-messenger-message-user-background": "linear-gradient(140deg, #0f766e, #14b8a6)",
      "--df-messenger-message-user-font-color": "#f0fdfa",
      "--df-messenger-titlebar-background": "linear-gradient(120deg, #0a5c56 0%, #0f766e 35%, #14b8a6 70%, #0d9488 100%)",
      "--df-messenger-titlebar-font-color": "#f0fdfa",
      "--df-messenger-titlebar-subtitle-font-color": "#a7f3d0",
      "--df-messenger-chips-background": "rgba(204, 251, 241, 0.85)",
      "--df-messenger-chips-font-color": "#0f172a",
      "--df-messenger-button-border": "1px solid rgba(20, 184, 166, 0.42)",
      "--df-messenger-chat-border": "1px solid rgba(20, 184, 166, 0.4)",
      "--df-messenger-chat-box-shadow": "0 0 0 1px rgba(20, 184, 166, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05), 0 16px 32px -8px rgba(15, 23, 42, 0.1), 0 28px 64px -12px rgba(15, 23, 42, 0.16), 0 0 80px -16px rgba(20, 184, 166, 0.18)",
      "--df-messenger-chat-border-radius": "20px",
      "--df-messenger-chat-bubble-background": "linear-gradient(150deg, #0a5c56 0%, #0f766e 45%, #14b8a6 100%)",
      // Usually match `common.chatBubbleLauncher.cornerRoundness` (the launcher block wins when the page runs).
      "--df-messenger-chat-bubble-border-radius": "50%",
      "--df-messenger-chat-scroll-button-enabled-display": "none",
      "--df-messenger-chat-scroll-button-text-display": "none",
      "--df-messenger-chat-messagelist-scroll-shadow-background": "none"
    }
  },

  // =========================
  // DESKTOP
  // =========================
  desktop: {
    chatWindow: {
      widthPx: 420,
      heightPx: 620,

      // right + bottom (matches `common.chatLayout.side: "right"`).
      bubblePosition: { rightPx: 20, bottomPx: 20, leftPx: null, topPx: null },

      // This is the correct knob for the bubble–chat gap: Dialogflow v1 uses it in the chat-bubble
      // shadow (not window height). Set on both the outer host and the bubble; use config here or
      // `df-messenger, df-messenger-chat-bubble { --df-messenger-chat-window-offset: 8px; }` in CSS.
      // Default when omitted: 16. Example: 8
      // chatWindowOffsetPx: 8,

      // Add to the panel height so the window extends toward the bubble. Optional; separate from chatWindowOffsetPx.
      extraHeightTowardBubblePx: 0
    },

    autoOpenChat: {
      enabled: true,
      delayMs: 5000
    },

    launcherStrip: {
      // “Hi” strip: same edge as the bubble ( here = bottom-right )
      enabled: true,
      text: "👋Hey, how are you?😊",
      // Word-by-word reveal; full line finishes in this many ms (0 = show full text at once).
      typingDurationMs: 1500,
      position: { rightPx: 20, bottomPx: 96, leftPx: null, topPx: null },
      style: { fontSizePx: 13, paddingYpx: 10, paddingXpx: 14, maxWidthPx: 260 }
    }
  },

  // =========================
  // MOBILE
  // =========================
  mobile: {
    enabled: true,

    chatWindow: {
      horizontalInsetPx: 12,
      topInsetPx: 14,
      bottomInsetPx: 10,
      minWidthPx: 280,
      minHeightPx: 340,

      bubblePosition: { rightPx: 12, bottomPx: 10, leftPx: null, topPx: null },

      // Optional: set only the bubble–window gap: `chatWindowOffsetPx: 10` (see desktop).

      // Add to the panel height; optional, separate from `chatWindowOffsetPx`.
      extraHeightTowardBubblePx: 0
    },

    autoOpenChat: {
      enabled: true,
      delayMs: 5000
    },

    launcherStrip: {
      // Same edge as the bubble (bottom-right on mobile)
      enabled: true,
      text: "Hello, how are you?",
      typingDurationMs: 2000,
      position: { rightPx: 12, bottomPx: 86, leftPx: null, topPx: null },
      style: { fontSizePx: 13, paddingYpx: 10, paddingXpx: 14, maxWidthPx: null }
    }
  },

  // (Colors moved to COMMON section above)
};

