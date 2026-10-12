"use client";
import { cn } from "@/lib/utils";
import { useRef, ReactNode } from "react";
import { useMotionValueEvent } from "motion/react";
import { motion, useScroll, useSpring } from "motion/react";

type TimeLineItemData = {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
};

type TimeLineProps = { items: TimeLineItemData[] };

type TimeLineItem = {
  item: TimeLineItemData;
  index: number;
  total: number;
};

const TimeLineItem = ({ item, index, total }: TimeLineItem) => {
  const isLeft = index % 2 === 0;
  const isLast = index === total - 1;

  return (
    <li
      className={cn(
        "relative",
        "grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_4rem_1fr]",
        "items-start gap-x-fluid-5",
        isLast ? "pb-0" : "pb-fluid-6",
      )}
    >
      {/* Node */}
      <div
        className="
        border border-black
        col-start-1 md:col-start-2
        flex justify-center items-center
        "
      >
        <span
          aria-hidden
          className={`
            
            size-5 sm:size-8 rounded-full text-white
            ring-4 ring-background
            flex shrink-0 items-center justify-center
            bg-linear-to-br from-blue-500 to-purple-500
            
            `}
        >
          {item.icon}
        </span>
      </div>

      {/* Card */}
      <motion.div
        className={cn(
          `
          w-full rounded-2xl
          p-fluid-5 space-y-fluid-3
          bg-background/60 backdrop-blur-sm border border-border/60
          border-l-[3px] border-l-blue-500
          transition-all duration-300
          hover:-translate-y-0.5 hover:border-blue-500/40
          hover:shadow-lg hover:shadow-blue-500/10
          col-start-2 row-start-1
          `,
          isLeft ? "md:col-start-1" : "md:col-start-3",
        )}

        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          delay: 0.05,
        }}
      >
        <h3 className="flex items-center gap-fluid-3 text-fluid-base font-semibold">
          <span className="text-fluid-sm font-bold text-blue-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.title}
        </h3>
        <p className="text-fluid-sm leading-relaxed text-foreground/65">
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
    offset: ["start 0.75", "end 0.6"],
  });

  const scaleY = useSpring(0, { stiffness: 90, damping: 20 });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > scaleY.get()) scaleY.set(v);
  });

  const lineClass = cn(
    "absolute top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full",
    "left-5 md:left-1/2",
  );

  return (
    <ul ref={listRef} className="relative mx-auto max-w-xl md:max-w-5xl">
      <div aria-hidden className={cn(lineClass, "bg-border/60")} />

      <motion.div
        aria-hidden
        className={cn(
          lineClass,
          "origin-top bg-linear-to-b from-blue-500 to-purple-500",
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
export { type TimeLineItemData };
