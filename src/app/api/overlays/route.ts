import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashOverlaySecret } from "@/lib/overlay-token-generator";
import { generateOverlaySecret } from "@/lib/overlay-token-generator";

/* src/app/api/overlays/route.ts
Handle updates to sensitive overlay fields
- create overlay and handle sensitive fields separately */

const overlaySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(50),
    tiktok_username: z
      .string()
      .trim()
      .min(1, "TikTok username is required")
      .max(50),
  })
  .strict();

// POST: create an overlay
const POST = async (request: Request) => {
  // extract data from request

  let parsed;

  try {
    const body = await request.json();
    parsed = overlaySchema.safeParse(body);
  } catch (error) {
    console.error("[Overlay Validation Error]:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  // check user
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, tiktok_username } = parsed.data;

  // generate a secure token
  const secret = generateOverlaySecret();

  // store only the hash
  const secret_hash = hashOverlaySecret(secret);

  const admin = createAdminClient();

  const { data, error } = await admin
    .from("overlays")
    .insert({
      user_id: user.id,
      name,
      tiktok_username,
      secret_hash,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[Overlay Creation Error]:", error);
    return NextResponse.json(
      { error: "Failed to create overlay" },
      { status: 500 },
    );
  }

  // success
  return NextResponse.json(
    { message: "Overlay created successfully", overlayId: data.id },
    { status: 201 },
  );
};

export { POST };
