"use client";

import { Layers } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

type ToolbarProps = {
  overlayId: string;
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => void;
};

export const Toolbar = ({
  overlayId,
  isDirty,
  isSaving,
  onSave,
}: ToolbarProps) => (
  /* Toolbar */
  <header
    className={`
      flex items-center justify-between border-b px-fluid-5 py-fluid-4
    `}
  >
    {/* EditorTitle */}
    <div
      className={`
        p-fluid-1 flex items-center gap-fluid-4 font-semibold
      `}
    >
      <Layers className="size-fluid-icon-lg text-pink-500" aria-hidden="true" />
      <span className="hidden sm:inline text-fluid-base">Overlay editor</span>
    </div>

    {/* OverlayId */}
    <span
      className={`
        hidden lg:block text-fluid-xs text-muted-foreground
      `}
    >
      &lt; overlay &gt; <code>{overlayId}</code>
    </span>

    {/* Settings */}
    <div className="flex items-center gap-fluid-3">
      {/* SaveButton */}
      <Button
        type="button"
        onClick={onSave}
        disabled={!isDirty || isSaving}
        className="bg-pink-500 text-white hover:bg-pink-600"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  </header>
);
