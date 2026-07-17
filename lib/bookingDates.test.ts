import { describe, expect, it } from 'vitest';
import {
  addMonths,
  buildMonthGrid,
  compareMonths,
  dateKeyToDate,
  dateKeysInMonth,
  dateToLocalDateKey,
  filterSlotsByDate,
  firstDateKeyMonth,
  formatSlotTime,
  isBeforeDay,
  maxNavigableMonth,
  monthStart,
  startOfToday,
  toLocalDateKey,
  uniqueSortedDateKeys,
} from './bookingDates';
import { BOOKING_LOOKAHEAD_DAYS } from './bookingConfig';

describe('bookingDates', () => {
  const slots = [
    { starts_at: '2026-07-20T09:00:00+02:00' },
    { starts_at: '2026-07-20T11:00:00+02:00' },
    { starts_at: '2026-07-21T09:00:00+02:00' },
  ];

  it('groups unique date keys', () => {
    expect(uniqueSortedDateKeys(slots)).toEqual(['2026-07-20', '2026-07-21']);
  });

  it('filters slots by date key', () => {
    const key = toLocalDateKey(slots[0].starts_at);
    expect(filterSlotsByDate(slots, key)).toHaveLength(2);
  });

  it('converts date keys to local dates', () => {
    expect(dateToLocalDateKey(dateKeyToDate('2026-07-20'))).toBe('2026-07-20');
  });

  it('returns first month from date keys', () => {
    expect(firstDateKeyMonth(['2026-07-20', '2026-08-01'])?.getMonth()).toBe(6);
  });

  it('normalizes start of today', () => {
    const today = startOfToday();
    expect(today.getHours()).toBe(0);
  });

  it('formats slot time', () => {
    expect(formatSlotTime(slots[0].starts_at, 'es')).toMatch(/\d/);
  });

  it('builds a Monday-first month grid', () => {
    const grid = buildMonthGrid(new Date(2026, 6, 1));
    expect(grid.length % 7).toBe(0);
    expect(grid.some((d) => d.getDate() === 1 && d.getMonth() === 6)).toBe(true);
  });

  it('filters date keys by month', () => {
    const keys = ['2026-07-20', '2026-08-01'];
    expect(dateKeysInMonth(keys, 2026, 6)).toEqual(['2026-07-20']);
  });

  it('compares days without time', () => {
    expect(isBeforeDay(new Date(2026, 6, 10), new Date(2026, 6, 17))).toBe(true);
    expect(monthStart(new Date(2026, 6, 20)).getDate()).toBe(1);
    expect(addMonths(new Date(2026, 6, 1), 1).getMonth()).toBe(7);
    expect(compareMonths(new Date(2026, 6, 1), new Date(2026, 7, 1))).toBeLessThan(0);
  });

  it('extends navigable months beyond the last slot', () => {
    const today = new Date(2026, 6, 17);
    const maxMonth = maxNavigableMonth(['2026-07-20'], today, BOOKING_LOOKAHEAD_DAYS);
    expect(maxMonth.getMonth()).toBeGreaterThanOrEqual(7);
  });
});
