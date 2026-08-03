"use client";

import {
  Zap,
  Monitor,
  Cpu,
  Gauge,
  RefreshCw,
  Layout,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface Feature {
  id: number;
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    id: 1,
    title: "One Browser Source",
    description:
      "Run every widget from a single overlay URL inside OBS for a cleaner setup.",
    badge: "Simpler Setup",
    icon: Monitor,
  },
  {
    id: 2,
    title: "Lower Resource Usage",
    description:
      "Save RAM and CPU by using one Browser Source instead of multiple overlays.",
    badge: "Efficient",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Smooth Performance",
    description:
      "Enjoy responsive animations with no lag or stuttering when events arrive.",
    badge: "Fast",
    icon: Gauge,
  },
  {
    id: 4,
    title: "Real-Time Updates",
    description:
      "Changes appear instantly without restarting OBS or refreshing your scene.",
    badge: "Instant",
    icon: RefreshCw,
  },
  {
    id: 5,
    title: "Drag & Drop Dashboard",
    description:
      "Quickly arrange, resize, and customize widgets using an intuitive editor.",
    badge: "Flexible",
    icon: Layout,
  },
  {
    id: 6,
    title: "Cloud Sync",
    description:
      "Your layouts and settings stay backed up and synchronized across devices.",
    badge: "Synced",
    icon: Cloud,
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

// Chamfered corner clip-path (10px cut)
const clipPath =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative"
    >
      {/* Outer wrapper with clip-path for the border */}
      <div className="relative" style={{ clipPath }}>
        {/* Border Background */}
        <div className="absolute inset-0 bg-border transition-colors duration-300 group-hover:bg-blue-500/30" />

        {/* Inner Content (m-[1px] creates the 1px border effect) */}
        <div className="relative m-[1px] bg-card p-4 transition-all duration-300 group-hover:bg-card/90">
          {/* Top Accent */}
          <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-500 group-hover:scale-x-100" />

          {/* Icon */}
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
            <feature.icon className="size-5 text-blue-600" />
          </div>

          {/* Content */}
          <h3 className="text-base font-semibold text-foreground">
            {feature.title}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {feature.description}
          </p>

          {/* Badge */}
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors group-hover:border-blue-500/20 group-hover:bg-blue-500/10 group-hover:text-blue-600">
              {feature.badge}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUsSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-10 lg:py-14">
      {/* Background Glow */}
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
            <Zap className="size-3 text-blue-600" />
            <span className="text-[11px] font-medium text-blue-600">
              Why Streamers Choose Us
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Everything You Need,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Without the Complexity
            </span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Built for creators who value speed, reliability, and an effortless
            streaming experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { WhyChooseUsSection };
