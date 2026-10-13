
import { TimeLine, type TimeLineItemData } from "@/components/layout/Timeline";

const steps: TimeLineItemData[] = [
  {
    id: 1,
    title: "Create Your Overlay",
    description:
      "Start by creating a new overlay from your dashboard. Everything begins in one place.",
  },
  {
    id: 2,
    title: "Customize Everything",
    description:
      "Drag, resize, style, and arrange widgets exactly how you want with the visual editor.",
  },
  {
    id: 3,
    title: "Copy One Browser Source",
    description:
      "Generate a single overlay URL and paste it into OBS as one Browser Source.",
  },
  {
    id: 4,
    title: "Go Live",
    description:
      "Launch your stream with all widgets synchronized, optimized, and ready to perform.",
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
