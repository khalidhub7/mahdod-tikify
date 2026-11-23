-- Create overlays table
create table public.overlays (
  -- Custom columns
  name text not null,
  tiktok_username text not null,
  -- System-managed columns
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  is_active boolean not null default false,
  secret_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.overlays enable row level security;

-- Read policy
create policy "Users can view their own overlays" on public.overlays for
select
  to authenticated using (
    (
      select
        auth.uid ()
    ) = user_id
  );

-- Update policy
create policy "Users can update their own overlays" on public.overlays
for update
  to authenticated using (
    (
      select
        auth.uid ()
    ) = user_id
  )
with
  check (
    (
      select
        auth.uid ()
    ) = user_id
  );

-- Delete policy
create policy "Users can delete their own overlays" on public.overlays for delete to authenticated using (
  (
    select
      auth.uid ()
  ) = user_id
);

/* Functions */
-- Auto update overlay updated_at function
create function public.set_overlay_updated_at () returns trigger language plpgsql
set
  search_path = '' as $$
begin
  new.updated_at = now();

  return new;
end;
$$;

-- Activate an overlay while enforcing the user's maximum active overlay limit
create function public.activate_overlay (
  overlay_id uuid,
  owner_id uuid,
  max_active_overlays integer
) returns void language plpgsql security definer
set
  search_path = '' as $$
begin

  perform pg_advisory_xact_lock(hashtext(owner_id::text));

  -- Deactivate oldest active overlays if limit is reached
  update public.overlays
  set is_active = false
  where id in (
    select id
    from public.overlays
    where user_id = owner_id
      and is_active = true
      and id != overlay_id
    order by created_at asc
    limit (
      select greatest(
        count(*) - max_active_overlays + 1,
        0
      )
      from public.overlays
      where user_id = owner_id
        and is_active = true
        and id != overlay_id
    )
  );

  -- Activate the requested overlay
  update public.overlays
  set is_active = true
  where id = overlay_id
    and user_id = owner_id;
end;
$$;

/* Triggers */
-- Auto update overlay updated_at trigger
create trigger set_overlay_updated_at
before update on public.overlays for each row
execute function public.set_overlay_updated_at ();

/* Revocations */
-- Prevent updating system-managed columns
revoke
update (
  id,
  user_id,
  is_active,
  secret_hash,
  created_at,
  updated_at
) on public.overlays
from
  authenticated;

-- Prevent authenticated users from reading secret_hash
revoke
select
  (secret_hash) on public.overlays
from
  authenticated;

-- Revoke RPC execution permissions
revoke
execute on function public.activate_overlay (uuid, uuid, integer),
public.set_overlay_updated_at ()
from
  public,
  anon,
  authenticated;

/* Indexes */
-- optimize the activate_overlay function and RLS policies
create index overlays_user_active_idx on public.overlays (user_id, is_active);
