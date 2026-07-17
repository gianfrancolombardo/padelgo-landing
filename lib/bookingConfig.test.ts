import { describe, expect, it } from 'vitest';
import {
  canCancelBooking,
  DEFAULT_SLOT_DURATION_MINUTES,
  MIN_CANCELLATION_HOURS,
} from './bookingConfig';

describe('bookingConfig', () => {
  it('exports expected defaults', () => {
    expect(DEFAULT_SLOT_DURATION_MINUTES).toBe(60);
    expect(MIN_CANCELLATION_HOURS).toBe(12);
  });

  it('allows cancel outside the notice window', () => {
    const now = new Date('2026-07-17T10:00:00');
    const slotStart = new Date('2026-07-18T10:00:00');
    expect(canCancelBooking(slotStart, now)).toBe(true);
  });

  it('denies cancel inside the notice window', () => {
    const now = new Date('2026-07-17T10:00:00');
    const slotStart = new Date('2026-07-17T20:00:00');
    expect(canCancelBooking(slotStart, now)).toBe(false);
  });

  it('denies cancel exactly at the cut-off boundary', () => {
    const now = new Date('2026-07-17T10:00:00');
    const slotStart = new Date('2026-07-17T22:00:00');
    expect(canCancelBooking(slotStart, now)).toBe(false);
  });
});
