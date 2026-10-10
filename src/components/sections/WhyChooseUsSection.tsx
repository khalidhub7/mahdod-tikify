import { Zap, Cpu, Sparkles, RefreshCw, MousePointer2, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Data ---------------------------------- */

const features = [
  { id: "single-url", icon: Zap, title: "One URL, Zero Clutter",
    description: "Run every widget from a single overlay URL inside OBS for a cleaner setup." },
  { id: "lightweight", icon: Cpu, title: "Featherweight Performance",
    description: "Save RAM and CPU by using one Browser Source instead of multiple overlays." },
  { id: "smooth-animations", icon: Sparkles, title: "Butter-Smooth Alerts",
    description: "Enjoy responsive animations with no lag or stuttering when events arrive." },
  { id: "instant-updates", icon: RefreshCw, title: "Instant Live Updates",
    description: "Changes appear instantly without restarting OBS or refreshing your scene." },
  { id: "drag-drop-editor", icon: MousePointer2, title: "Visual Drag-and-Drop Editor",
    description: "Quickly arrange, resize, and customize widgets using an intuitive editor." },
  { id: "cloud-sync", icon: Cloud, title: "Synced Across Devices",
    description: "Your layouts and settings stay backed up and synchronized across devices." },
];

/* ------------------------------ Style tokens ------------------------------ */
/* Slopes verified to hit min @640px and max @960px.
   Floors lowered to survive 200px viewports. */

const gridStyles = cn(
  "mx-auto grid max-w-6xl grid-cols-1",
  "gap-[clamp(0.5rem,2.5vw_-_0.25rem,1.25rem)]",
  "px-[clamp(0.5rem,7.5vw_-_2rem,2.5rem)]",
  "sm:grid-cols-2 lg:grid-cols-3"
);

const cardStyles = cn(
  "group relative flex min-w-0 flex-col gap-2",
  "rounded-2xl p-[clamp(0.75rem,2.5vw,1.5rem)]",
  "bg-background/60 backdrop-blur-sm",
  "border border-border/60",
  "transition-all duration-300",
  "hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
);

const iconWrapperStyles = cn(
  "flex size-[clamp(2rem,2.5vw_+_1.25rem,2.75rem)] shrink-0 items-center justify-center rounded-xl",
  "bg-linear-to-br from-blue-500/15 to-purple-500/15",
  "ring-1 ring-blue-500/20",
  "transition-transform duration-300 group-hover:scale-110"
);

const iconStyles =
  "size-[clamp(1rem,1.25vw_+_0.6rem,1.35rem)] text-blue-500";

/* ------------------------------ Sub-components ----------------------------- */

const SectionHeader = () => (
  <div className="section-header flex flex-col items-center text-center">
    <header>
      <h2 className="section-title text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
        Why Choose Us
      </h2>
    </header>
    <p className="section-subtitle mt-2 text-foreground/60">
      Built for streamers who want power without the setup headache.
    </p>
  </div>
);

interface FeatureCardProps {
  feature: (typeof features)[number];
}

const FeatureCard = ({ feature }: FeatureCardProps) => (
  <li className={cardStyles}>
    <div className="flex items-center gap-2 sm:gap-3">
      <div className={iconWrapperStyles}>
        <feature.icon aria-hidden className={iconStyles} />
      </div>
      <h3 className="min-w-0 break-words text-sm font-semibold sm:text-base">
        {feature.title}
      </h3>
    </div>
    <p className="text-sm leading-relaxed text-foreground/65">
      {feature.description}
    </p>
  </li>
);

/* -------------------------------- Component -------------------------------- */

const WhyChooseUsSection = () => (
  <section className="section">
    <SectionHeader />
    <ul className={gridStyles}>
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </ul>
  </section>
);

export { WhyChooseUsSection };