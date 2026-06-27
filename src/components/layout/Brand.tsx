import Link from "next/link";
import { cn } from "@/lib/utils";
import { Black_Ops_One } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const blackOps = Black_Ops_One({ subsets: ["latin"], weight: "400" });

const Brand = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 rounded-full", "p-2", className)}
    >
      <Avatar
        className="
        h-full aspect-square
        ring-2 ring-border ring-offset-2 ring-offset-background
        hover:scale-110 hover:ring-stone-300
        transition-transform duration-300
        "
      >
        <AvatarImage src="/tiktok-svgrepo-com.svg" alt="TK" />
        <AvatarFallback>MT</AvatarFallback>
      </Avatar>

      <span
        className={cn(
          blackOps.className,
          "text-blue-600 hover:opacity-70",
          "text-[clamp(0.75rem,2vw,1.125rem)]",
        )}
      >
        mahdod-tikify
      </span>
    </Link>
  );
};

export { Brand };
