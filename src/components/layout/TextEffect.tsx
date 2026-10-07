"use client";
import { motion, type Variants } from "motion/react";

// words are static
type TextEffectProps = { words: Array<string> };

const parentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TextEffect = ({ words }: TextEffectProps) => (
  <motion.p
    className="
    text-foreground
    text-[clamp(0.7rem,3vw,1.25rem)] leading-[clamp(1.4rem,6vw,2.5rem)]
    tracking-wide md:tracking-wider
    "
    variants={parentVariants}
    initial="hidden"
    animate="visible"
  >
    {words.map((w, idx) => (
      <motion.span className="block" key={idx} variants={childVariants}>
        {w}
      </motion.span>
    ))}
  </motion.p>
);

export { TextEffect };
