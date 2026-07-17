export type SlotStatus = 'available' | 'booked' | 'blocked';

export type BookingStatus = 'confirmed' | 'pending_confirmation' | 'cancelled' | 'pending_payment';

export interface Club {
  id: string;
  name: string;
  locality: string;
  address: string | null;
  opening_time: string;
  closing_time: string;
  slot_duration_minutes: number;
  contact_email: string | null;
  requires_confirmation: boolean;
}

export interface TimeSlot {
  id: string;
  club_id: string;
  starts_at: string;
  ends_at: string;
  status: SlotStatus;
}

export interface BookingRow {
  id: string;
  status: BookingStatus;
  created_at: string;
  locale: string;
  club: Pick<Club, 'id' | 'name' | 'locality' | 'address' | 'contact_email'>;
  slot: Pick<TimeSlot, 'id' | 'starts_at' | 'ends_at' | 'status'>;
}

export interface CreateBookingResult {
  bookingId: string;
  status: BookingStatus;
}
