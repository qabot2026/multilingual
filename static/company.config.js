/**
 * Company Chat UI configuration (single place to edit).
 *
 * HOW TO USE:
 * - Change values in this file only.
 * - Do NOT edit `company.js` for normal UI changes.
 * - After editing, commit + push to GitHub Pages.
 *
 * This file is loaded BEFORE `company.js` and exposes:
 *   window.COMPANY_CHAT_UI_CONFIG
 */

window.COMPANY_CHAT_UI_CONFIG = {
  /**
   * Dialogflow CX connection settings.
   * - **projectId / location / agentId**: Your Dialogflow CX agent details.
   * - **languageCode**: This is handled automatically by the language dropdown (below).
   */
  dialogflow: {
    projectId: "qabot01",
    location: "us-central1",
    agentId: "05ce7add-9025-4534-990c-fd7a25dadde1"
  },

  /**
   * Chat header (inside Dialogflow Messenger).
   */
  header: {
    title: "Chat Support",
    subtitle: "🟢 We are online to assist you",

    // If a client asks to change the image/logo, update these URLs.
    chatIconUrl: "https://storage.googleapis.com/companybucket/Images/cat.png",
    chatTitleIconUrl: "https://storage.googleapis.com/companybucket/Images/cat.png",

    // Force titlebar close icon to "X"
    forceCloseIconX: true
  },

  /**
   * Languages shown in the dropdown.
   * - To disable a language: remove it from this array.
   * - To add a new language: add { code, label } and add translations in `company.js` (UI strings),
   *   or rely on Google translate for general DOM text.
   */
  languages: {
    default: "en",
    options: [
      { code: "en", label: "English" },
      { code: "hi", label: "Hindi" },
      { code: "mr", label: "Marathi" }
    ]
  },

  /**
   * Chat window sizing.
   * - These values apply on desktop.
   * - Mobile uses responsive sizing automatically.
   */
  layout: {
    desktopChatWidthPx: 820,
    desktopChatHeightPx: 620
  },

  /**
   * Chat behavior settings.
   * - If client asks "auto open should be OFF", set enabled: false
   * - If client asks "open after 10 seconds", set delayMs: 10000
   */
  behavior: {
    autoOpenChat: {
      enabled: true,
      delayMs: 5000
    },

    /**
     * Bubble strip message (small horizontal strip near the launcher bubble).
     * - If client asks "remove that Hey message", set enabled: false
     * - To change the text, update `text`
     */
    launcherStrip: {
      enabled: true,
      text: "Hey, there 👋"
    }
  },

  /**
   * Theme colors.
   * These map to CSS variables used in `static/company.css`.
   * If client asks for "change all colors", do it here.
   */
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

  /**
   * Dialogflow Messenger CSS variables (advanced).
   * - Use this section to change bot/user bubble colors, titlebar color, etc.
   * - Keys must be valid df-messenger CSS variables.
   */
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
};

