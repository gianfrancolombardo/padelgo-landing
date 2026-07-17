import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, Loader2, LogOut, MapPin, User } from 'lucide-react';
import AuthLayout from './AuthLayout';
import AuthGuard from './AuthGuard';
import { authGhostButtonClass, authPrimaryButtonClass } from './authStyles';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { navigateTo } from '../../lib/navigation';
import { ROUTES } from '../../i18n/routes';
import { BookingError, cancelBooking, listMyUpcomingBookings } from '../../lib/booking';
import type { BookingRow } from '../../lib/bookingTypes';
import { canCancelBooking } from '../../lib/bookingConfig';
import { formatSlotDate, formatSlotTime } from '../../lib/bookingDates';

const AccountPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'en' ? 'en' : 'es';
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setLoadingBookings(true);
    setErrorKey(null);
    try {
      const data = await listMyUpcomingBookings();
      setBookings(data ?? []);
    } catch {
      setErrorKey('booking.errors.loadBookings');
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    void loadBookings();
  }, [user, loadBookings]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigateTo('/');
  };

  const handleCancel = async (booking: BookingRow) => {
    const confirmed = window.confirm(t('booking.account.cancelConfirm'));
    if (!confirmed) return;

    setCancellingId(booking.id);
    setErrorKey(null);
    try {
      await cancelBooking(booking.id);
      await loadBookings();
    } catch (err) {
      const code = err instanceof BookingError ? err.code : 'unknown';
      setErrorKey(`booking.errors.${code}`);
    } finally {
      setCancellingId(null);
    }
  };

  const displayName =
    (user?.user_metadata?.full_name as string | undefined)?.trim() || user?.email || '';

  return (
    <AuthGuard>
      <AuthLayout title={t('auth.account.title')} subtitle={t('auth.account.subtitle')}>
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-white/10">
            <div className="h-14 w-14 rounded-full bg-volea-green/15 flex items-center justify-center ring-1 ring-volea-green/30">
              <User className="text-volea-green" size={26} />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white truncate">{displayName}</p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                {t('booking.account.upcoming')}
              </h2>
              <a href={ROUTES.book} className="text-xs text-volea-green font-bold tracking-wider uppercase">
                {t('booking.account.new')}
              </a>
            </div>

            {loadingBookings && (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-volea-green" size={24} />
              </div>
            )}

            {errorKey && (
              <div className="text-center mb-3 space-y-2">
                <p className="text-red-400 text-sm">{t(errorKey)}</p>
                <button
                  type="button"
                  onClick={() => void loadBookings()}
                  className="text-xs text-volea-green font-bold tracking-wider uppercase"
                >
                  {t('booking.account.retry')}
                </button>
              </div>
            )}

            {!loadingBookings && !errorKey && bookings.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center">
                <p className="text-sm text-gray-500 mb-4">{t('booking.account.empty')}</p>
                <a href={ROUTES.book} className={authPrimaryButtonClass}>
                  {t('booking.account.bookCta')}
                </a>
              </div>
            )}

            <ul className="space-y-3">
              {bookings.map((booking) => {
                const cancellable = canCancelBooking(new Date(booking.slot.starts_at));
                return (
                  <li
                    key={booking.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-white">{booking.club.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-volea-green" />
                          {booking.club.locality}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full ${
                          booking.status === 'pending_confirmation'
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-volea-green/15 text-volea-green'
                        }`}
                      >
                        {t(`booking.status.${booking.status}`)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                      <Calendar size={14} className="text-volea-green" />
                      {formatSlotDate(booking.slot.starts_at, locale)}{' '}
                      {formatSlotTime(booking.slot.starts_at, locale)}
                    </p>
                    {cancellable ? (
                      <button
                        type="button"
                        disabled={cancellingId === booking.id}
                        onClick={() => void handleCancel(booking)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        {cancellingId === booking.id ? '…' : t('booking.account.cancel')}
                      </button>
                    ) : (
                      <p className="text-xs text-gray-600">{t('booking.account.cancelClosed')}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full border border-white/15 text-gray-300 font-bold py-4 rounded-full hover:border-red-400/60 hover:text-red-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            {t('auth.logout')}
          </button>
        </div>
      </AuthLayout>
    </AuthGuard>
  );
};

export default AccountPage;
