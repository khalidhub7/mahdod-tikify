// from https://ui.aceternity.com/
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
        transition={{ duration: 3, ease: "linear", delay: 1 }}
      >
        <Tag className="text-3xl lg:text-4xl font-bold whitespace-nowrap">
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
      <motion.span
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "rounded-full w-1 h-10 lg:h-12 bg-blue-500",
          cursorClassName,
        )}
      />
    </div>
  );
};

export { SmoothTextReveal };
