import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

/*
/api/verify-email
*/

const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;

    const type = searchParams.get("type");
    const tokenHash = searchParams.get("token_hash");

    // validate the confirmation parameters
    if (!tokenHash || type !== "email") throw new Error();

    // Verify the token and establish the session
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "email",
    });
    if (error) throw new Error();

    // email confirmed successfully
    return NextResponse.redirect(
      new URL("/dashboard?verification-status=success", request.url),
    );
  } catch {
    return NextResponse.redirect(
      new URL("/login?verification-status=failed", request.url),
    );
  }
};

export { GET };
