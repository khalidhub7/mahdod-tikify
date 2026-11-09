create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view their own profile" 
on public.profiles for select 
to authenticated 
using ( (select auth.uid()) = id );

create policy "Users can update their own profile" 
on public.profiles for update 
to authenticated 
using ( (select auth.uid()) = id );