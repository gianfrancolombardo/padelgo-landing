import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountPage from './AccountPage';
import { LanguageProvider } from '../../i18n/LanguageContext';

const mockListBookings = vi.fn();
const mockCancelBooking = vi.fn();
const mockSignOut = vi.fn();

vi.mock('../../lib/booking', () => ({
  BookingError: class BookingError extends Error {
    code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
  },
  listMyUpcomingBookings: (...args: unknown[]) => mockListBookings(...args),
  cancelBooking: (...args: unknown[]) => mockCancelBooking(...args),
}));

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { email: 'player@voleabox.com', user_metadata: { full_name: 'Player' } },
    signOut: mockSignOut,
  }),
}));

vi.mock('../auth/AuthGuard', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function renderAccount() {
  return render(
    <LanguageProvider>
      <AccountPage />
    </LanguageProvider>
  );
}

describe('AccountPage bookings', () => {
  beforeEach(() => {
    mockListBookings.mockReset();
    mockCancelBooking.mockReset();
    mockSignOut.mockReset();
    vi.stubGlobal('confirm', vi.fn(() => true));
  });

  it('loads and shows upcoming bookings', async () => {
    mockListBookings.mockResolvedValue([
      {
        id: 'b1',
        status: 'confirmed',
        created_at: '2030-01-01T00:00:00Z',
        locale: 'es',
        club: { id: 'c1', name: 'Club Piloto Barcelona', locality: 'Barcelona', address: null, contact_email: null },
        slot: {
          id: 's1',
          starts_at: '2030-07-20T12:00:00',
          ends_at: '2030-07-20T13:00:00',
          status: 'booked',
        },
      },
    ]);

    renderAccount();

    expect(await screen.findByText('Club Piloto Barcelona')).toBeInTheDocument();
    expect(screen.queryByText(/no pudimos cargar|could not load/i)).not.toBeInTheDocument();
  });

  it('shows retry when loading bookings fails', async () => {
    mockListBookings
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValue([]);

    renderAccount();

    expect(await screen.findByText(/no pudimos cargar|could not load/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /reintentar|retry/i }));

    await waitFor(() => {
      expect(mockListBookings.mock.calls.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('shows empty state when there are no bookings', async () => {
    mockListBookings.mockResolvedValue([]);
    renderAccount();
    expect(await screen.findByText(/aún no tienes|you have no bookings/i)).toBeInTheDocument();
  });
});
