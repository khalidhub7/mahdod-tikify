"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DropdownMenuItem } from "@/components/ui/shadcn/dropdown-menu";

type Props = { id: string };

const DeleteOverlayButton = ({ id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteOverlay = async () => {
    if (!window.confirm("Are you sure you want to delete this overlay?"))
      return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.from("overlays").delete().eq("id", id);

      if (error) throw error;

      toast.success("Overlay deleted successfully.");
      router.refresh();
    } catch {
      toast.error("Failed to delete overlay.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={loading}
      onClick={deleteOverlay}
    >
      Delete
    </DropdownMenuItem>
  );
};

export { DeleteOverlayButton };
