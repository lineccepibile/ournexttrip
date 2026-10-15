/**
 * SITE CONFIGURATION — edit these values, then rebuild & redeploy.
 */
export const siteConfig = {
  /** Shown in the opening invitation. Set to '' to hide the name. */
  partnerName: 'Roby',

  /**
   * WhatsApp number that receives the vote, in international format
   * WITHOUT '+', spaces or leading zeros. Example: '971501234567'.
   * Leave '' to let WhatsApp ask which chat to send the message to
   * (recommended — keeps your number out of the public site).
   */
  whatsappNumber: '',

  /** Prefilled WhatsApp messages. */
  messages: {
    mauritius: 'My vote is MAURITIUS 🌴. Start packing!',
    shenzhen: "My vote is SHENZHEN 🤖. Let's go!",
  },

  dates: {
    label: '1–6 December 2026',
    short: '1–6 December',
  },
}
