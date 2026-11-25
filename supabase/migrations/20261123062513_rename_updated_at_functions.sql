/* WIDGETS */
-- Rename function
alter function public.set_updated_at ()
rename to set_widget_updated_at;

-- Recreate trigger for the renamed function
drop trigger set_widgets_updated_at on public.widgets;

create trigger set_widgets_updated_at
before update on public.widgets for each row
execute function public.set_widget_updated_at ();

-- Revoke execution permissions for the renamed function
revoke
execute on function public.set_widget_updated_at ()
from
  public,
  anon,
  authenticated;

/* PROFILES */
alter trigger set_profile_updated_at_before_update on public.profiles
rename to set_profile_updated_at;
