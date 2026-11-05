/**
 * Pre-release contact templates.
 *
 * These strings are placeholders, not live phone numbers or mailboxes.
 * Replace every value before launch. Do not invent real contacts in the repo.
 *
 * Visible labels: [ТЕЛЕФОН], [EMAIL], [EMAIL_ARCH], [EMAIL_PRIVACY]
 * Hrefs stay on "#" so the layout still renders links that do not dial,
 * mail, or open a messenger for a number that does not exist yet.
 */
export const siteContacts = {
  phoneDisplay: "[ТЕЛЕФОН]",
  emailDisplay: "[EMAIL]",
  architectEmailDisplay: "[EMAIL_ARCH]",
  privacyEmailDisplay: "[EMAIL_PRIVACY]",
  phoneHref: "#",
  emailHref: "#",
  architectEmailHref: "#",
  privacyEmailHref: "#",
  whatsappHref: "#",
  telegramHref: "#",
} as const;
