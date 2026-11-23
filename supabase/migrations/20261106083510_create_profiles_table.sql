-- Create profiles table
create table public.profiles (
  -- System-managed columns
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
  -- Custom columns
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Read policy
create policy "Users can view their own profile" on public.profiles for
select
  to authenticated using (
    (
      select
        auth.uid ()
    ) = id
  );

-- Update policy
create policy "Users can update their own profile" on public.profiles
for update
  to authenticated using (
    (
      select
        auth.uid ()
    ) = id
  )
with
  check (
    (
      select
        auth.uid ()
    ) = id
  );

/* Functions */
-- Auto create a profile on sign-up
create function public.create_profile_for_new_user () returns trigger language plpgsql security definer
set
  search_path = '' as $$
begin
  insert into public.profiles (id)
  values (new.id);

  return new;
end;
$$;

-- Auto update profile updated_at function
create function public.set_profile_updated_at () returns trigger language plpgsql
set
  search_path = '' as $$
begin
  new.updated_at = now();

  return new;
end;
$$;

/* Triggers */
-- Auto create a profile on sign-up
create trigger create_profile_after_user_signup
after insert on auth.users for each row
execute function public.create_profile_for_new_user ();

-- Auto update profile updated_at trigger
create trigger set_profile_updated_at_before_update
before update on public.profiles for each row
execute function public.set_profile_updated_at ();

/* Revocations */
-- Revoke RPC execution permissions
revoke
execute on function public.create_profile_for_new_user (),
public.set_profile_updated_at ()
from
  public,
  anon,
  authenticated;

-- Prevent authenticated users from modifying system-managed columns
revoke insert (id, created_at, updated_at),
update (id, created_at, updated_at) on public.profiles
from
  authenticated;
