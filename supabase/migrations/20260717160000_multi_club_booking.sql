-- Multi-club booking schema
-- MIN_CANCELLATION_HOURS in cancel_booking: keep in sync with lib/bookingConfig.ts

create type public.slot_status as enum ('available', 'booked', 'blocked');

create type public.booking_status as enum (
  'confirmed',
  'pending_confirmation',
  'cancelled',
  'pending_payment'
);

create table public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  locality text not null,
  address text,
  notes text,
  opening_time time not null default '09:00',
  closing_time time not null default '22:00',
  slot_duration_minutes int not null default 60 check (slot_duration_minutes > 0),
  contact_email text,
  requires_confirmation boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint clubs_hours_valid check (closing_time > opening_time)
);

create table public.time_slots (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.slot_status not null default 'available',
  created_at timestamptz not null default now(),
  constraint time_slots_range_valid check (ends_at > starts_at)
);

create unique index time_slots_club_starts_unique on public.time_slots (club_id, starts_at);
create index time_slots_club_status_starts_idx on public.time_slots (club_id, status, starts_at);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  club_id uuid not null references public.clubs (id) on delete restrict,
  slot_id uuid not null references public.time_slots (id) on delete restrict,
  status public.booking_status not null default 'confirmed',
  locale text not null default 'es',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cancelled_at timestamptz
);

create unique index bookings_one_active_per_slot on public.bookings (slot_id)
  where status in ('confirmed', 'pending_confirmation', 'pending_payment');

create index bookings_user_status_idx on public.bookings (user_id, status);

alter table public.clubs enable row level security;
alter table public.time_slots enable row level security;
alter table public.bookings enable row level security;

create policy "Authenticated read active clubs"
  on public.clubs for select
  to authenticated
  using (is_active = true);

create policy "Authenticated read future slots"
  on public.time_slots for select
  to authenticated
  using (
    exists (
      select 1 from public.clubs c
      where c.id = club_id and c.is_active = true
    )
    and starts_at > now()
    and status in ('available', 'booked')
  );

create policy "Users read own bookings"
  on public.bookings for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.create_booking(p_slot_id uuid, p_locale text default 'es')
returns table (booking_id uuid, booking_status public.booking_status)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_slot public.time_slots%rowtype;
  v_club public.clubs%rowtype;
  v_status public.booking_status;
  v_booking_id uuid;
begin
  if v_user_id is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  select * into v_slot
  from public.time_slots
  where id = p_slot_id
  for update;

  if not found then
    raise exception 'Slot not found' using errcode = 'P0002';
  end if;

  if v_slot.status <> 'available' then
    raise exception 'Slot not available' using errcode = 'P0001';
  end if;

  if v_slot.starts_at <= now() then
    raise exception 'Slot in the past' using errcode = 'P0001';
  end if;

  select * into v_club
  from public.clubs
  where id = v_slot.club_id and is_active = true;

  if not found then
    raise exception 'Club not found' using errcode = 'P0002';
  end if;

  if v_club.requires_confirmation then
    v_status := 'pending_confirmation';
  else
    v_status := 'confirmed';
  end if;

  update public.time_slots
  set status = 'booked'
  where id = p_slot_id and status = 'available';

  if not found then
    raise exception 'Slot not available' using errcode = 'P0001';
  end if;

  insert into public.bookings (user_id, club_id, slot_id, status, locale)
  values (v_user_id, v_club.id, p_slot_id, v_status, coalesce(nullif(trim(p_locale), ''), 'es'))
  returning id into v_booking_id;

  booking_id := v_booking_id;
  booking_status := v_status;
  return next;
end;
$$;

create or replace function public.cancel_booking(p_booking_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_booking public.bookings%rowtype;
  v_slot_starts timestamptz;
  -- keep in sync with lib/bookingConfig.ts MIN_CANCELLATION_HOURS
  v_min_hours int := 12;
begin
  if v_user_id is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  select b.*
  into v_booking
  from public.bookings b
  where b.id = p_booking_id and b.user_id = v_user_id
  for update;

  if not found then
    raise exception 'Booking not found' using errcode = 'P0002';
  end if;

  select starts_at into v_slot_starts
  from public.time_slots
  where id = v_booking.slot_id;

  if v_booking.status not in ('confirmed', 'pending_confirmation') then
    raise exception 'Booking cannot be cancelled' using errcode = 'P0001';
  end if;

  if v_slot_starts <= now() + make_interval(hours => v_min_hours) then
    raise exception 'Cancellation window closed' using errcode = 'P0001';
  end if;

  update public.bookings
  set status = 'cancelled', cancelled_at = now(), updated_at = now()
  where id = p_booking_id;

  update public.time_slots
  set status = 'available'
  where id = v_booking.slot_id;
end;
$$;

revoke all on function public.create_booking(uuid, text) from public;
revoke all on function public.cancel_booking(uuid) from public;
grant execute on function public.create_booking(uuid, text) to authenticated;
grant execute on function public.cancel_booking(uuid) to authenticated;

-- Seed pilot clubs and slots (14 days ahead, Europe/Madrid local wall-clock approximated via timestamptz)
insert into public.clubs (name, locality, address, contact_email, opening_time, closing_time, slot_duration_minutes, requires_confirmation)
values
  ('Club Piloto Barcelona', 'Barcelona', 'Av. Diagonal 100', 'ops@voleabox.com', '09:00', '22:00', 60, false),
  ('Club Piloto Sitges', 'Sitges', 'Passeig Marítim 12', 'ops@voleabox.com', '10:00', '21:00', 60, false);

do $$
declare
  v_club record;
  v_day date;
  v_slot_start timestamptz;
  v_slot_end timestamptz;
  v_open time;
  v_close time;
  v_cursor time;
  v_duration interval;
begin
  for v_club in select * from public.clubs loop
    v_duration := make_interval(mins => v_club.slot_duration_minutes);
    for i in 0..13 loop
      v_day := (current_date + i);
      v_open := v_club.opening_time;
      v_close := v_club.closing_time;
      v_cursor := v_open;
      while v_cursor < v_close loop
        v_slot_start := (v_day + v_cursor) at time zone 'Europe/Madrid';
        v_slot_end := v_slot_start + v_duration;
        if v_slot_end > ((v_day + v_close) at time zone 'Europe/Madrid') then
          exit;
        end if;
        if v_slot_start > now() then
          insert into public.time_slots (club_id, starts_at, ends_at, status)
          values (v_club.id, v_slot_start, v_slot_end, 'available')
          on conflict (club_id, starts_at) do nothing;
        end if;
        v_cursor := v_cursor + v_duration;
      end loop;
    end loop;
  end loop;
end;
$$;
