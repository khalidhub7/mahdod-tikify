"use client";

// components/layout/Timeline.tsx

import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";

/* ---------------------------------- Types --------------------------------- */

export type TimeLineItemData = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

type TimeLineProps = { items: TimeLineItemData[] };

/* ------------------------------ Style tokens ------------------------------ */
/* All clamps synced to 640px–960px range. Verified at endpoints. */

const cardStyles = cn(
  "w-full rounded-2xl",
  "p-[clamp(0.85rem,2vw_+_0.05rem,1.25rem)] space-y-2",
  "bg-background/60 backdrop-blur-sm border border-border/60",
  "border-l-[3px] border-l-blue-500",
  "transition-all duration-300",
  "hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
);

const nodeStyles = cn(
  "flex size-[clamp(2rem,2.5vw_+_1rem,2.5rem)] shrink-0 items-center justify-center rounded-full",
  "bg-linear-to-br from-blue-500 to-purple-500",
  "text-white shadow-md shadow-blue-500/25",
  "ring-4 ring-background"
);

const titleStyles =
  "flex items-center gap-2 text-base font-semibold";

const descriptionStyles =
  "text-sm leading-relaxed text-foreground/65";

/* ------------------------------ Sub-components ----------------------------- */

const TimeLineItem = ({
  item,
  index,
  total,
}: {
  item: TimeLineItemData;
  index: number;
  total: number;
}) => {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;
  const isLast = index === total - 1;

  return (
    <li
      className={cn(
        "relative grid grid-cols-[clamp(2.5rem,2.5vw_+_1.5rem,3rem)_1fr] items-start",
        "gap-x-[clamp(0.75rem,3.75vw_-_0.75rem,1.5rem)]",
        "md:grid-cols-[1fr_clamp(3rem,5vw_+_1rem,4rem)_1fr]",
        isLast ? "pb-0" : "pb-[clamp(1.5rem,7.5vw_-_1.5rem,3rem)]"
      )}
    >
      {/* Node */}
      <div className="col-start-1 flex justify-center md:col-start-2 md:row-start-1">
        <motion.span
          className={nodeStyles}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
          aria-hidden
        >
          <Icon className="size-[clamp(1rem,1vw_+_0.6rem,1.2rem)]" />
        </motion.span>
      </div>

      {/* Card */}
      <motion.div
        className={cn(
          cardStyles,
          "col-start-2 row-start-1",
          isLeft ? "md:col-start-1" : "md:col-start-3"
        )}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
      >
        <h3 className={titleStyles}>
          <span className="text-xs font-bold text-blue-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.title}
        </h3>
        <p className={descriptionStyles}>{item.description}</p>
      </motion.div>
    </li>
  );
};

/* -------------------------------- Component -------------------------------- */

const TimeLine = ({ items }: TimeLineProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.6"],
  });

  const scaleY = useSpring(0, { stiffness: 90, damping: 20 });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > scaleY.get()) scaleY.set(v);
  });

  const lineClass = cn(
    "absolute top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full",
    "left-[clamp(1.25rem,1.25vw_+_0.75rem,1.5rem)] md:left-1/2"
  );

  return (
    <ul ref={listRef} className="relative mx-auto max-w-xl md:max-w-5xl">
      <div aria-hidden className={cn(lineClass, "bg-border/60")} />
      <motion.div
        aria-hidden
        className={cn(
          lineClass,
          "origin-top bg-linear-to-b from-blue-500 to-purple-500"
        )}
        style={{ scaleY }}
      />

      {items.map((item, index) => (
        <TimeLineItem
          key={item.id}
          item={item}
          index={index}
          total={items.length}
        />
      ))}
    </ul>
  );
};

export { TimeLine };