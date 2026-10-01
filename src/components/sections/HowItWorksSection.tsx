"use client";
import { TimeLine } from "@/components/layout/Timeline";
import { type TimeLineItemData } from "@/components/layout/Timeline";
import { Sparkles, LayoutDashboard, Link2, Radio } from "lucide-react";

const steps: Array<TimeLineItemData> = [
  {
    id: 1,
    position: "left",
    title: "Create Your Overlay",

    description:
      "Start by creating a new overlay from your dashboard. Everything begins in one place.",
    icon: Sparkles,
  },
  {
    id: 2,
    position: "right",
    title: "Customize Everything",

    description:
      "Drag, resize, style, and arrange widgets exactly how you want with the visual editor.",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    position: "left",
    title: "Copy One Browser Source",

    description:
      "Generate a single overlay URL and paste it into OBS as one Browser Source.",
    icon: Link2,
  },
  {
    id: 4,
    position: "right",
    title: "Go Live",

    description:
      "Launch your stream with all widgets synchronized, optimized, and ready to perform.",
    icon: Radio,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section space-y-10">
      <header className="section-header">
        <h3
          className="
          section-title
          text-transparent
          bg-clip-text bg-linear-to-r from-blue-500 to-purple-500
          "
        >
          How It Works
        </h3>
      </header>

      <TimeLine items={steps} />
    </section>
  );
};

export { HowItWorksSection };
