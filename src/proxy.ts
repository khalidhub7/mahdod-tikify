import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSafeRedirect } from "@/lib/validations/redirect-validation";

const protectedPages = ["/dashboard"];

const proxy = async (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl;

  // store supabase cache headers to avoid losing them during redirects
  let cacheHeaders: Record<string, string> = {};

  // prevent bad redirects
  const isAuthPage = ["/login", "/register"].includes(pathname);
  const redirectTo = searchParams.get("redirect");

  if (redirectTo && isAuthPage) {
    const shouldRemoveRedirect = !isSafeRedirect(redirectTo);

    if (shouldRemoveRedirect) {
      const url = new URL(request.url);
      url.searchParams.set("redirect", "");
      return NextResponse.redirect(url);
    }
  }

  // init the response
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // create the Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet, headers) => {
          // update the incoming request (for server.ts)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          // rebuild the response with the updated request
          response = NextResponse.next({ request });

          // update the outgoing response (for the browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          // Apply Supabase cache headers
          cacheHeaders = headers;
          Object.entries(cacheHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        },
      },
    },
  );

  // refresh the token if it's expired
  const { data, error } = await supabase.auth.getClaims();
  const isLoggedIn = !error && !!data?.claims;

  // redirect unauthenticated users away from protected pages
  const isProtectedPage = protectedPages.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  // preserve refreshed cookies on redirects
  const redirectWithCookies = (url: URL) => {
    const redirectResponse = NextResponse.redirect(url);
    // preserves refreshed authentication cookies.
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    // preserves Supabase's cache-related headers.
    // for more info check
    // https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=client-component
    // https://supabase.com/docs/guides/auth/server-side/advanced-guide
    Object.entries(cacheHeaders).forEach(([key, value]) => {
      redirectResponse.headers.set(key, value);
    });
    return redirectResponse;
  };

  if (!isLoggedIn && isProtectedPage) {
    return redirectWithCookies(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  // logged in → block auth pages → usually go home
  if (isLoggedIn && isAuthPage) {
    if (redirectTo)
      return redirectWithCookies(new URL(redirectTo, request.url));
    return redirectWithCookies(new URL("/dashboard", request.url));
  }

  // continue to the requested route
  return response;
};

// exclude static assets

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export { proxy };
