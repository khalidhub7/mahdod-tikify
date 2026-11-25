import { z } from "zod";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

import { hashOverlaySecret } from "@/lib/overlay-token-generator";
import { isValidUUID } from "@/lib/validations/redirect-validation";
import { generateOverlaySecret } from "@/lib/overlay-token-generator";

/* src/app/api/overlays/[id]/route.ts

Handle updates to sensitive overlay fields
- secret_hash   : verification, and rotation
- is_active     : toggle
*/

const patchSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("rotate-secret"),
    data: z.undefined().optional(),
  }),
  z.object({
    action: z.literal("toggle-active"),
    data: z.object({ is_active: z.boolean() }).strict(),
  }),
]);

const MAX_ACTIVE_OVERLAYS = 1;

const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  let parsed;

  // validations
  try {
    if (!isValidUUID(id)) throw new Error();
    const body = await request.json();
    parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new Error();
  } catch (error) {
    console.error("[PATCH Overlay Validation Error]:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { action, data } = parsed.data;

  // check user
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // verify overlay ownership
  const is_active = data ? data.is_active : undefined;
  const { data: overlay, error } = await admin
    .from("overlays")
    .select("id, user_id, is_active")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Overlay not found" }, { status: 404 });
  }

  // skip update if overlay is already in the requested state
  if (action === "toggle-active" && overlay.is_active === is_active) {
    return NextResponse.json(
      { message: `Overlay is already ${is_active ? "active" : "inactive"}` },
      { status: 200 },
    );
  }

  // toggle is_active
  if (action === "toggle-active") {
    try {
      if (is_active) {
        const { error } = await admin.rpc("activate_overlay", {
          overlay_id: id,
          owner_id: user.id,
          max_active_overlays: MAX_ACTIVE_OVERLAYS,
        });

        if (error) {
          if (error.message === "overlay limit reached") {
            return NextResponse.json(
              {
                error: `You've reached your active overlay limit.
                Deactivate another overlay before activating this one.`,
              },
              { status: 409 },
            );
          } else throw error;
        }
      } else {
        const { error } = await admin
          .from("overlays")
          .update({ is_active: false })
          .eq("id", id)
          .eq("user_id", user.id);
        if (error) throw error;
      }
      revalidatePath("/dashboard");
      return NextResponse.json({
        message: is_active
          ? "Overlay activated successfully."
          : "Overlay deactivated successfully.",
      });
    } catch (error) {
      console.error("[PATCH Overlay Activation Error]:", error);
      return NextResponse.json(
        { error: "Failed to update overlay status." },
        { status: 500 },
      );
    }
  }

  // rotate secret
  if (action === "rotate-secret") {
    try {
      const secret = generateOverlaySecret();
      const secret_hash = hashOverlaySecret(secret);

      const { error } = await admin
        .from("overlays")
        .update({ secret_hash })
        .eq("user_id", user.id)
        .eq("id", id);
      if (error) throw new Error();

      return NextResponse.json(
        { message: "Secret rotated successfully", secret },
        { status: 200 },
      );
    } catch (error) {
      console.error("[PATCH Overlay Secret Rotation Error]:", error);
      return NextResponse.json({ error: "Rotation failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
};

export { PATCH };
