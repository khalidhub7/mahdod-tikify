import Link from "next/link";
import { cn } from "@/lib/utils";
import { Black_Ops_One } from "next/font/google";
import ShinyText from "@/components/ui/reactbits/ShinyText";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";

const blackOps = Black_Ops_One({ subsets: ["latin"], weight: "400" });

const Brand = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-5", className)}>
      <Avatar
        className="
        ring-4 ring-brand-ring
        ring-offset-2 ring-offset-background
        hover:scale-105
        "
      >
        <AvatarImage src="/tiktok.svg" alt="TK" className="p-1" />
        <AvatarFallback>MT</AvatarFallback>
      </Avatar>

      {/* <span
        className={cn(
          blackOps.className,
          "bg-linear-to-r from-blue-600 via-fuchsia-500 to-fuchsia-400",
          "bg-clip-text text-transparent",
          "hover:opacity-70",
          "text-[clamp(0.75rem,2vw,1.125rem)]",
        )}
      >
        mahdod-tikify
      </span> */}

      <ShinyText
        className={cn(
          blackOps.className,
          "hover:opacity-60",
          "text-[clamp(0.75rem,2vw,1.125rem)]",
        )}
        text="mahdod-tikify"
        speed={2}
        delay={0}
        color="var(--shiny-text)"
        shineColor="var(--shiny-shine)"
        spread={150}
        direction="left"
        yoyo={false}
        pauseOnHover={false}
        disabled={false}
      />
    </Link>
  );
};

export { Brand };