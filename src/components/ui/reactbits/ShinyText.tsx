// from https://reactbits.dev/
"use client";
import { cn } from "@/lib/utils";
import { type CSSProperties } from "react";
import { useAnimationFrame } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  duration?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  gradientAngle?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
};

const ShinyText = ({
  text,
  disabled = false,
  duration = 1,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  gradientAngle = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "right",
  delay = 0,
}: ShinyTextProps) => {
  // ref
  const elapsedTimeRef = useRef<number>(0);
  const directionRef = useRef(direction === "left" ? -1 : 1);
  // state
  const [isPaused, setIsPaused] = useState(false);
  // motion value
  const progress = useMotionValue(direction === "left" ? 100 : 0);

  // assertions: duration > 0, delay >= 0
  const animationDuration = duration > 0 ? duration * 1000 : 1000;
  const delayDuration = delay >= 0 ? delay * 1000 : 0;

  // useAnimationFrame constants
  const cycleDuration = animationDuration + delayDuration;

  useAnimationFrame((_, delta) => {
    if (disabled || isPaused) return;
    elapsedTimeRef.current += delta;

    // Animation goes from 0 to 100
    if (yoyo) {
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedTimeRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        // Forward: right → 0 → 100, left → 100 → 0
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        // Wait after moving forward
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        // Reverse: 100 → 0
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        // Wait before starting again
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleTime = elapsedTimeRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        // animation phase: 0 → 100
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        // delay phase: hold at end (shine off-screen)
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  /*
  direction="left"
  progress            :   100 → 0
  backgroundPosition  :   -50% → 150%
  background image    :   RIGHT → LEFT
  */

  useEffect(() => {
    directionRef.current = direction === "left" ? -1 : 1;
    elapsedTimeRef.current = 0;
    progress.set(direction === "left" ? 100 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  // Transform: p=0 -> 150% (shine off right), p=100 -> -50% (shine off left)
  const backgroundPosition = useTransform(
    progress,
    (p) => `${150 - p * 2}% center`,
  );

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(
    ${gradientAngle}deg,
    ${color} 0%,
    ${color} 35%,
    ${shineColor} 50%,
    ${color} 65%,
    ${color} 100%
    )`,
    backgroundSize: "200% auto",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
