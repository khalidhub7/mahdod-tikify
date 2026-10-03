// eg: data
/* const items: TimeLineItemData[] = [
  { id: 1, position: "left", title: "sign up" },
  { id: 2, position: "right", title: "setup dashboard" },
  { id: 3, position: "left", title: "custom your overlay" },
  { id: 4, position: "right", title: "take browser source" },
]; */

import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { useMotionValueEvent } from "motion/react";
import { motion, useSpring, useScroll } from "motion/react";

type SeparatorProps = { className?: string };

type TimeLineItemProps = {
  position: "left" | "right";
  title: string;
  description: string;
  icon: LucideIcon;
};

type TimeLineItemData = {
  id: number;
  position: "left" | "right";
  title: string;
  description: string;
  icon: LucideIcon;
};

type TimeLineProps = { items: TimeLineItemData[] };

const Separator = ({ className = "" }: SeparatorProps) => {
  // line
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 75%"],
    trackContentSize: true, // watch content size changes
  });

  const scaleY = useSpring(0, { stiffness: 100, damping: 10 });

  useMotionValueEvent(scrollYProgress, "change", (newValue) => {
    if (newValue < scaleY.get()) return;
    scaleY.set(newValue);
  });

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="size-1 rounded ring-4 ring-fuchsia-200 mb-1"
      />

      <motion.div
        className="w-px h-28 rounded-full origin-top"
        whileInView={{ backgroundColor: "oklch(54.6% 0.245 262.881)" }}

        ref={ref}
        style={{ scaleY }}
      />
    </div>
  );
};

const TimeLineItem = ({
  position,
  title,
  description,
  icon,
}: TimeLineItemProps) => {
  const Icon = icon;
  return (
    <div
      className={cn(
        "px-3 py-1 grid justify-items-center",
        "grid-cols-[30px_1fr] md:grid-cols-[1fr_30px_1fr]",
      )}
    >
      {/* empty */}
      <div
        aria-hidden="true"
        className={cn("hidden md:block", { "md:order-3": position === "left" })}
      />

      <Separator className={cn({ "md:order-2": position === "left" })} />

      {/* card */}
      <motion.div
        className={cn(
          "p-5 w-full shadow space-y-5",
          "border-t-2 border-blue-400",
          { "md:order-1": position === "left" },

          position === "left"
            ? "md:rounded-tl-2xl md:rounded-br-2xl"
            : "md:rounded-tr-2xl md:rounded-bl-2xl",
        )}

        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 900, delay: 1 }}
      >
        <div className="flex gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Icon size={15} className="text-fuchsia-400" />
          </motion.span>
          <p>{title}</p>
        </div>

        <p className="[word-spacing:5px]">{description}</p>
      </motion.div>
    </div>
  );
};

const TimeLine = ({ items }: TimeLineProps) => {
  return (
    <ul className="max-w-xl md:max-w-6xl mx-auto">
      {items.map((c) => (
        <li key={c.id}>
          <TimeLineItem
            position={c.position}
            title={c.title}
            description={c.description}
            icon={c.icon}
          />
        </li>
      ))}
    </ul>
  );
};

export { TimeLine };
export type { TimeLineItemData };
