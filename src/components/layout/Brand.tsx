import Link from "next/link";
import { cn } from "@/lib/utils";
import { Black_Ops_One } from "next/font/google";
import ShinyText from "@/components/ui/reactbits/ShinyText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";

const blackOps = Black_Ops_One({ subsets: ["latin"], weight: "400" });


const Brand = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 rounded-full ", "p-2", className)}
    >
      <Avatar
        className="
        ring-2 ring-border ring-offset-2 ring-offset-background
        hover:scale-110 hover:ring-stone-300
        transition-transform duration-300
        "
      >
        <AvatarImage src="/tiktok-svgrepo-com.svg" alt="TK" />
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
          "hover:opacity-70",
          "text-[clamp(0.75rem,2vw,1.125rem)]",
        )}
        text="mahdod-tikify"
        speed={2}
        delay={0}
        color="#374151"
        shineColor="#e5e7eb"
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
