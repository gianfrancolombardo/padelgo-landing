/**
 * Catalog of transactional email templates.
 * Add new entries here before implementing a template module under ./templates/.
 */
export const EMAIL_TEMPLATE_IDS = [
  'booking_confirmation',
  'booking_pending_confirmation',
  'booking_cancelled',
  'club_booking_request',
  'welcome_tutorial',
  'password_reset',
] as const;

export type EmailTemplateId = (typeof EMAIL_TEMPLATE_IDS)[number];

export const EMAIL_TEMPLATE_STATUS: Record<
  EmailTemplateId,
  'live' | 'planned' | 'deprecated'
> = {
  booking_confirmation: 'live',
  booking_pending_confirmation: 'live',
  booking_cancelled: 'planned',
  club_booking_request: 'planned',
  welcome_tutorial: 'planned',
  password_reset: 'planned',
};
