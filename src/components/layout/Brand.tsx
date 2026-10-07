"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Black_Ops_One } from "next/font/google";
import ShinyText from "@/components/layout/ShinyText";
import { AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Avatar, AvatarImage } from "@/components/ui/shadcn/avatar";

const blackOps = Black_Ops_One({ subsets: ["latin"], weight: "400" });

const MotionAvatar = motion.create(Avatar);

const Brand = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-[clamp(0.5rem,2.5vw,1.25rem)]",
        className,
      )}
    >
      <MotionAvatar
        className="
        size-[clamp(1.5rem,4vw,2rem)]
        ring-[clamp(0.125rem,1vw,0.25rem)] ring-brand-ring
        ring-offset-[clamp(0.0625rem,0.5vw,0.125rem)] ring-offset-background
        "
        whileHover={{ scale: 0.9, rotate: -20 }}
      >
        <AvatarImage
          src="/tiktok.svg"
          alt=""
          className="p-[clamp(0.125rem,0.75vw,0.25rem)]"
        />
        <AvatarFallback>MT</AvatarFallback>
      </MotionAvatar>

      <ShinyText
        className={cn(
          blackOps.className,
          "hover:opacity-60",
          "text-[clamp(0.8rem,2.5vw,1.2rem)]",
        )}
        text="mahdod-tikify"
        duration={2}
        delay={0}
        color="var(--shiny-text)"
        shineColor="var(--shiny-shine)"
        gradientAngle={140}
        direction="right"
        yoyo={false}
        disabled={false}
      />
    </Link>
  );
};

export { Brand };
