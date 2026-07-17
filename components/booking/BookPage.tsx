import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Loader2, MapPin } from 'lucide-react';
import AuthGuard from '../auth/AuthGuard';
import AuthLayout from '../auth/AuthLayout';
import { authPrimaryButtonClass, authGhostButtonClass } from '../auth/authStyles';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  BookingError,
  createBooking,
  listActiveClubs,
  listAvailableSlotsForClub,
  requestBookingConfirmationEmail,
} from '../../lib/booking';
import type { BookingStatus, Club, TimeSlot } from '../../lib/bookingTypes';
import {
  filterSlotsByDate,
  formatSlotDate,
  formatSlotTime,
  uniqueSortedDateKeys,
} from '../../lib/bookingDates';
import { ROUTES } from '../../i18n/routes';
import BookingMonthPicker from './BookingMonthPicker';

type Step = 'club' | 'schedule' | 'confirm' | 'success';

const stepOrder: Step[] = ['club', 'schedule', 'confirm', 'success'];

const BookPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'en' ? 'en' : 'es';

  const [step, setStep] = useState<Step>('club');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [resultStatus, setResultStatus] = useState<BookingStatus | null>(null);

  const dateKeys = useMemo(() => uniqueSortedDateKeys(slots), [slots]);
  const slotsForDay = useMemo(
    () => (selectedDateKey ? filterSlotsByDate(slots, selectedDateKey) : []),
    [slots, selectedDateKey]
  );

  const loadClubs = useCallback(async () => {
    setLoading(true);
    setErrorKey(null);
    try {
      const data = await listActiveClubs();
      setClubs(data);
    } catch {
      setErrorKey('booking.errors.loadClubs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClubs();
  }, [loadClubs]);

  const selectClub = async (club: Club) => {
    setSelectedClub(club);
    setSelectedDateKey(null);
    setSelectedSlot(null);
    setLoading(true);
    setErrorKey(null);
    try {
      const data = await listAvailableSlotsForClub(club.id);
      setSlots(data);
      if (data.length === 0) {
        setErrorKey('booking.errors.noSlots');
      } else {
        const keys = uniqueSortedDateKeys(data);
        setSelectedDateKey(keys[0] ?? null);
        setStep('schedule');
      }
    } catch {
      setErrorKey('booking.errors.loadSlots');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setErrorKey(null);
    if (step === 'schedule') {
      setStep('club');
      setSelectedClub(null);
      setSelectedDateKey(null);
      setSelectedSlot(null);
      setSlots([]);
      return;
    }
    if (step === 'confirm') {
      setStep('schedule');
      return;
    }
  };

  const handleConfirm = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setErrorKey(null);
    try {
      const result = await createBooking(selectedSlot.id, locale);
      setResultStatus(result.status);
      void requestBookingConfirmationEmail(result.bookingId);
      setStep('success');
    } catch (err) {
      const code = err instanceof BookingError ? err.code : 'unknown';
      setErrorKey(`booking.errors.${code}`);
      if (code === 'slot_not_available') {
        setStep('schedule');
        setSelectedSlot(null);
        if (selectedClub) {
          const data = await listAvailableSlotsForClub(selectedClub.id);
          setSlots(data);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const stepIndex = stepOrder.indexOf(step);

  const renderStepper = () =>
    step !== 'success' ? (
      <div className="flex gap-2 mb-8 justify-center">
        {(['club', 'schedule', 'confirm'] as Step[]).map((s, i) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              i <= stepIndex ? 'bg-volea-green w-10' : 'bg-white/10 w-6'
            }`}
            aria-hidden
          />
        ))}
      </div>
    ) : null;

  const renderClubStep = () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 text-center mb-4">{t('booking.steps.club')}</p>
      {clubs.map((club) => (
        <button
          key={club.id}
          type="button"
          onClick={() => void selectClub(club)}
          className="w-full text-left p-4 rounded-2xl border border-white/10 hover:border-volea-green/40 bg-white/5 transition-colors"
        >
          <p className="font-medium text-white">{club.name}</p>
          <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
            <MapPin size={14} className="text-volea-green" />
            {club.locality}
          </p>
        </button>
      ))}
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 text-center">{t('booking.steps.schedule')}</p>
      <BookingMonthPicker
        availableDateKeys={dateKeys}
        selectedDateKey={selectedDateKey}
        onSelectDateKey={(key) => {
          setSelectedDateKey(key);
          setSelectedSlot(null);
        }}
        locale={locale}
      />

      {selectedDateKey && (
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-2">
            <Clock size={14} className="text-volea-green" />
            <p className="text-sm font-medium text-gray-300">{t('booking.steps.time')}</p>
          </div>
          {slotsForDay.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">{t('booking.errors.noSlots')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[38vh] overflow-y-auto pr-1">
              {slotsForDay.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => {
                    setSelectedSlot(slot);
                    setStep('confirm');
                  }}
                  className="group p-3.5 rounded-xl border border-white/10 hover:border-volea-green/50 bg-white/[0.04] hover:bg-volea-green/[0.08] text-white font-semibold transition-all min-h-[52px] shadow-sm hover:shadow-[0_0_16px_rgba(59,255,118,0.12)]"
                >
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Clock
                      size={15}
                      className="text-volea-green group-hover:scale-110 transition-transform"
                    />
                    {formatSlotTime(slot.starts_at, locale)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderConfirmStep = () => {
    if (!selectedClub || !selectedSlot) return null;
    return (
      <div className="space-y-6">
        <p className="text-sm text-gray-400 text-center">{t('booking.steps.confirm')}</p>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">{t('booking.summary.club')}</span>
            <span className="text-white text-right">{selectedClub.name}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">{t('booking.summary.date')}</span>
            <span className="text-white">{formatSlotDate(selectedSlot.starts_at, locale)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">{t('booking.summary.time')}</span>
            <span className="text-white">
              {formatSlotTime(selectedSlot.starts_at, locale)} – {formatSlotTime(selectedSlot.ends_at, locale)}
            </span>
          </div>
        </div>
        <button
          type="button"
          disabled={submitting}
          onClick={() => void handleConfirm()}
          className={authPrimaryButtonClass}
        >
          {submitting && <Loader2 className="animate-spin" size={18} />}
          {t('booking.confirm')}
        </button>
      </div>
    );
  };

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <CheckCircle2 className="mx-auto text-volea-green" size={48} />
      <p className="text-white text-lg font-medium">
        {resultStatus === 'pending_confirmation'
          ? t('booking.success.pendingTitle')
          : t('booking.success.confirmedTitle')}
      </p>
      <p className="text-gray-400 text-sm leading-relaxed">
        {resultStatus === 'pending_confirmation'
          ? t('booking.success.pendingBody')
          : t('booking.success.confirmedBody')}
      </p>
      <div className="flex flex-col gap-3">
        <a href={ROUTES.account} className={authPrimaryButtonClass}>
          {t('booking.success.viewAccount')}
        </a>
        <a href={ROUTES.book} className={authGhostButtonClass}>
          {t('booking.success.bookAnother')}
        </a>
      </div>
    </div>
  );

  return (
    <AuthGuard>
      <AuthLayout title={t('booking.title')} subtitle={t('booking.subtitle')}>
        {renderStepper()}

        {loading && step === 'club' && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-volea-green" size={32} />
          </div>
        )}

        {!loading && errorKey && step !== 'success' && (
          <p className="text-red-400 text-sm text-center mb-4">{t(errorKey)}</p>
        )}

        {!loading && clubs.length === 0 && step === 'club' && !errorKey && (
          <p className="text-gray-400 text-center py-8">{t('booking.empty.clubs')}</p>
        )}

        {step === 'club' && !loading && clubs.length > 0 && renderClubStep()}
        {step === 'schedule' && renderScheduleStep()}
        {step === 'confirm' && renderConfirmStep()}
        {step === 'success' && renderSuccessStep()}

        {step !== 'club' && step !== 'success' && (
          <button type="button" onClick={goBack} className={`mt-6 ${authGhostButtonClass}`}>
            <ArrowLeft size={16} className="inline mr-1" />
            {t('booking.back')}
          </button>
        )}
      </AuthLayout>
    </AuthGuard>
  );
};

export default BookPage;
