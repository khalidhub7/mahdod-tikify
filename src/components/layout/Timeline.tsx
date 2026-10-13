"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionValueEvent } from "motion/react";
import { motion, useScroll, useSpring } from "motion/react";

type TimeLineItemData = {
  id: number;
  title: string;
  description: string;
};

type TimeLineProps = { items: TimeLineItemData[] };

type TimeLineItem = {
  item: TimeLineItemData;
  index: number;
};

const TimeLineItem = ({ item, index }: TimeLineItem) => {
  const isLeft = index % 2 === 0;

  return (
    <li
      className={`
        grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_4rem_1fr]
        items-start gap-x-fluid-5
        `}
    >
      {/* Node */}
      <div
        aria-hidden
        className={`
          col-start-1 md:col-start-2
          flex justify-center items-center
          `}
      >
        <span
          className={`
            size-3 rounded-full z-20 animate-pulse
            bg-fuchsia-500 ring-2 ring-taupe-300
            `}
        />
      </div>

      {/* Card */}
      <motion.div
        className={cn(
          `
          w-full rounded-lg p-fluid-5 space-y-fluid-3
          bg-background/60 border border-border shadow
          hover:-translate-y-0.5 hover:border-fuchsia-500/40
          hover:rotate-0
          transition-all duration-300
          `,
          isLeft ? "md:col-start-1 md:-rotate-1" : "md:col-start-3 md:rotate-1",
        )}

        initial={{ opacity: 0, y: isLeft ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 600, delay: 0.2 }}
      >
        <h3
          className={`
            flex items-center gap-fluid-3 text-fluid-base font-semibold
            `}
        >
          <span
            className={`
              text-fluid-sm font-bold text-blue-500 
              `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.title}
        </h3>

        <p
          className={`
            text-fluid-sm sm:text-fluid-base leading-relaxed text-foreground/65
            `}
        >
          {item.description}
        </p>
      </motion.div>
    </li>
  );
};

const TimeLine = ({ items }: TimeLineProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });

  const scaleY = useSpring(0, { stiffness: 90, damping: 20 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > scaleY.get()) scaleY.set(v);
  });

  return (
    <ul
      ref={listRef}
      className={`
        isolate relative space-y-fluid-6
        max-w-xl md:max-w-5xl mx-auto
        `}
    >
      {/* Line */}
      <motion.div
        aria-hidden
        className={`
          origin-top
          absolute top-0 bottom-0 left-5 md:left-1/2 z-10
          w-px sm:w-0.5 -translate-x-1/2 rounded-full
          bg-zinc-300/80
          `}

        style={{ scaleY }}
      />

      {items.map((item, index) => (
        <TimeLineItem key={item.id} item={item} index={index} />
      ))}
    </ul>
  );
};

export { TimeLine };
export { type TimeLineItemData };
