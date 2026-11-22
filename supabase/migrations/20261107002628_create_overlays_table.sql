-- create overlays table
create table public.overlays (
  -- custom columns
  name text not null,
  tiktok_username text not null,
  -- system-managed columns
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  is_active boolean not null default false,
  secret_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- enable RLS
alter table public.overlays enable row level security;

-- read policy
create policy "Users can view their own overlays" on public.overlays for
select
  to authenticated using (
    (
      select
        auth.uid ()
    ) = user_id
  );

-- update policy
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

-- delete policy
create policy "Users can delete their own overlays" on public.overlays for delete to authenticated using (
  (
    select
      auth.uid ()
  ) = user_id
);

/* Functions */
-- auto update updated_at function
create function public.set_overlay_updated_at () returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- atomically activate an overlay and deactivate the user's previous one
create function public.activate_overlay (overlay_id uuid, owner_id uuid) returns void language plpgsql security definer
set
  search_path = '' as $$
begin
  update public.overlays
  set is_active = false
  where user_id = owner_id
    and is_active = true;

  update public.overlays
  set is_active = true
  where id = overlay_id
    and user_id = owner_id;
end;
$$;

/* Triggers */
-- auto update updated_at trigger
create trigger set_overlay_updated_at_before_update
before update on public.overlays for each row
execute function public.set_overlay_updated_at ();

/* Revocations */
-- prevent updating System-managed columns
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

-- Revoke RPC execution permissions on internal functions
revoke
execute on function public.activate_overlay (),
public.set_overlay_updated_at ()
from
  public,
  anon,
  authenticated;

/* Indexes */
-- ensure each user has at most one active overlay
create unique index one_active_overlay_per_user on public.overlays (user_id)
where
  is_active = true;
