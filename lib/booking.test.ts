import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  BookingError,
  cancelBooking,
  createBooking,
  listActiveClubs,
  listAvailableSlotsForClub,
  listMyUpcomingBookings,
  mapRpcMessage,
  requestBookingConfirmationEmail,
} from './booking';

const mockFrom = vi.fn();
const mockRpc = vi.fn();
const mockFunctionsInvoke = vi.fn();

vi.mock('./supabase', () => ({
  getSupabaseClient: () => ({
    from: mockFrom,
    rpc: mockRpc,
    functions: { invoke: mockFunctionsInvoke },
  }),
}));

function chain(result: { data?: unknown; error?: unknown }) {
  const builder = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue(result),
  };
  return builder;
}

describe('booking helpers', () => {
  beforeEach(() => {
    mockFrom.mockReset();
    mockRpc.mockReset();
    mockFunctionsInvoke.mockReset();
  });

  it('lists active clubs', async () => {
    const clubs = [{ id: 'c1', name: 'Club A', locality: 'Barcelona' }];
    mockFrom.mockReturnValue(chain({ data: clubs, error: null }));

    const result = await listActiveClubs();
    expect(result).toEqual(clubs);
  });

  it('lists available slots for a club', async () => {
    const slots = [{ id: 's1', club_id: 'c1', starts_at: '2026-07-20T09:00:00Z', status: 'available' }];
    mockFrom.mockReturnValue(chain({ data: slots, error: null }));

    const result = await listAvailableSlotsForClub('c1');
    expect(result).toEqual(slots);
  });

  it('creates a booking via RPC', async () => {
    mockRpc.mockResolvedValue({
      data: [{ booking_id: 'b1', booking_status: 'confirmed' }],
      error: null,
    });

    const result = await createBooking('s1', 'es');
    expect(result).toEqual({ bookingId: 'b1', status: 'confirmed' });
    expect(mockRpc).toHaveBeenCalledWith('create_booking', { p_slot_id: 's1', p_locale: 'es' });
  });

  it('throws on slot conflict', async () => {
    mockRpc.mockResolvedValue({ data: null, error: { message: 'Slot not available' } });

    await expect(createBooking('s1', 'es')).rejects.toMatchObject({
      code: 'slot_not_available',
    });
  });

  it('cancels a booking via RPC', async () => {
    mockRpc.mockResolvedValue({ data: null, error: null });
    await cancelBooking('b1');
    expect(mockRpc).toHaveBeenCalledWith('cancel_booking', { p_booking_id: 'b1' });
  });

  it('lists upcoming bookings via RPC', async () => {
    const future = new Date(Date.now() + 86400000).toISOString();
    mockRpc.mockResolvedValue({
      data: [
        {
          id: 'b1',
          status: 'confirmed',
          created_at: '2030-01-01T00:00:00Z',
          locale: 'es',
          club_id: 'c1',
          club_name: 'Club A',
          club_locality: 'Barcelona',
          club_address: null,
          club_contact_email: null,
          slot_id: 's1',
          slot_starts_at: future,
          slot_ends_at: future,
          slot_status: 'booked',
        },
      ],
      error: null,
    });

    const result = await listMyUpcomingBookings();
    expect(result).toHaveLength(1);
    expect(result[0].club.name).toBe('Club A');
    expect(mockRpc).toHaveBeenCalledWith('list_my_upcoming_bookings');
  });

  it('falls back to table query when RPC is missing', async () => {
    const future = new Date(Date.now() + 86400000).toISOString();
    mockRpc.mockResolvedValue({
      data: null,
      error: { message: 'function list_my_upcoming_bookings() does not exist', code: '42883' },
    });
    mockFrom.mockReturnValue(
      chain({
        data: [
          {
            id: 'b1',
            status: 'confirmed',
            created_at: '2030-01-01T00:00:00Z',
            locale: 'es',
            club: { id: 'c1', name: 'Club A', locality: 'Barcelona', address: null, contact_email: null },
            slot: { id: 's1', starts_at: future, ends_at: future, status: 'booked' },
          },
        ],
        error: null,
      })
    );

    const result = await listMyUpcomingBookings();
    expect(result).toHaveLength(1);
    expect(mockFrom).toHaveBeenCalledWith('bookings');
  });

  it('logs but does not throw when email invoke fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockFunctionsInvoke.mockResolvedValue({ error: new Error('Resend down') });

    await expect(requestBookingConfirmationEmail('b1')).resolves.toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('maps rpc messages to error codes', () => {
    expect(mapRpcMessage('Cancellation window closed')).toBe('cancellation_closed');
    expect(mapRpcMessage('Slot not found')).toBe('slot_not_found');
  });
});

describe('BookingError', () => {
  it('exposes code', () => {
    const err = new BookingError('fail', 'unknown');
    expect(err.code).toBe('unknown');
  });
});
