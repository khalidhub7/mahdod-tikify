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

type TimeLineItemProps = {
  item: TimeLineItemData;
  index: number;
};

const TimeLineItem = ({ item, index }: TimeLineItemProps) => {
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
          row-start-1
          flex justify-center bg-background z-20
          col-start-1 md:col-start-2
          `}
      >
        <span
          className={`
            size-2 rounded-full motion-safe:animate-pulse
            bg-fuchsia-500 dark:bg-fuchsia-300
            ring-2 ring-taupe-300 dark:ring-taupe-600
            `}
        />
      </div>

      {/* Card */}
      <motion.div
        className={cn(
          `
          row-start-1
          w-full rounded-lg p-fluid-5 space-y-fluid-3
          bg-background/60 border border-border shadow
          
          hover:border-fuchsia-500/40
          hover:-translate-y-1 md:hover:rotate-0
          transition-[translate,rotate,border-color] duration-500
          `,
          isLeft ? "md:col-start-1 md:-rotate-1" : "md:col-start-3 md:rotate-1",
        )}

        initial={{ opacity: 0, y: isLeft ? -20 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3
          className={`
            tracking-wide
            flex items-center gap-fluid-3 text-fluid-base font-semibold
            `}
        >
          <span
            className={`
              text-fluid-sm font-bold text-blue-500 dark:text-blue-300
              `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.title}
        </h3>

        <p
          className={`
            leading-relaxed text-foreground/65
            text-fluid-sm sm:text-fluid-base
            `}
        >
          {item.description}
        </p>
      </motion.div>
    </li>
  );
};

const TimeLine = ({ items }: TimeLineProps) => {
  // ref
  const progress = useRef(0);
  const listRef = useRef<HTMLUListElement>(null);

  // motion
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });

  const scaleY = useSpring(0, { stiffness: 90, damping: 20 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > progress.current) {
      progress.current = v;
      scaleY.set(v);
    }
  });

  return (
    <div
      className={`
        isolate relative
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
          bg-zinc-300/80 dark:bg-zinc-600/90
          `}

        style={{ scaleY }}
      />
      <ul
        ref={listRef}
        className="space-y-fluid-6"
      >
        {items.map((item, index) => (
          <TimeLineItem key={item.id} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
};

export { TimeLine };
export { type TimeLineItemData };
