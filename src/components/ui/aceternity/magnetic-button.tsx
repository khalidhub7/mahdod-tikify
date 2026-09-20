// from https://ui.aceternity.com/
// refactored by me
"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

type MagneticButtonProps = {
  children: ReactNode;
  strength?: number;
  maxDistance?: number;
};

export const MagneticButton = ({
  children,
  strength = 0.8,
  maxDistance = 100,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const springObj = { stiffness: 150, damping: 25, mass: 0.1 };
  // coordinates
  const motionX = useSpring(useMotionValue(0), springObj);
  const motionY = useSpring(useMotionValue(0), springObj);

  // styles
  const borderColor = useTransform([motionX, motionY], ([x, y]) =>
    x !== 0 || y !== 0 ? "oklch(62.3% 0.214 259.815)" : "transparent",
  );
  const backgroundColor = useTransform([motionX, motionY], ([x, y]) =>
    x !== 0 || y !== 0
      ? "color-mix(in srgb, oklch(62.3% 0.214 259.815) 20%, transparent)"
      : "transparent",
  );

  /* const count = useRef(0);
  count.current += 1;
  console.log("re-render", count.current); */

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let x = (clientX - (left + width / 2)) * strength;
    let y = (clientY - (top + height / 2)) * strength;

    const distance = Math.hypot(x, y);

    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      x *= scale;
      y *= scale;
    }

    motionX.set(x);
    motionY.set(y);
  };

  const handleMouseLeave = () => {
    motionX.set(0);
    motionY.set(0);
  };

  // oklch(62.3% 0.214 259.815) equiv blue-500
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
      cursor-pointer rounded border border-dashed
      "
      style={{ borderColor, backgroundColor }}
    >
      <motion.div ref={ref} style={{ x: motionX, y: motionY }}>
        {children}
      </motion.div>
    </motion.div>
  );
};
