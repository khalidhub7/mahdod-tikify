import { Editor } from "@/components/dashboard/editor/Editor";
import { createClient } from "@/lib/supabase/server";

const metadata = {
  title: "Edit overlay",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

const EditOverlay = async ({ params }: Props) => {
  const { id } = await params;

  const supabase = await createClient();

  // Get overlay
  const { data: overlay, error } = await supabase
    .from("overlays")
    .select(
      "id, name, tiktok_username, user_id, is_active, ratio, created_at, updated_at",
    )
    .eq("id", id)
    .single();

  // Get overlay widgets
  const { data: initialWidgets, error: widgetsError } = await supabase
    .from("widgets")
    .select("id, overlay_id, widget_type, x, y, w, h")
    .eq("overlay_id", id);

  if (!overlay) {
    throw new Error("overlay not found");
  }

  return <Editor overlay={overlay} initialWidgets={initialWidgets ?? []} />;
};

export { metadata };
export default EditOverlay;
