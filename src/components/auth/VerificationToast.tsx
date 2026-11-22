"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/*
shows a toast after email verification,
                    then cleans the url
separated client component bcs of
      the dashboard page is a server component
*/

const VerificationToast = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("verification-status") !== "success") return;

    /*
    id used just to prevents a duplicate toast
    from Strict Mode's double effect in dev
    */
    toast.success("Email confirmed. Welcome!", { id: "verification-success" });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("verification-status");
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router]);

  return null;
};

export { VerificationToast };
