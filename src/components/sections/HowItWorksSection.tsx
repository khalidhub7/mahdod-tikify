"use client";
// sections/HowItWorksSection.tsx

import { TimeLine, type TimeLineItemData } from "@/components/layout/Timeline";
import { Sparkles, LayoutDashboard, Link2, Radio } from "lucide-react";

const steps: TimeLineItemData[] = [
  {
    id: 1,
    title: "Create Your Overlay",
    description:
      "Start by creating a new overlay from your dashboard. Everything begins in one place.",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Customize Everything",
    description:
      "Drag, resize, style, and arrange widgets exactly how you want with the visual editor.",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    title: "Copy One Browser Source",
    description:
      "Generate a single overlay URL and paste it into OBS as one Browser Source.",
    icon: Link2,
  },
  {
    id: 4,
    title: "Go Live",
    description:
      "Launch your stream with all widgets synchronized, optimized, and ready to perform.",
    icon: Radio,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section space-y-[clamp(1rem,7.5vw_-_2rem,2.5rem)]">
      <div className="section-header flex flex-col items-center text-center">
        <header>
          <h2 className="section-title text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
            How It Works
          </h2>
        </header>
        <p className="section-subtitle mt-2 text-foreground/60">
          From signup to live stream in four steps.
        </p>
      </div>

      <TimeLine items={steps} />
    </section>
  );
};

export { HowItWorksSection };