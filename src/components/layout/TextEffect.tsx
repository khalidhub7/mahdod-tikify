"use client";
import { motion, type Variants } from "motion/react";

type TextEffectProps = { words: Array<string> };

const parentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TextEffect = ({ words }: TextEffectProps) => (
  <motion.p
    className="
    text-xl text-foreground tracking-wider leading-10
    "
    variants={parentVariants}
    initial="hidden"
    animate="visible"
  >
    {words.map((w, idx) => (
      <motion.span className="inline-block" key={idx} variants={childVariants}>
        {w}
      </motion.span>
    ))}
  </motion.p>
);

export { TextEffect };
