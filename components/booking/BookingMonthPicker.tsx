import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKING_LOOKAHEAD_DAYS } from '../../lib/bookingConfig';
import {
  dateKeyToDate,
  dateToLocalDateKey,
  dateKeysInMonth,
  buildMonthGrid,
  startOfToday,
  firstDateKeyMonth,
  monthStart,
  addMonths,
  isSameMonth,
  isBeforeDay,
  compareMonths,
  maxNavigableMonth,
} from '../../lib/bookingDates';

export interface BookingMonthPickerProps {
  availableDateKeys: string[];
  selectedDateKey: string | null;
  onSelectDateKey: (dateKey: string | null) => void;
  locale: 'es' | 'en';
}

const WEEKDAYS_ES = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'];
const WEEKDAYS_EN = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

const BookingMonthPicker: React.FC<BookingMonthPickerProps> = ({
  availableDateKeys,
  selectedDateKey,
  onSelectDateKey,
  locale,
}) => {
  const availableSet = useMemo(() => new Set(availableDateKeys), [availableDateKeys]);
  const today = useMemo(() => startOfToday(), []);
  const firstMonth = useMemo(
    () => firstDateKeyMonth(availableDateKeys) ?? monthStart(today),
    [availableDateKeys, today]
  );

  const [viewMonth, setViewMonth] = useState<Date>(() => firstMonth);

  useEffect(() => {
    setViewMonth(firstMonth);
  }, [availableDateKeys.join('|')]);

  const intlLocale = locale === 'es' ? 'es-ES' : 'en-GB';
  const monthLabel = viewMonth.toLocaleDateString(intlLocale, { month: 'long', year: 'numeric' });
  const weekdays = locale === 'es' ? WEEKDAYS_ES : WEEKDAYS_EN;

  const gridDays = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);
  const availableInMonth = useMemo(
    () => dateKeysInMonth(availableDateKeys, viewMonth.getFullYear(), viewMonth.getMonth()),
    [availableDateKeys, viewMonth]
  );

  const minMonth = useMemo(() => monthStart(today), [today]);
  const maxMonth = useMemo(
    () => maxNavigableMonth(availableDateKeys, today, BOOKING_LOOKAHEAD_DAYS),
    [availableDateKeys, today]
  );

  const canGoPrev = compareMonths(viewMonth, minMonth) > 0;
  const canGoNext = compareMonths(viewMonth, maxMonth) < 0;

  const navigateMonth = (delta: -1 | 1) => {
    const target = addMonths(viewMonth, delta);
    if (compareMonths(target, minMonth) < 0 || compareMonths(target, maxMonth) > 0) return;

    setViewMonth(target);
    const keysInMonth = dateKeysInMonth(availableDateKeys, target.getFullYear(), target.getMonth());
    onSelectDateKey(keysInMonth[0] ?? null);
  };

  return (
    <div className="booking-month-picker" data-testid="booking-date-calendar">
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={() => navigateMonth(-1)}
          disabled={!canGoPrev}
          aria-label={locale === 'es' ? 'Mes anterior' : 'Previous month'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-volea-green transition hover:bg-volea-green/10 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        <p className="text-base font-semibold text-white capitalize tracking-wide text-center flex-1">
          {monthLabel}
        </p>

        <button
          type="button"
          onClick={() => navigateMonth(1)}
          disabled={!canGoNext}
          aria-label={locale === 'es' ? 'Mes siguiente' : 'Next month'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-volea-green transition hover:bg-volea-green/10 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] font-bold tracking-[0.12em] text-gray-500 py-1"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {gridDays.map((day) => {
          const inMonth = isSameMonth(day, viewMonth);
          const key = dateToLocalDateKey(day);
          const isPast = isBeforeDay(day, today);
          const isAvailable = availableSet.has(key);
          const isSelected = selectedDateKey === key;
          const isToday = dateToLocalDateKey(day) === dateToLocalDateKey(today);

          if (!inMonth) {
            return <div key={key + '-pad'} className="aspect-square" aria-hidden />;
          }

          const disabled = isPast || !isAvailable;

          return (
            <button
              key={key}
              type="button"
              data-date-key={key}
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={day.toLocaleDateString(intlLocale, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
              onClick={() => onSelectDateKey(key)}
              className={[
                'aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volea-green/60',
                isSelected
                  ? 'bg-volea-green text-[#050505] shadow-[0_0_18px_rgba(59,255,118,0.35)]'
                  : isAvailable
                    ? 'bg-white/[0.06] text-white border border-volea-green/30 hover:bg-volea-green/15'
                    : isPast
                      ? 'text-gray-600 cursor-not-allowed opacity-40'
                      : 'text-gray-600 cursor-not-allowed opacity-50',
                isToday && !isSelected ? 'ring-1 ring-volea-green/50' : '',
              ].join(' ')}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {availableInMonth.length === 0 && (
        <p className="text-center text-xs text-gray-500 mt-3">
          {locale === 'es' ? 'Sin disponibilidad este mes' : 'No availability this month'}
        </p>
      )}
    </div>
  );
};

export default BookingMonthPicker;
