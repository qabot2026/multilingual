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
      // chatCollapseIconUrl: "https://example.com/chat-collapse-x.svg"
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
    // nudgeUpPx is subtracted from the computed `top` — LARGER values move the bar UP. Use a small value (0–20)
    // to keep the pill on the real footer / composer row. nudgeDownPx ADDS; use it to nudge slightly downward.
    // Keep nudges near 0 unless you are fine-tuning a specific layout. Large values (especially negative
    // `nudgeRightPx`) easily push Language/Restart over the typing area or off the composer row.
   
   
    // footerActionBar: {
    //   // when type strip is enabled
    //   nudgeRightPx: 0,
    //   nudgeUpPx: -8,
    //   nudgeDownPx: 0,
    //   // nudgeLeftPx: 100,
    //   gapBeforeSendPx: 8,
    //   lockVerticalWhenComposerRowTallerThanPx: 0
    // },

    // footerActionBar: {
    //   // when type strip is disabled
    //   nudgeRightPx: -180,
    //   nudgeUpPx: -8,
    //   nudgeDownPx: 40,
    //   // nudgeLeftPx: 100,
    //   gapBeforeSendPx: 8,
    //   lockVerticalWhenComposerRowTallerThanPx: 0
    // },

    footerActionBar: {
      // when type strip is disabled
      nudgeRightPx: -180,
      nudgeUpPx: -8,
      nudgeDownPx: 40,
      // nudgeLeftPx: 100,
      gapBeforeSendPx: 8,
      lockVerticalWhenComposerRowTallerThanPx: 0
    },


    // -------------------------------------------------------------------------
    // Footer message row (Dialogflow `.input-box-wrapper` inside `df-messenger-user-input`).
    // - Sets CSS variables on `df-messenger` (they inherit into shadow DOM).
    // - `alignItems` / `overflowY` are injected with !important (Google hardcodes align-items: flex-end).
    // - Applied after `dfMessengerTheme`, so values here win for the same variables.
    // -------------------------------------------------------------------------
    footerInputBox: {
      // Composer inset vs chat card (top right bottom left). Omit `sendButtonWrapperPx` to use Dialogflow’s default Send.
      padding: "8px 10px 36px 10px",
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
    // - marginPx: optional uniform CSS margin (px) on the fixed strip; 0 = none.
    // -------------------------------------------------------------------------
    poweredBy: {
      enabled: true,
      prefix: "⚡by ",
      value: "demo",
      linkUrl: "https://www.google.com",

      color: "#0369a1",
      fontSizePx: 11,
      textAlign: "center",
      lineHeightPx: 16,

      // when type strip is enabled
      // nudgeUpPx: 65,
      // nudgeDownPx: -40,
      // nudgeLeftPx: 20,
      // nudgeRightPx: 150,

        // when type strip is disabled
        nudgeUpPx: -15,
        nudgeDownPx: -40,
        nudgeLeftPx: 0,
        nudgeRightPx: -100,



      offsetTopPx: 80,
      offsetLeftPx: 0,
      widthOffsetPx: 0,
      marginPx: 20,

      gapAboveComposerPx: 1,
      fallbackGapFromWindowBottomPx: 6
    },

    // Page colors.
    theme: {
      "--dfchat-bg-1": "#e8f4fc",
      "--dfchat-bg-2": "#f7fbff",
      "--dfchat-brand-900": "#0f172a",
      "--dfchat-brand-700": "#0369a1",
      "--dfchat-brand-500": "#0ea5e9",
      "--dfchat-accent-200": "#e0f2fe",
      "--dfchat-surface": "#ffffff",
      "--dfchat-text": "#0f172a",
      "--dfchat-text-soft": "#475569",
      "--dfchat-border": "#dbe5ec"
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
    // Contact form (production: all form titles/placeholders live here when possible)
    // -------------------------------------------------------------------------
    // • `forms`: any number of keys. `defaultFormId`, Dialogflow `open_form` + `form_id`.
    // • `titleByLanguage` / `subtitleByLanguage` / per-field `placeholderByLanguage` { en, hi, mr }.
    // • Or `i18nPlaceholder` for shared strings (namePlaceholder, …) in company.js UI_TRANSLATIONS only.
    // -------------------------------------------------------------------------
    contactForm: {
      dockToChatWindow: true,
      dockAboveFooter: true,
      gapAboveFooterPx: 8,
      titleInsetPx: 48,
      dockNudgeDownPx: 20,
      sideInsetPx: 10,
      maxCardHeightPx: 300,
      showSubtitle: true,
      // Form to use when Dialogflow sends only `{ "action": "open_form" }` (no `form_id`), and on first load.
      defaultFormId: "contact",
      // Shared defaults when a form does not set its own (this form uses per-form chatSummaryFieldNames)
      chatSummaryFieldNames: ["name", "mobile", "email"],
      forms: {
        // Contact: name, mobile, email (no message field)
        contact: {
          titleByLanguage: {
            en: "Contact us",
            hi: "हमसे संपर्क करें",
            mr: "आमच्याशी संपर्क करा"
          },
          subtitleByLanguage: {
            en: "Share your contact details.",
            hi: "अपनी जानकारी साझा करें।",
            mr: "तुमची माहिती शेअर करा."
          },
          showSubtitle: true,
          maxCardHeightPx: 300,
          chatSummaryFieldNames: ["name", "mobile", "email"],
          fields: [
            { id: "c-name", name: "name", type: "text", required: true, icon: "user", i18nPlaceholder: "namePlaceholder", i18nSummaryLabel: "summaryNameLabel", autocomplete: "name" },
            { id: "c-mobile", name: "mobile", type: "tel", required: true, icon: "phone", i18nPlaceholder: "mobilePlaceholder", i18nSummaryLabel: "summaryMobileLabel", autocomplete: "tel", inputMode: "tel" },
            { id: "c-email", name: "email", type: "email", required: true, icon: "email", validateAs: "email", i18nPlaceholder: "emailPlaceholder", i18nSummaryLabel: "summaryEmailLabel", autocomplete: "email" }
          ]
        },
        // Appointment: date and time (open from Dialogflow with `form_id`: `"appointment"`)
        appointment: {
          titleByLanguage: {
            en: "Appointment",
            hi: "अपॉइंटमेंट",
            mr: "अपॉइंटमेंट"
          },
          subtitleByLanguage: {
            en: "Choose a date and time.",
            hi: "तारीख और समय चुनें।",
            mr: "तारीख आणि वेळ निवडा."
          },
          showSubtitle: true,
          maxCardHeightPx: 260,
          chatSummaryFieldNames: ["appointmentdate", "appointmenttime"],
          fields: [
            {
              id: "a-date",
              name: "appointmentdate",
              type: "date",
              required: true,
              icon: "calendar",
              i18nSummaryLabel: "summaryDateLabel",
              placeholderByLanguage: { en: "Date", hi: "तिथि", mr: "तारीख" }
            },
            {
              id: "a-time",
              name: "appointmenttime",
              type: "time",
              required: true,
              icon: "clock",
              i18nSummaryLabel: "summaryTimeLabel",
              placeholderByLanguage: { en: "Time", hi: "समय", mr: "वेळ" }
            }
          ]
        },
        // OTP: first screen = OTP only + “change mobile”; second = mobile only + submit (`form_id`: `"otp"`).
        otp: {
          titleByLanguage: {
            en: "Verify OTP",
            hi: "OTP सत्यापित करें",
            mr: "OTP सत्यापित करा"
          },
          subtitleByLanguage: {
            en: "Enter the code we sent.",
            hi: "भेजा गया कोड दर्ज करें।",
            mr: "पाठवलेला कोड टाका."
          },
          // Shown on the “change mobile” step (optional i18n fallback in company.js).
          subtitleMobileByLanguage: {
            en: "Enter the correct mobile number and submit. We will send a new code.",
            hi: "सही मोबाइल नंबर दर्ज करें और जमा करें।",
            mr: "योग्य मोबाईल क्रमांक टाका आणि सबमिट करा. नवा कोड पाठवू."
          },
          showSubtitle: true,
          maxCardHeightPx: 240,
          chatSummaryFieldNames: ["mobile", "otp"],
          // OTP field first, then mobile (UI groups into two steps in company.js).
          fields: [
            {
              id: "o-otp",
              name: "otp",
              type: "text",
              required: true,
              icon: "key",
              maxLength: 8,
              minLength: 4,
              inputMode: "numeric",
              pattern: "^[0-9]{4,8}$",
              i18nPlaceholder: "otpCodePlaceholder",
              i18nSummaryLabel: "summaryOtpLabel",
              i18nInvalidMessage: "invalidOtp",
              autocomplete: "one-time-code"
            },
            {
              id: "o-mobile",
              name: "mobile",
              type: "tel",
              required: false,
              icon: "phone",
              validateAs: "phone",
              i18nPlaceholder: "mobilePlaceholder",
              i18nSummaryLabel: "summaryMobileLabel",
              autocomplete: "tel",
              inputMode: "tel",
              placeholderByLanguage: {
                en: "Mobile number",
                hi: "मोबाइल नंबर",
                mr: "मोबाईल नंबर"
              }
            }
          ]
        },
        // Upload document — `form_id`: `"uploadDocument"`. `multiple: true` = several files; omit or `false` = one file.
        uploadDocument: {
          titleByLanguage: {
            en: "Upload document",
            hi: "दस्तावेज़ अपलोड करें",
            mr: "दस्तऐवज अपलोड करा"
          },
          subtitleByLanguage: {
            en: "You can select one or more files.",
            hi: "एक या अधिक फ़ाइल चुन सकते हैं।",
            mr: "एक किंवा अनेक फाइल निवडा."
          },
          showSubtitle: true,
          maxCardHeightPx: 280,
          chatSummaryFieldNames: ["document"],
          fields: [
            {
              id: "u-document",
              name: "document",
              type: "file",
              required: true,
              multiple: true,
              icon: "file",
              i18nSummaryLabel: "summaryDocumentLabel",
              accept: "image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.odt,.ods,.odp,.zip,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/csv,application/zip,application/x-zip-compressed",
              placeholderByLanguage: {
                en: "Choose one or more files…",
                hi: "एक या अधिक फ़ाइलें चुनें…",
                mr: "एक किंवा अनेक फाइल निवडा…"
              }
            }
          ]
        }
      }
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
    //
    // - storyRing: optional Instagram-style rainbow ring around the bubble (conic gradient “border”).
    //   `enabled: false` turns it off. `widthPx` = ring thickness (e.g. 2–4).
    //   `rotateSeconds` = how long the ring spins (0 = no spin). `revolutions` = full 360° turns in that time.
    // -------------------------------------------------------------------------
    chatBubbleLauncher: {
      keepRoundShape: true,
      cornerRoundness: "50%",
      clipPictureToCircle: true,
      hideOverflow: true,
      buttonSizePx: null,
      iconSizePx: null,
      // Unread count on the closed launcher when the agent replies while the chat panel is closed.
      unreadBadge: {
        enabled: true,
        maxDisplay: 99,
        background: "#e11d48",
        color: "#ffffff",
        fontSizePx: 12,
        minSizePx: 20
      },
      storyRing: {
        enabled: true,
        widthPx: 3,
        rotateSeconds: 5,
        revolutions: 4
      }
    },

    // Chat colors + other widget styling (technical names — ask a developer if unsure).
    // Tip: the floating button’s roundness is controlled above in `chatBubbleLauncher` (easier for edits).
    dfMessengerTheme: {
      "--df-messenger-input-inner-padding": "0 46px 8px 10px",
      "--df-messenger-input-box-padding": "8px 16px 8px 16px",
      "--df-messenger-input-box-focus-padding": "8px 16px 8px 16px",
      "--df-messenger-input-border-top": "1px solid rgba(14, 165, 233, 0.28)",
      "--df-messenger-input-font-size": "16px",
      "--df-messenger-input-font-weight": "600",
      "--df-messenger-primary-color": "#0284c7",
      "--df-messenger-chat-background": "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 42%, #f8fafc 100%)",
      "--df-messenger-message-bot-background": "linear-gradient(165deg, #e0f2fe 0%, #bae6fd 45%, #7dd3fc 100%)",
      "--df-messenger-message-bot-font-color": "#0c4a6e",
      "--df-messenger-message-user-background": "linear-gradient(140deg, #0369a1, #0ea5e9)",
      "--df-messenger-message-user-font-color": "#f0f9ff",
      "--df-messenger-titlebar-background": "linear-gradient(120deg, #0369a1 0%, #0284c7 35%, #0ea5e9 70%, #38bdf8 100%)",
      "--df-messenger-titlebar-font-color": "#f0f9ff",
      "--df-messenger-titlebar-subtitle-font-color": "#bae6fd",
      "--df-messenger-chips-background": "rgba(186, 230, 253, 0.92)",
      "--df-messenger-chips-font-color": "#0c4a6e",
      "--df-messenger-button-border": "1px solid rgba(14, 165, 233, 0.45)",
      "--df-messenger-chat-border": "1px solid rgba(14, 165, 233, 0.38)",
      "--df-messenger-chat-box-shadow": "0 0 0 1px rgba(14, 165, 233, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.05), 0 16px 32px -8px rgba(15, 23, 42, 0.1), 0 28px 64px -12px rgba(15, 23, 42, 0.16), 0 0 80px -16px rgba(14, 165, 233, 0.2)",
      "--df-messenger-chat-border-radius": "20px",
      "--df-messenger-chat-bubble-background": "linear-gradient(150deg, #0369a1 0%, #0284c7 45%, #0ea5e9 100%)",
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
      widthPx: 500,
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
      typingDurationMs: 1000,
      position: { rightPx: 20, bottomPx: 96, leftPx: null, topPx: null },
      style: { fontSizePx: 13, paddingYpx: 10, paddingXpx: 14, maxWidthPx: 260 }
    },

    // Quick message row: stacked above the bubble with `gapAboveBubblePx` (5px to bubble). Greeting strip sits above it.
    launcherInputStrip: {
      enabled: false,
      placeholder: "What is your query?",
      sendLabel: "Send",
      gapAboveBubblePx: 5,
      gapBelowGreetingPx: 8,
      position: { rightPx: 20, leftPx: null, topPx: null },
      fallbackBottomPx: 54,
      style: { fontSizePx: 14, maxWidthPx: 300 }
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
    },

    launcherInputStrip: {
      enabled: true,
      placeholder: "What is your query?",
      sendLabel: "Send",
      gapAboveBubblePx: 5,
      gapBelowGreetingPx: 8,
      position: { rightPx: 12, leftPx: null, topPx: null },
      fallbackBottomPx: 48,
      style: { fontSizePx: 14, maxWidthPx: 300 }
    }
  },

  // (Colors moved to COMMON section above)
};

