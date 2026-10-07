// idea from https://ui.aceternity.com/
// refactored by me

"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type Word = { text: string; className?: string };

type TypewriterEffectSmoothProps = {
  words: Word[];
  className?: string;
  cursorClassName?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p";
};

const SmoothTextReveal = ({
  words,
  className,
  cursorClassName,
  as = "div",
}: TypewriterEffectSmoothProps) => {
  const Tag = as;

  return (
    <div className={cn("flex gap-[clamp(0.25rem,1vw,0.5rem)]", className)}>
      {/* text */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "fit-content" }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "linear", delay: 1 }}
      >
        <Tag
          className="
          antialiased text-[clamp(0.8rem,5vw,2rem)] leading-[1.2]
          flex gap-[clamp(0.25rem,1.5vw,0.5rem)] font-bold overflow-hidden
          "
        >
          {words.map((word, idx) => (
            <span key={idx} className={cn("text-foreground", word.className)}>
              {word.text}
            </span>
          ))}
        </Tag>
      </motion.div>

      {/* cursor */}
      <span
        className={cn(
          "w-[clamp(0.125rem,0.5vw,0.2rem)] h-[clamp(0.96rem,6vw,2.4rem)]",
          "rounded-full bg-blue-500",
          "animate-[cursor-blink_2s_ease-in-out_infinite]",
          cursorClassName,
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export { SmoothTextReveal };
