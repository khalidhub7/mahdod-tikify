import Image from "next/image";
import Link from "next/link";
import { TextEffect } from "../layout/TextEffect";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";
import { SmoothTextReveal } from "@/components/layout/SmoothTextReveal";

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
      grid grid-cols-1 gap-10

      lg:grid-cols-2 lg:gap-24
      place-items-center
      "
    >
      {/* Left Content */}
      <div
        className="
        p-5 flex flex-col flex-wrap
        items-center gap-y-8 text-center
        md:items-start md:gap-y-10 md:text-left
        "
      >
        {/* Should render an h1 */}
        <SmoothTextReveal words={words} as="h1" />

        {/* description */}
        <TextEffect words={descriptionsWords} />

        {/* CTA Button */}
        <div
          className="
          w-full py-5
          flex flex-wrap items-start justify-around
          md:justify-start md:gap-20
          "
        >
          {/* rule: internal navigation use next/link */}
          <Link
            href={"/"}
            className="
            px-11 py-3 font-bold
            flex justify-center items-center
            text-olive-50 tracking-wide rounded-full cursor-pointer
            bg-linear-to-r from-fuchsia-500 to-fuchsia-300
            hover:shadow-brand-btn-shadow hover:scale-90
            transition-transform duration-200 transform-gpu
            "
          >
            Get Started
          </Link>

          <MagneticButton>
            <button
              className="
              px-6 py-3
              text-olive-50 tracking-wide rounded cursor-pointer
              bg-linear-to-r from-blue-600 to-blue-200
              active:scale-90 hover:shadow-brand-btn-shadow
              transition-transform duration-400 transform-gpu
              "
            >
              Watch 45-second demo →
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Right Content */}
      {/* <div className="relative w-full h-120 md:h-140"> */}
      <div className="relative w-full h-120 md:h-140">
        <Image
          src="/hero.png"
          alt="mhdd Tikify"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 45vw"
          className=" object-contain drop-shadow-brand-drop-shadow"
        />
      </div>
    </section>
  );
};

export { HeroSection };
