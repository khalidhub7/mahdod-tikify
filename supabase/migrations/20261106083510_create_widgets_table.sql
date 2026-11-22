-- create widgets table
create table public.widgets (
  -- custom columns
  component text not null,
  x numeric not null default 0,
  y numeric not null default 0,
  w numeric not null,
  h numeric not null,
  -- system-managed columns
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid (),
  overlay_id uuid not null references public.overlays (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- enable RLS
alter table public.widgets enable row level security;

-- read policy
create policy "Users can view their widgets" on public.widgets for
select
  to authenticated using (
    user_id = (
      select
        auth.uid ()
    )
  );

-- insert policy
create policy "Users can create their widgets" on public.widgets for insert to authenticated
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

-- update policy
create policy "Users can update their widgets" on public.widgets
for update
  to authenticated using (
    user_id = (
      select
        auth.uid ()
    )
  )
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

-- delete policy
create policy "Users can delete their widgets" on public.widgets for delete to authenticated using (
  user_id = (
    select
      auth.uid ()
  )
);

/* Functions */
-- auto update updated_at
create function public.set_updated_at () returns trigger language plpgsql
set
  search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_widgets_updated_at
before update on public.widgets for each row
execute function public.set_updated_at ();

/* Revocations */
-- prevent updating System-managed columns
revoke
update (
  id,
  user_id,
  overlay_id,
  created_at,
  updated_at,
  component
) on public.widgets
from
  authenticated;

-- prevent manually insert system-managed columns
revoke insert (id, user_id, overlay_id, created_at, updated_at) on public.widgets
from
  authenticated;

-- revoke RPC execution permissions on internal functions
revoke
execute on function public.set_updated_at ()
from
  public,
  anon,
  authenticated;

/* Indexes */
create index widgets_overlay_id_idx on public.widgets (overlay_id);
