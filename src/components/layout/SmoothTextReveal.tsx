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
    <div className={cn("flex gap-1 p-2", className)}>
      {/* text */}
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "linear", delay: 1 }}
      >
        <Tag
          className="
          antialiased text-[clamp(1rem,3.5vw,2rem)]
          font-bold max-w-full overflow-hidden
          "
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className={cn("dark:text-white text-black mr-2", word.className)}
            >
              {word.text}
            </span>
          ))}
        </Tag>
      </motion.div>

      {/* cursor */}
      <span
        className={cn(
          "w-[clamp(0.125rem,0.50vw,0.2rem)] h-[clamp(1rem,6vw,2.6rem)]",
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
