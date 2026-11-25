"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { Switch } from "@/components/ui/shadcn/switch";

type ToggleOverlaySwitchProps = {
  id: string;
  initialActive: boolean;
};

const ToggleOverlaySwitch = ({
  id,
  initialActive,
}: ToggleOverlaySwitchProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useOptimistic(initialActive);

  const toggleActive = (checked: boolean) => {
    startTransition(async () => {
      setIsActive(checked);

      try {
        const res = await fetch(`/api/overlays/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "toggle-active",
            data: { is_active: checked },
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        toast.success(data.message);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      }
    });
  };

  return (
    <Switch
      checked={isActive}
      onCheckedChange={toggleActive}
      disabled={isPending}
      className="cursor-pointer"
    />
  );
};

export { ToggleOverlaySwitch };
