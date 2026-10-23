import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Play } from "lucide-react";
import { TextEffect } from "@/components/layout/TextEffect";
import { SmoothTextReveal } from "@/components/layout/SmoothTextReveal";
import { MagneticWrapper } from "@/components/ui/aceternity/magnetic-wrapper";

// data
const headline = [
  { text: "One", className: "" },
  { text: "Overlay.", className: "text-blue-500 dark:text-blue-400" },
  { text: "Total", className: "" },
  { text: "Control.", className: "text-blue-500 dark:text-blue-400" },
];

const description = [
  "The simplest way to add beautiful, live-updating TikTok widgets to your streams.",
  "Alerts, gifts, likes, chat, goals — all in one URL.",
  "No messy Browser Sources. No restarts.",
];

const trustPoints = ["Live in 2 minutes", "No install", "Free tier"];

const HeroSection = () => (
  <section
    className={`
      section min-h-dvh mt-fluid-6 md:mt-0
      grid grid-cols-1 lg:grid-cols-2 gap-fluid-6
      place-items-center
      `}
  >
    {/* left content */}
    <div
      className={`
        flex flex-col items-center lg:items-start
        gap-fluid-6
        text-center lg:text-left
        `}
    >
      {/* Compatibility badge */}
      <span
        className={`
          rounded-full border border-blue-500/30
          bg-blue-500/10
          text-blue-600 dark:text-blue-300
          flex items-center gap-fluid-1 sm:gap-fluid-3
          px-fluid-5 py-fluid-2
          text-fluid-xs sm:text-fluid-sm
          font-medium tracking-wide
          max-w-full wrap-break-word
          `}
      >
        <span className="relative shrink-0 size-fluid-3" aria-hidden>
          <span className="absolute inset-0 rounded-full animate-ping bg-blue-400" />
          <span className="block rounded-full bg-blue-500 size-fluid-3" />
        </span>
        Works with OBS, Streamlabs & TikTok Live
      </span>

      <SmoothTextReveal words={headline} as="h1" />
      <TextEffect words={description} />

      {/* CTA */}
      <div
        className={`
          mt-fluid-3
          flex flex-col items-center
          gap-fluid-4
          sm:flex-row sm:justify-center lg:justify-start
          `}
      >
        {/* next/link internal navigation */}
        <Link
          href="/"
          className={`
            btn group rounded-full text-neutral-50
            bg-linear-to-r from-fuchsia-500 to-fuchsia-400
            shadow-lg shadow-fuchsia-500/25
            transition-all duration-300
            hover:scale-[1.03] hover:shadow-fuchsia-500/40
            active:scale-95
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-fuchsia-400
            `}
        >
          Get Started Free
          <ArrowRight
            aria-hidden
            className={`
              inline-block ml-fluid-3 size-fluid-icon-lg
              group-hover:translate-x-0.5 transition-transform duration-300
              `}
          />
        </Link>

        {/* second cta */}
        <MagneticWrapper className="rounded-full">
          <button
            type="button"
            className={`
              btn rounded-full border backdrop-blur-sm
              text-foreground!
              border-foreground/20 bg-foreground/5
              hover:border-foreground/40 hover:bg-foreground/10
              active:scale-95
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-foreground/50
              transition-all duration-300
              `}
          >
            <Play
              aria-hidden
              className="inline-block fill-current mr-fluid-3 size-fluid-icon-sm"
            />
            Watch 45-sec demo
          </button>
        </MagneticWrapper>
      </div>

      {/* Reassurance row under the CTAs */}
      <ul
        className={`
          text-foreground text-fluid-xs mt-fluid-2
          px-fluid-5 py-fluid-1 rounded-full border
          flex flex-wrap items-center justify-center lg:justify-start
          gap-x-fluid-5 gap-y-fluid-2
          `}
      >
        {trustPoints.map((point) => (
          <li key={point} className="flex items-center gap-fluid-2">
            <Check
              aria-hidden
              className="shrink-0 text-blue-500 size-fluid-icon-md"
            />
            {point}
          </li>
        ))}
      </ul>
    </div>

    {/* Right: product visual with ambient glow behind it */}
    <div className="w-full flex justify-center">
      <div className="relative aspect-square w-11/12 md:w-10/12">
        <Image
          src="/hero.png"
          alt="Mhdd Tikify overlay widgets preview"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 50vw"
          className="object-contain drop-shadow-brand-drop-shadow"
        />
      </div>
    </div>
  </section>
);

export { HeroSection };
