-- Extend pilot slot seed to 60 days ahead (idempotent via conflict handling)
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
    for i in 0..59 loop
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
