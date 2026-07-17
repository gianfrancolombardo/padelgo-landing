export function toLocalDateKey(iso: string): string {
  const d = new Date(iso);
  return dateToLocalDateKey(d);
}

export function dateToLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function dateKeyToDate(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function firstDateKeyMonth(dateKeys: string[]): Date | undefined {
  if (dateKeys.length === 0) return undefined;
  const d = dateKeyToDate(dateKeys[0]);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return dateToLocalDateKey(a) < dateToLocalDateKey(b);
}

export function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function compareMonths(a: Date, b: Date): number {
  return toMonthKey(a).localeCompare(toMonthKey(b));
}

export function maxNavigableMonth(availableDateKeys: string[], today: Date, lookaheadDays: number): Date {
  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + lookaheadDays);
  const horizonMonth = monthStart(horizon);

  if (availableDateKeys.length === 0) return horizonMonth;

  const lastSlotMonth = monthStart(dateKeyToDate(availableDateKeys[availableDateKeys.length - 1]));
  return compareMonths(lastSlotMonth, horizonMonth) > 0 ? lastSlotMonth : horizonMonth;
}

export function dateKeysInMonth(dateKeys: string[], year: number, month: number): string[] {
  return dateKeys.filter((key) => {
    const d = dateKeyToDate(key);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

/** Monday-first month grid including leading/trailing padding days. */
export function buildMonthGrid(viewMonth: Date): Date[] {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startPad = (first.getDay() + 6) % 7;
  const days: Date[] = [];

  for (let i = startPad; i > 0; i -= 1) {
    days.push(new Date(year, month, 1 - i));
  }
  for (let d = 1; d <= lastDay; d += 1) {
    days.push(new Date(year, month, d));
  }
  while (days.length % 7 !== 0) {
    days.push(new Date(year, month + 1, days.length - startPad - lastDay + 1));
  }

  return days;
}

export function uniqueSortedDateKeys(slots: { starts_at: string }[]): string[] {
  return [...new Set(slots.map((slot) => toLocalDateKey(slot.starts_at)))].sort();
}

export function filterSlotsByDate<T extends { starts_at: string }>(slots: T[], dateKey: string): T[] {
  return slots.filter((slot) => toLocalDateKey(slot.starts_at) === dateKey);
}

export function formatSlotTime(iso: string, locale: 'es' | 'en'): string {
  return new Date(iso).toLocaleTimeString(locale === 'es' ? 'es-ES' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatSlotDate(iso: string, locale: 'es' | 'en'): string {
  return new Date(iso).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}
