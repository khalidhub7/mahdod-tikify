"use client";

import { useRef, type ElementType } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Link2,
  Radio,
  ArrowRight,
} from "lucide-react";
import { motion, useScroll, useSpring, type Variants } from "motion/react";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

const steps: Step[] = [
  {
    id: "01",
    title: "Create Your Overlay",
    description:
      "Start by creating a new overlay from your dashboard. Everything begins in one place.",
    icon: Sparkles,
  },
  {
    id: "02",
    title: "Customize Everything",
    description:
      "Drag, resize, style, and arrange widgets exactly how you want with the visual editor.",
    icon: LayoutDashboard,
  },
  {
    id: "03",
    title: "Copy One Browser Source",
    description:
      "Generate a single overlay URL and paste it into OBS as one Browser Source.",
    icon: Link2,
  },
  {
    id: "04",
    title: "Go Live",
    description:
      "Launch your stream with all widgets synchronized, optimized, and ready to perform.",
    icon: Radio,
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1, type: "spring", stiffness: 300, damping: 20 },
  },
};

const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { delay: 0.15, duration: 0.35, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -20 : 20,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2, duration: 0.4, ease: "easeOut" },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const StepCard = ({ step, align }: { step: Step; align: "left" | "right" }) => {
  const Icon = step.icon;
  const rightAligned = align === "right";

  // Chamfered corner clip-path (12px cut)
  const clipPath =
    "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)";

  return (
    <div className={`group relative ${rightAligned ? "lg:text-right" : ""}`}>
      {/* Outer wrapper with clip-path for the border */}
      <div className="relative" style={{ clipPath }}>
        {/* Border Background */}
        <div className="absolute inset-0 bg-border transition-colors duration-300 group-hover:bg-blue-500/30" />

        {/* Inner Content (m-[1px] creates the 1px border effect) */}
        <div className="relative m-[1px] bg-card p-4 transition-all duration-300 group-hover:bg-card/90">
          {/* Top Accent */}
          <div
            className={`absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-500 group-hover:scale-x-100 ${
              rightAligned ? "lg:origin-right" : ""
            }`}
          />

          <span className="mb-3 block text-[10px] font-semibold tracking-widest text-blue-600">
            STEP {step.id}
          </span>

          <div
            className={`mb-3 flex size-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 ${
              rightAligned ? "lg:ml-auto" : ""
            }`}
          >
            <Icon className="size-5 text-blue-600" />
          </div>

          <h3 className="text-base font-semibold text-foreground">
            {step.title}
          </h3>
          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 45%"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-10 lg:py-14">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-10 max-w-2xl text-center lg:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1">
            <Sparkles className="size-3 text-blue-600" />
            <span className="text-[11px] font-medium text-blue-600">
              How It Works
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            From Dashboard
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              to Live Stream
            </span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Set up your complete streaming overlay in just a few simple steps.
            No downloads, no complicated setup, and only one Browser Source.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* Animated center line with glow */}
          <div className="absolute left-[15px] top-0 h-full w-px lg:left-[calc(50%-0.5px)]">
            {/* Soft Glow */}
            <motion.div
              aria-hidden
              style={{ scaleY: lineProgress }}
              className="absolute inset-0 -left-[2.5px] w-[6px] origin-top bg-blue-500/20 blur-md"
            />
            {/* Core Line */}
            <motion.div
              aria-hidden
              style={{ scaleY: lineProgress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-transparent via-blue-500/60 to-cyan-500/40"
            />
          </div>

          <ol className="relative space-y-6 lg:space-y-8">
            {steps.map((step, index) => {
              const side: "left" | "right" = index % 2 === 0 ? "right" : "left";
              const isRight = side === "right";

              return (
                <motion.li
                  key={step.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative"
                >
                  {/* Node / Dot */}
                  <div className="absolute left-[15px] top-5 z-10 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2">
                    <motion.div
                      variants={dotVariants}
                      className="grid size-7 place-items-center rounded-full border border-blue-500/30 bg-background shadow-sm"
                    >
                      <span className="size-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                    </motion.div>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_5rem_1fr] lg:items-center">
                    {isRight ? (
                      <>
                        <div className="hidden lg:col-start-1 lg:row-start-1" />
                        <motion.div
                          custom={side}
                          variants={cardVariants}
                          className="ml-9 lg:col-start-3 lg:row-start-1 lg:ml-0"
                        >
                          <div className="relative">
                            {/* Connector */}
                            <motion.div
                              aria-hidden
                              variants={connectorVariants}
                              className="absolute top-1/2 -left-[2.25rem] hidden h-px w-[2.25rem] origin-right bg-gradient-to-l from-blue-500/40 to-transparent lg:block -translate-y-1/2"
                            />
                            <StepCard step={step} align="left" />
                          </div>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          custom={side}
                          variants={cardVariants}
                          className="ml-9 lg:col-start-1 lg:row-start-1 lg:ml-0"
                        >
                          <div className="relative">
                            {/* Connector */}
                            <motion.div
                              aria-hidden
                              variants={connectorVariants}
                              className="absolute top-1/2 -right-[2.25rem] hidden h-px w-[2.25rem] origin-left bg-gradient-to-r from-blue-500/40 to-transparent lg:block -translate-y-1/2"
                            />
                            <StepCard step={step} align="right" />
                          </div>
                        </motion.div>
                        <div className="hidden lg:col-start-3 lg:row-start-1" />
                      </>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 text-center lg:mt-12"
        >
          <p className="text-xs text-muted-foreground">
            Ready to build your first overlay?
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Get Started
            <ArrowRight className="size-3" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export { HowItWorksSection };
