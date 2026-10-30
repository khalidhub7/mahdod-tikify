import "server-only";
// import { db } from "@/lib/db";
import { createEulerJwt } from "@/lib/euler";
import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

/*
https://app.com/o/overlay_123?key=YOUR_SECRET_TOKEN
*/

const POST = async (request: NextRequest) => {
  try {
    const { overlayId, key } = await request.json();

    if (typeof overlayId !== "string" || typeof key !== "string" || !key) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Find the requested overlay and its owner.
    const overlay = await db.overlay.findUnique({
      where: { id: overlayId },
      include: { user: true },
    });

    if (!overlay || !overlay.user.request_token_hash) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Hash the supplied secret and compare it safely.
    const suppliedHash = createHash("sha256").update(key).digest();
    const storedHash = Buffer.from(overlay.user.request_token_hash, "hex");

    if (
      storedHash.length !== suppliedHash.length ||
      !timingSafeEqual(storedHash, suppliedHash)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure the overlay is active and has a valid TikTok creator.
    if (!overlay.isActive || !overlay.tiktokUniqueId) {
      return NextResponse.json(
        { error: "Overlay unavailable" },
        { status: 403 },
      );
    }

    // Issue a short-lived Euler JWT restricted to this creator.
    const jwtKey = await createEulerJwt(overlay.tiktokUniqueId);

    return NextResponse.json(
      { jwtKey },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to issue token" },
      { status: 500 },
    );
  }
};

export { POST };
