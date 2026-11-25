"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/shadcn/button";
import { Field, FieldGroup } from "@/components/ui/shadcn/field";
import { Dialog, DialogContent } from "@/components/ui/shadcn/dialog";
import { DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { DialogTrigger, DialogClose } from "@/components/ui/shadcn/dialog";
import { overlaySchema, OverlayInput } from "@/lib/validations/overlay.schema";
import { DialogDescription, DialogFooter } from "@/components/ui/shadcn/dialog";

const CreateOverlayDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<OverlayInput>({
    mode: "onChange",
    resolver: zodResolver(overlaySchema),
    defaultValues: { name: "", tiktok_username: "" },
  });

  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  const createOverlay = async (values: OverlayInput) => {
    try {
      const res = await fetch("/api/overlays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Overlay created successfully");
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      {/* 👈 Controlled Dialog */}
      <DialogTrigger
        render={
          <Button className="cursor-pointer">
            <Plus />
            New overlay
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(createOverlay)}>
          <DialogHeader>
            <DialogTitle>Create overlay</DialogTitle>
            <DialogDescription>
              Enter a <span className="text-pink-400">name</span> and{" "}
              <span className="text-pink-400">TikTok username</span> for your
              new overlay.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-fluid-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="tiktok_username">TikTok username</Label>
              <Input
                id="tiktok_username"
                placeholder="@username"
                {...register("tiktok_username")}
              />
              {errors.tiktok_username && (
                <p className="text-fluid-sm text-destructive">
                  {errors.tiktok_username.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              disabled={isSubmitting} /* 👈 Removed !isValid */
            >
              {isSubmitting ? "Creating..." : "Create overlay"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateOverlayDialog };
