import { createHash } from "node:crypto";
import { createEulerJwt } from "@/lib/euler";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { eulerTokenSchema } from "@/lib/validations/euler.schema";

/*
https://<YOUR_DOMAIN>/o/<OVERLAY_ID>?key=<OVERLAY_SECRET>

- isActive: Controls whether this overlay is allowed to request Euler JWTs.

TODO: rate limiter
*/

const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    // validate
    const result = eulerTokenSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { overlayId, key } = result.data;

    // create client
    const supabase = createAdminClient();

    // find the requested overlay, bypass RLS
    const submittedHash = createHash("sha256").update(key).digest("hex");
    const { data: overlay, error } = await supabase
      .from("overlays")
      .select("id, is_active, tiktok_username")
      .eq("id", overlayId)
      .eq("secret_hash", submittedHash)
      .maybeSingle();

    if (error) throw error;
    if (!overlay || !overlay.is_active) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get a short-lived Euler JWT restricted to this creator
    const jwtKey = await createEulerJwt(overlay.tiktok_username);

    return NextResponse.json(
      { jwtKey },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to issue token" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
};

export { POST };
