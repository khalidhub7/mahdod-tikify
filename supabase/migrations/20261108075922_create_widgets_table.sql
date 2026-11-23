-- Create widgets table
create table public.widgets (
  -- Custom columns
  component text not null,
  x numeric not null default 0,
  y numeric not null default 0,
  w numeric not null,
  h numeric not null,
  -- System-managed columns
  id uuid primary key default gen_random_uuid(),
  overlay_id uuid not null references public.overlays (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.widgets enable row level security;

-- Read policy
create policy "Users can view their widgets" on public.widgets for
select
  to authenticated using (
    exists (
      select
        1
      from
        public.overlays
      where
        overlays.id = widgets.overlay_id
        and overlays.user_id = (
          select
            auth.uid ()
        )
    )
  );

-- Insert policy
create policy "Users can create their widgets" on public.widgets for insert to authenticated
with
  check (
    exists (
      select
        1
      from
        public.overlays
      where
        overlays.id = widgets.overlay_id
        and overlays.user_id = (
          select
            auth.uid ()
        )
    )
  );

-- Update policy
create policy "Users can update their widgets" on public.widgets
for update
  to authenticated using (
    exists (
      select
        1
      from
        public.overlays
      where
        overlays.id = widgets.overlay_id
        and overlays.user_id = (
          select
            auth.uid ()
        )
    )
  )
with
  check (
    exists (
      select
        1
      from
        public.overlays
      where
        overlays.id = widgets.overlay_id
        and overlays.user_id = (
          select
            auth.uid ()
        )
    )
  );

-- Delete policy
create policy "Users can delete their widgets" on public.widgets for delete to authenticated using (
  exists (
    select
      1
    from
      public.overlays
    where
      overlays.id = widgets.overlay_id
      and overlays.user_id = (
        select
          auth.uid ()
      )
  )
);

/* Functions */
-- Auto update widget updated_at function
create function public.set_updated_at () returns trigger language plpgsql
set
  search_path = '' as $$
begin
  new.updated_at = now();

  return new;
end;
$$;

/* Triggers */
-- Auto update widget updated_at trigger
create trigger set_widgets_updated_at
before update on public.widgets for each row
execute function public.set_updated_at ();

/* Revocations */
-- Prevent updating system-managed columns
revoke
update (id, overlay_id, created_at, updated_at, component) on public.widgets
from
  authenticated;

-- Prevent manually inserting system-managed columns
revoke insert (id, created_at, updated_at) on public.widgets
from
  authenticated;

-- Revoke RPC execution permissions
revoke
execute on function public.set_updated_at ()
from
  public,
  anon,
  authenticated;

/* Indexes */
-- Optimize queries filtering by overlay_id
create index widgets_overlay_id_idx on public.widgets (overlay_id);
