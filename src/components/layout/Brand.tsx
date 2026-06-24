import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { Black_Ops_One } from "next/font/google";

const blackOps = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
});

const Brand = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar
        className="
        h-10 w-10
        ring-2 ring-border ring-offset-2 ring-offset-background
        "
      >
        <AvatarImage src="/overlay-svgrepo-com.svg" />
        <AvatarFallback>MT</AvatarFallback>
      </Avatar>

      <span
        className={cn(
          blackOps.className,
          "font-semibold tracking-tight text-blue-500",
        )}
      >
        mahdod-tikify
      </span>
    </div>
  );
};

export { Brand };
