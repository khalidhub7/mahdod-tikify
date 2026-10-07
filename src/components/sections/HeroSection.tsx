import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TextEffect } from "../layout/TextEffect";
import { SmoothTextReveal } from "@/components/layout/SmoothTextReveal";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";

const words = [
  { text: "One", className: "" },
  { text: "Overlay.", className: "text-blue-500 dark:text-blue-400 " },
  { text: "Total", className: "" },
  { text: "Control.", className: "text-blue-500 dark:text-blue-400 " },
];

const descriptionsWords = [
  "The simplest way to add beautiful, live-updating TikTok widgets to your streams.",
  "Alerts, gifts, likes, chat, goals — all in one URL.",
  "No messy Browser Sources. No restarts.",
];

const HeroSection = () => {
  return (
    <section
      className="
      section min-h-screen
      grid grid-cols-1 lg:grid-cols-2 place-items-center
      "
    >
      {/* Left Content */}
      <div
        className="
        w-full p-5 flex flex-col
        gap-[clamp(1.4rem,6vw,4rem)] md:gap-14
        text-center md:text-left
        items-center md:items-start
        "
      >
        {/* Should render an h1 */}
        <SmoothTextReveal words={words} as="h1" />

        {/* description */}
        <TextEffect words={descriptionsWords} />

        {/* CTA Button */}
        <div
          className="
          w-full flex flex-wrap
          justify-evenly md:justify-start
          gap-[clamp(0.5rem,2vw,2rem)] md:gap-24
          "
        >
          {/* rule: internal navigation use next/link */}
          <Link
            href={"/"}
            className={cn(
              "flex justify-center items-center",
              "btn rounded-full",
              "bg-linear-to-r from-fuchsia-500 to-fuchsia-300",
              "hover:scale-90",
              "transition-transform duration-300",
            )}
          >
            Get Started
          </Link>

          <MagneticButton>
            <button
              className={cn(
                "btn rounded",
                "bg-linear-to-r from-blue-600 to-blue-300",
                "active:scale-90",
              )}
            >
              Watch 45-second demo →
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Right Content */}
      <div className="relative w-10/12 aspect-square">
        <Image
          src="/hero.png"
          alt="mhdd Tikify"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain drop-shadow-brand-drop-shadow"
        />
      </div>
    </section>
  );
};

export { HeroSection };
