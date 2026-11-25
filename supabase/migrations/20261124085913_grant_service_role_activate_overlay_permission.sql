-- grant service_role permission to execute activate_overlay function
grant
execute on function public.activate_overlay (uuid, uuid, integer) to service_role;
