-- grant service_role full CRUD permissions on overlays
grant
select
,
  insert,
update,
delete on table public.overlays to service_role;
