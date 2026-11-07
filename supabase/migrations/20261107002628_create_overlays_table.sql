create table public.overlays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  name text not null,
  tiktok_username text not null,
  secret_hash text not null,
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- enable RLS
alter table public.overlays enable row level security;

-- read policies
create policy "Users can view their own overlays"
on public.overlays for select
to authenticated
using ( (select auth.uid()) = user_id );

-- create policies
create policy "Users can create their own overlays"
on public.overlays for insert
to authenticated
with check ( (select auth.uid()) = user_id );

-- update policies
create policy "Users can update their own overlays"
on public.overlays for update
to authenticated
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );

-- delete policies
create policy "Users can delete their own overlays"
on public.overlays for delete
to authenticated
using ( (select auth.uid()) = user_id );