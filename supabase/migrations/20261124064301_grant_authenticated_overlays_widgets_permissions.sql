/* OVERLAYS GRANTS */
-- allow users to read specific columns (excluding secret_hash)
grant
select
  (
    id,
    name,
    tiktok_username,
    user_id,
    is_active,
    created_at,
    updated_at
  ) on public.overlays to authenticated;

-- allow users to update permitted columns only
grant
update (name, tiktok_username) on public.overlays to authenticated;

-- allow authenticated users to delete overlays
grant delete on public.overlays to authenticated;

/* WIDGETS GRANTS */
-- allow authenticated users to read widget columns
grant
select
  (
    id,
    overlay_id,
    component,
    x,
    y,
    w,
    h,
    created_at,
    updated_at
  ) on public.widgets to authenticated;

-- allow authenticated users to insert permitted columns
grant insert (overlay_id, component, x, y, w, h) on public.widgets to authenticated;

-- allow authenticated users to update permitted columns
grant
update (x, y, w, h) on public.widgets to authenticated;

-- allow authenticated users to delete widgets
grant delete on public.widgets to authenticated;
