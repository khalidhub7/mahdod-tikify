"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

const CopyOverlayUrlButton = ({ slug }: { slug: string }) => {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/o/${slug}`,
      );
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (e.g. non-HTTPS); consider showing an error toast
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      className="cursor-pointer"
      onClick={handleCopy}
    >
      {copied ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}
      <span aria-live="polite">
        {copied ? "Copied" : "Copy browser source"}
      </span>
    </Button>
  );
};

export { CopyOverlayUrlButton };
