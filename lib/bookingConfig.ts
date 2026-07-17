/** Default slot length when a club has no explicit `slot_duration_minutes`. */
export const DEFAULT_SLOT_DURATION_MINUTES = 60;

/** How far ahead users can browse months in the booking calendar. */
export const BOOKING_LOOKAHEAD_DAYS = 60;

/**
 * Minimum hours before slot start that a user may cancel.
 * Keep in sync with `cancel_booking` RPC in Supabase migrations.
 */
export const MIN_CANCELLATION_HOURS = 12;

export function canCancelBooking(slotStartsAt: Date, now: Date = new Date()): boolean {
  const cutoffMs = MIN_CANCELLATION_HOURS * 60 * 60 * 1000;
  return slotStartsAt.getTime() - now.getTime() > cutoffMs;
}
