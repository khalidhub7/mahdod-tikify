/*
 * Allowed redirects:
 * - /
 * - /dashboard
 * - /dashboard/edit/{UUID v4}
 */
const isValidUUID = (value: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const isSafeRedirect = (redirectTo: string): boolean => {
  const saferRedirects = ["/", "/dashboard"];

  // /dashboard/edit/[id]
  const isEditPage =
    redirectTo.startsWith("/dashboard/edit/") &&
    isValidUUID(redirectTo.split("/").at(-1)!);

  return saferRedirects.includes(redirectTo) || isEditPage;
};

export { isSafeRedirect, isValidUUID };
