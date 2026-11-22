-- create profiles table
create table public.profiles (
  -- system-managed columns
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
  -- custom columns
);

-- enable RLS
alter table public.profiles enable row level security;

-- read policy
create policy "Users can view their own profile" on public.profiles for
select
  to authenticated using (
    (
      select
        auth.uid ()
    ) = id
  );

-- update policy
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
-- auto create a profile on sign-up
create function public.create_profile_for_new_user () returns trigger language plpgsql security definer
set
  search_path = '' as $$
begin
  insert into public.profiles (id)
  values (new.id);

  return new;
end;
$$;

-- auto update updated_at
create function public.set_profile_updated_at () returns trigger language plpgsql
set
  search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

/* Triggers */
-- auto create a profile on sign-up
create trigger create_profile_after_user_signup
after insert on auth.users for each row
execute function public.create_profile_for_new_user ();

-- auto update updated_at trigger
create trigger set_profile_updated_at_before_update
before update on public.profiles for each row
execute function public.set_profile_updated_at ();

/* Revocations */
-- revoke RPC execution permissions
revoke
execute on function public.create_profile_for_new_user (),
public.set_profile_updated_at ()
from
  public,
  anon,
  authenticated;

-- prevent authenticated users from modifying system-managed columns
revoke insert (id, created_at, updated_at),
update (id, created_at, updated_at) on public.profiles
from
  authenticated;
