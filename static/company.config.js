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
  /**
   * Dialogflow CX details.
   * Change these if you change your Dialogflow agent.
   */
  dialogflow: {
    projectId: "qabot01",
    location: "us-central1",
    agentId: "05ce7add-9025-4534-990c-fd7a25dadde1"
  },

  /**
   * Chat header (top bar inside the chat).
   */
  header: {
    title: "Chat Support",
    subtitle: "🟢 We are online to assist you",

    // Change these URLs to change the chat images/logo.
    chatIconUrl: "https://storage.googleapis.com/companybucket/Images/cat.png",
    chatTitleIconUrl: "https://storage.googleapis.com/companybucket/Images/cat.png",

    // Keep the close icon as X (not a back arrow).
    forceCloseIconX: true
  },

  /**
   * Language dropdown.
   * - To disable a language: remove it from `options`.
   * - To change default: change `default`.
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
   * Chat window size.
   */
  layout: {
    desktopChatWidthPx: 420,
    desktopChatHeightPx: 620,

    /**
     * Mobile chat layout.
     * Change these to control chat size/position on mobile.
     */
    mobile: {
      // If true, we use these mobile settings when screen width is <= 768px.
      enabled: true,

      // Space from screen edges (in pixels).
      horizontalInsetPx: 12,
      topInsetPx: 14,
      bottomInsetPx: 10,

      // Minimum chat size (in pixels).
      minWidthPx: 280,
      minHeightPx: 340
    },

    /**
     * Chat bubble position (launcher button).
     * - Desktop: usually bottom-right.
     * - Mobile: usually full width (left + right).
     */
    bubblePosition: {
      desktop: { rightPx: 20, bottomPx: 20, leftPx: null },
      mobile: { rightPx: 12, bottomPx: 10, leftPx: 12 }
    }
  },

  /**
   * Chat behavior.
   */
  behavior: {
    autoOpenChat: {
      // Auto-open the chat after some time.
      enabled: true,

      // Time in milliseconds. Example: 10000 = 10 seconds.
      delayMs: 5000
    },

    /**
     * Small strip near the chat bubble (with a message).
     */
    launcherStrip: {
      // Show / hide the strip.
      enabled: true,

      // Strip text.
      text: "Hey, there 👋 how are you?",

      /**
       * Strip position on desktop.
       * - Move up/down: change `bottomPx` (or set `topPx`)
       * - Move left/right: change `rightPx` (or set `leftPx`)
       * - If you don't want a value, keep it as null.
       */
      position: {
        rightPx: 30,
        bottomPx: 20,
        leftPx: null,
        topPx: null
      },

      /**
       * Strip position on mobile (optional).
       * If you want full width on mobile, set both leftPx and rightPx.
       */
      mobilePosition: {
        rightPx: 12,
        bottomPx: 86,
        leftPx: 12,
        topPx: null
      }
    }
  },

  /**
   * Page colors (background, text, borders).
   * If client asks "change website colors", do it here.
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
   * Chat colors (bot/user bubble colors, titlebar, etc).
   * If client asks "change bot color" or "change user bubble color", do it here.
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

