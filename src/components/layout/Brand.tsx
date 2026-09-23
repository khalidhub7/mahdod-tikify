"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Black_Ops_One } from "next/font/google";
import ShinyText from "@/components/ui/reactbits/ShinyText";
import { AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Avatar, AvatarImage } from "@/components/ui/shadcn/avatar";

const blackOps = Black_Ops_One({ subsets: ["latin"], weight: "400" });

const MotionAvatar = motion.create(Avatar);

const Brand = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-5", className)}>
      <MotionAvatar
        className="
        ring-4 ring-brand-ring ring-offset-2 ring-offset-background
        "
        whileHover={{ scale: 0.9, rotate: -20 }}
      >
        <AvatarImage src="/tiktok.svg" alt="" className="p-1" />
        <AvatarFallback>MT</AvatarFallback>
      </MotionAvatar>

      <ShinyText
        className={cn(
          blackOps.className,
          "hover:opacity-60",
          "text-[clamp(0.75rem,2vw,1.125rem)]",
        )}
        text="mahdod-tikify"
        duration={2}
        delay={0}
        color="var(--shiny-text)"
        shineColor="var(--shiny-shine)"
        spread={150}
        direction="right"
        yoyo={false}
        pauseOnHover={true}
        disabled={false}
        
      />

      
    </Link>
  );
};

export { Brand };
