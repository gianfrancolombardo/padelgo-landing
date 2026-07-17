import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookPage from './BookPage';
import { LanguageProvider } from '../../i18n/LanguageContext';

const mockListClubs = vi.fn();
const mockListSlots = vi.fn();
const mockCreateBooking = vi.fn();
const mockRequestEmail = vi.fn();

vi.mock('../../lib/booking', () => ({
  BookingError: class BookingError extends Error {
    code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
  },
  listActiveClubs: (...args: unknown[]) => mockListClubs(...args),
  listAvailableSlotsForClub: (...args: unknown[]) => mockListSlots(...args),
  createBooking: (...args: unknown[]) => mockCreateBooking(...args),
  requestBookingConfirmationEmail: (...args: unknown[]) => mockRequestEmail(...args),
}));

vi.mock('../auth/AuthGuard', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../layout/LandingShell', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

function renderBookPage() {
  return render(
    <LanguageProvider>
      <BookPage />
    </LanguageProvider>
  );
}

describe('BookPage', () => {
  beforeEach(() => {
    mockListClubs.mockReset();
    mockListSlots.mockReset();
    mockCreateBooking.mockReset();
    mockRequestEmail.mockReset();
    mockListClubs.mockResolvedValue([
      { id: 'c1', name: 'Club A', locality: 'Barcelona', requires_confirmation: false },
    ]);
    mockListSlots.mockResolvedValue([
      {
        id: 's1',
        club_id: 'c1',
        starts_at: '2030-07-20T12:00:00',
        ends_at: '2030-07-20T13:00:00',
        status: 'available',
      },
    ]);
    mockCreateBooking.mockResolvedValue({ bookingId: 'b1', status: 'confirmed' });
    mockRequestEmail.mockResolvedValue(undefined);
  });

  it('renders clubs and completes booking flow', async () => {
    const user = userEvent.setup();
    renderBookPage();

    expect(await screen.findByText('Club A')).toBeInTheDocument();
    await user.click(screen.getByText('Club A'));

    await screen.findByTestId('booking-date-calendar');
    await user.click(screen.getByRole('button', { name: /20/i }));

    const timeButton = screen.getByRole('button', { name: /12:00/i });
    await user.click(timeButton);

    await user.click(screen.getByRole('button', { name: /confirmar|confirm/i }));

    await waitFor(() => {
      expect(mockCreateBooking).toHaveBeenCalled();
      expect(screen.getByText(/confirmada|confirmed/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no clubs', async () => {
    mockListClubs.mockResolvedValue([]);
    renderBookPage();
    expect(await screen.findByText(/no hay clubes|no clubs/i)).toBeInTheDocument();
  });
});
