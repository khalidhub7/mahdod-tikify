/*
 * Allowed redirects:
 * - /
 * - /dashboard
 * - /dashboard/edit/{UUID v4}
 */

const isSafeRedirect = (redirectTo: string): boolean => {
  const saferRedirects = ["/", "/dashboard"];

  return (
    saferRedirects.includes(redirectTo) ||
    /^\/dashboard\/edit\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      redirectTo,
    )
  );
};

export { isSafeRedirect };
