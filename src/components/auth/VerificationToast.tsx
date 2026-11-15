"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// shows a toast after email verification, then cleans the url
// separate client component: the dashboard page is a server component

const VerificationToast = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("verification-status") !== "success") return;

    // id prevents a duplicate toast from Strict Mode's double effect in dev
    toast.success("Email confirmed. Welcome!", { id: "verification-success" });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("verification-status");
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router]);

  return null;
};

export { VerificationToast };
