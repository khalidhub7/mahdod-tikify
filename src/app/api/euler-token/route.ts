import "server-only";
import { createEulerJwt } from "@/lib/euler";
import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { createClient } from "@/lib/supabase/server";

/*
https://app.com/o/overlay_123?key=YOUR_SECRET_TOKEN
*/

const POST = async (request: NextRequest) => {
  try {
    const supabase = await createClient();
    const { overlayId, key } = await request.json();

    if (
      !overlayId ||
      !key ||
      typeof overlayId !== "string" ||
      typeof key !== "string"
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // find the requested overlay
    // todo: later try to exclude the secret_hash in query
    const { data: overlay } = await supabase
      .from("overlays")
      .select("id, secret_hash, is_active, tiktok_username")
      .eq("id", overlayId)
      .single();

    if (!overlay || !overlay.secret_hash) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // hash key
    const submittedHash = createHash("sha256").update(key).digest();
    // stored hashed key
    const storedHash = Buffer.from(overlay.secret_hash, "hex");
    // compare
    if (
      storedHash.length !== submittedHash.length ||
      !timingSafeEqual(storedHash, submittedHash)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure the overlay is active and has a valid TikTok creator.
    if (!overlay.is_active || !overlay.tiktok_username) {
      return NextResponse.json(
        { error: "Overlay unavailable" },
        { status: 403 },
      );
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
