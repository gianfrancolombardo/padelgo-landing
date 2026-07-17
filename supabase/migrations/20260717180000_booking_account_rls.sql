-- MVP: load account bookings via RPC (no fragile embeds).

drop policy if exists "Users read clubs for own bookings" on public.clubs;
create policy "Users read clubs for own bookings"
  on public.clubs for select
  to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where b.club_id = clubs.id and b.user_id = auth.uid()
    )
  );

drop policy if exists "Users read slots for own bookings" on public.time_slots;
create policy "Users read slots for own bookings"
  on public.time_slots for select
  to authenticated
  using (
    exists (
      select 1 from public.bookings b
      where b.slot_id = time_slots.id
        and b.user_id = auth.uid()
        and b.status in ('confirmed', 'pending_confirmation', 'pending_payment')
    )
  );

create or replace function public.list_my_upcoming_bookings()
returns table (
  id uuid,
  status public.booking_status,
  created_at timestamptz,
  locale text,
  club_id uuid,
  club_name text,
  club_locality text,
  club_address text,
  club_contact_email text,
  slot_id uuid,
  slot_starts_at timestamptz,
  slot_ends_at timestamptz,
  slot_status public.slot_status
)
language sql
security definer
set search_path = public
stable
as $$
  select
    b.id,
    b.status,
    b.created_at,
    b.locale,
    c.id,
    c.name,
    c.locality,
    c.address,
    c.contact_email,
    ts.id,
    ts.starts_at,
    ts.ends_at,
    ts.status
  from public.bookings b
  join public.clubs c on c.id = b.club_id
  join public.time_slots ts on ts.id = b.slot_id
  where b.user_id = auth.uid()
    and b.status in ('confirmed', 'pending_confirmation')
    and ts.starts_at > now()
  order by ts.starts_at asc;
$$;

revoke all on function public.list_my_upcoming_bookings() from public;
grant execute on function public.list_my_upcoming_bookings() to authenticated;
