/*
someone told me
"current version follows the KISS principle well hhh"
KISS = Keep It Simple, Stupid
*/

import { cn } from "@/lib/utils";
import { type CSSProperties } from "react";

type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  duration?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  gradientAngle?: number;
  yoyo?: boolean;
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
  direction = "right",
  delay = 0,
}: ShinyTextProps) => {
  const animationDuration = duration > 0 ? duration : 1;
  const delayDuration = delay >= 0 ? delay : 0;
  const startPosition = direction === "right" ? "150% center" : "-50% center";

  const animationDirection = yoyo
    ? direction === "right"
      ? "alternate"
      : "alternate-reverse"
    : direction === "right"
      ? "normal"
      : "reverse";

  const style: CSSProperties = {
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
    // willChange: "background-position", // no real benefit
    backgroundPosition: startPosition, // needed in disabled state
    animationName: disabled ? "none" : "shiny-sweep",
    animationDuration: `${animationDuration}s`,
    animationDelay: `${delayDuration}s`,
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDirection,
    // animationPlayState: "running", // default
  };

  return (
    <span className={cn("inline-block", className)} style={style}>
      {text}
    </span>
  );
};

export default ShinyText;
