/**
 * Company Chat UI settings (edit only this file).
 *
 * How to use:
 * - Change values in this file.
 * - After you change it: commit + push to GitHub Pages.
 *
 * This file loads before `company.js`.
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
      forceCloseIconX: true
    },

    // Features ON / OFF.
    // Use `enabled: true/false` (recommended key for all toggles).
    features: {
      // Multi-language dropdown.
      multiLanguage: {
        enabled: true,
        defaultLanguage: "en",
        // Only these languages appear in dropdown.
        enabledLanguages: [
          { code: "en", label: "English" },
          { code: "hi", label: "Hindi" },
          { code: "mr", label: "Marathi" }
        ]
      },

      // Restart button in footer.
      restartChat: {
        enabled: true,
        label: "Restart"
      }
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

    // Chat colors.
    dfMessengerTheme: {
      "--df-messenger-primary-color": "#0f766e",
      "--df-messenger-chat-background": "#f4f8fa",
      "--df-messenger-message-bot-background": "#ffffff",
      "--df-messenger-message-bot-font-color": "#0f172a",
      "--df-messenger-message-user-background": "#0f766e",
      "--df-messenger-message-user-font-color": "#f8fffe",
      "--df-messenger-titlebar-background": "linear-gradient(90deg, #0f766e, #0d9488)",
      "--df-messenger-titlebar-font-color": "#f0fdfa"
    }
  },

  // =========================
  // DESKTOP
  // =========================
  desktop: {
    chatWindow: {
      widthPx: 420,
      heightPx: 620,

      // Bubble position (launcher button).
      bubblePosition: { rightPx: 20, bottomPx: 20, leftPx: null, topPx: null }
    },

    autoOpenChat: {
      enabled: true,
      delayMs: 5000
    },

    launcherStrip: {
      // Set enabled:false to hide desktop strip.
      enabled: true,
      text: "Hey, there 👋",
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

      // Bubble position (launcher button).
      bubblePosition: { rightPx: 12, bottomPx: 10, leftPx: 12, topPx: null }
    },

    autoOpenChat: {
      enabled: true,
      delayMs: 5000
    },

    launcherStrip: {
      // Set enabled:false to hide mobile strip.
      enabled: true,
      text: "Hey, there 👋",
      position: { rightPx: 12, bottomPx: 86, leftPx: 12, topPx: null },
      style: { fontSizePx: 13, paddingYpx: 10, paddingXpx: 14, maxWidthPx: null }
    }
  },

  // (Colors moved to COMMON section above)
};

