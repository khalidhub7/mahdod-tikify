import { z } from "zod";
import { createEulerJwt } from "@/lib/euler";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashOverlaySecret } from "@/lib/overlay-token-generator";

const eulerTokenSchema = z.object({
  overlay_id: z.uuid(),
  secret: z.string().length(43),
});

/*
passwordless route

eg: https://<YOUR_DOMAIN>/o/<OVERLAY_ID>?secret=<OVERLAY_SECRET>

- is_active:
  Controls whether this overlay is allowed to request Euler JWTs
  maybe related with max active overlays per user or subscriptions

TODO: rate limiter
*/

const POST = async (request: NextRequest) => {
  try {
    // validate
    let parsed;
    try {
      const body = await request.json();
      parsed = eulerTokenSchema.safeParse(body);
      if (!parsed.success) throw new Error();
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { overlay_id, secret } = parsed.data;

    // create client
    const supabase = createAdminClient();

    // find the requested overlay, bypass RLS
    const submittedHash = hashOverlaySecret(secret);
    const { data: overlay, error } = await supabase
      .from("overlays")
      .select("id, is_active, tiktok_username")
      .eq("id", overlay_id)
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
