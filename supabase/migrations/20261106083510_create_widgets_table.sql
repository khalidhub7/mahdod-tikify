create table public.widgets (
  id uuid primary key default gen_random_uuid (),
  overlay_id uuid not null references public.overlays (id) on delete cascade,
  x numeric not null default 0,
  y numeric not null default 0,
  width numeric not null,
  height numeric not null,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

-- enable RLS
alter table public.widgets enable row level security;

-- read policies
create policy "Users can view widgets for their overlays" on public.widgets for
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

-- create policies
create policy "Users can create widgets for their overlays" on public.widgets for insert to authenticated
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

-- update policies
create policy "Users can update widgets for their overlays" on public.widgets for
update to authenticated using (
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

-- delete policies
create policy "Users can delete widgets for their overlays" on public.widgets for delete to authenticated using (
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
