-- Add ratio column
alter table public.overlays
add column ratio text not null default '16/9';

-- Allow authenticated users to read ratio
grant
select
  (ratio) on public.overlays to authenticated;

-- Allow authenticated users to update ratio
grant
update (ratio) on public.overlays to authenticated;
