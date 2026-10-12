import { Zap, Cpu, Sparkles } from "lucide-react";
import { RefreshCw, MousePointer2, Cloud } from "lucide-react";

// data
const features = [
  {
    id: "single-url",
    icon: Zap,
    title: "One URL, Zero Clutter",
    description:
      "Run every widget from a single overlay URL inside OBS for a cleaner setup.",
  },
  {
    id: "lightweight",
    icon: Cpu,
    title: "Featherweight Performance",
    description:
      "Save RAM and CPU by using one Browser Source instead of multiple overlays.",
  },
  {
    id: "smooth-animations",
    icon: Sparkles,
    title: "Butter-Smooth Alerts",
    description:
      "Enjoy responsive animations with no lag or stuttering when events arrive.",
  },
  {
    id: "instant-updates",
    icon: RefreshCw,
    title: "Instant Live Updates",
    description:
      "Changes appear instantly without restarting OBS or refreshing your scene.",
  },
  {
    id: "drag-drop-editor",
    icon: MousePointer2,
    title: "Visual Drag-and-Drop Editor",
    description:
      "Quickly arrange, resize, and customize widgets using an intuitive editor.",
  },
  {
    id: "cloud-sync",
    icon: Cloud,
    title: "Synced Across Devices",
    description:
      "Your layouts and settings stay backed up and synchronized across devices.",
  },
];

const WhyChooseUsSection = () => (
  <section aria-labelledby="why-choose-us-section" className="section">
    {/* header */}
    <header className="section-header">
      <h2
        id="why-choose-us-section"
        className="section-title bg-linear-to-r from-blue-500 to-purple-500"
      >
        Why Choose Us
      </h2>
    </header>

    {/* content */}
    <div className="section-content">
      {/* subtitle */}
      <p className="section-subtitle">
        Built for streamers who want power without the setup headache.
      </p>
      {/* features */}
      <ul
        className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            mx-auto max-w-6xl gap-fluid-5
            `}
      >
        {features.map(({ id, icon: Icon, title, description }) => (
          <li
            key={id}
            className={`
                flex flex-col gap-fluid-3 p-fluid-5
                rounded-md backdrop-blur-sm
                border border-border/60
                bg-foreground/2 dark:bg-foreground/5
                transition-all duration-300
                hover:-translate-y-1 hover:border-blue-500/40
                hover:shadow-md hover:shadow-blue-500/10
                `}
          >
            <div className="flex items-center gap-fluid-4">
              <Icon
                aria-hidden
                className="size-fluid-icon-lg text-blue-500/90 dark:text-blue-200"
              />

              <h3 className="wrap-break-word text-fluid-sm font-semibold ">
                {title}
              </h3>
            </div>

            <p
              className={`
                text-fluid-sm sm:text-fluid-base
                leading-relaxed text-foreground/65
                `}
            >
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export { WhyChooseUsSection };
