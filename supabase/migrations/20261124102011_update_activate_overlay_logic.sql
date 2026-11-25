-- activate an overlay only if the user's active overlay limit is not reached
create or replace function public.activate_overlay (
  overlay_id uuid,
  owner_id uuid,
  max_active_overlays integer
) returns void language plpgsql security definer
set
  search_path = '' as $$
declare
  current_active_count integer;
begin
  -- lock the user to prevent race conditions
  perform pg_advisory_xact_lock(hashtext(owner_id::text));

  -- count how many are currently active
  select count(*) into current_active_count
  from public.overlays
  where user_id = owner_id and is_active = true and id != overlay_id;

  -- throw an error if the limit is reached
  if current_active_count >= max_active_overlays then
    raise exception 'overlay limit reached';
  end if;

  -- activate the requested overlay
  update public.overlays
  set is_active = true
  where id = overlay_id and user_id = owner_id;
end;
$$;
