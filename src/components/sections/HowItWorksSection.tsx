
import { Sparkles, LayoutDashboard, Link2, Radio } from "lucide-react";
import { TimeLine, type TimeLineItemData } from "@/components/layout/Timeline";

const steps: TimeLineItemData[] = [
  {
    id: 1,
    title: "Create Your Overlay",
    description:
      "Start by creating a new overlay from your dashboard. Everything begins in one place.",
    icon: <Sparkles className="size-fluid-icon-md" />,
  },
  {
    id: 2,
    title: "Customize Everything",
    description:
      "Drag, resize, style, and arrange widgets exactly how you want with the visual editor.",
    icon: <LayoutDashboard className="size-fluid-icon-md" />,
  },
  {
    id: 3,
    title: "Copy One Browser Source",
    description:
      "Generate a single overlay URL and paste it into OBS as one Browser Source.",
    icon: <Link2 className="size-fluid-icon-md" />,
  },
  {
    id: 4,
    title: "Go Live",
    description:
      "Launch your stream with all widgets synchronized, optimized, and ready to perform.",
    icon: <Radio className="size-fluid-icon-md" />,
  },
];

const HowItWorksSection = () => (
  <section aria-labelledby="how-it-works-section" className="section">
    {/* header */}
    <header className="section-header">
      <h2
        id="how-it-works-section"
        className="section-title bg-linear-to-r from-blue-500 to-purple-500"
      >
        How It Works
      </h2>
    </header>

    {/* content */}
    <div className="section-content">
      {/* subtitle */}
      <p className="section-subtitle">
        From signup to live stream in four steps.
      </p>
      {/* TimeLine */}
      <TimeLine items={steps} />
    </div>
  </section>
);

export { HowItWorksSection };
