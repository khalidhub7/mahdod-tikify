/* Imports */
import Image from "next/image";
import { TextEffect } from "@/components/ui/motion-primitives/text-effect";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";
import { TypewriterEffectSmooth } from "@/components/ui/aceternity/typewriter-effect";

export default function Home() {
  const words = [
    { text: "One" },
    { text: "Overlay.", className: "text-blue-500" },
    { text: "Total" },
    { text: "Control.", className: "text-blue-500" },
  ];

  return (
    <>
      <section
        className="
        grid grid-cols-1 md:grid-cols-2
        max-w-7xl mx-auto gap-12 md:gap-20
        px-4 md:px-8 pt-8 md:pt-16 pb-16 md:pb-24
        place-items-center
        "
      >
        {/* Left Content */}
        <div
          className="
          flex flex-col self-start
          items-center md:items-start gap-8 md:gap-16
          text-center md:text-left
          max-w-xl mx-auto md:mx-0
          "
        >
          {/* Should render an h1 */}
          <TypewriterEffectSmooth words={words} className="w-fit" />

          <TextEffect
            as="p"
            per="line"
            segmentWrapperClassName="overflow-hidden block"
            className="
            text-lg md:text-xl leading-8 text-chart-3
            "
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              },
              item: {
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              },
            }}
          >
            {`The simplest way to add beautiful, live-updating TikTok widgets to your streams.
Alerts, gifts, likes, chat, goals — all in one URL.
No messy Browser Sources. No restarts.`}
          </TextEffect>

          {/* CTA Button */}
          <div
            className="
            w-full flex justify-around
            md:justify-start md:gap-20
            "
          >
            <button
              className="
              rounded-lg px-10 py-3 font-medium
              text-background cursor-pointer
              bg-linear-to-r from-brand-2 to-brand-5
              shadow-lg
              hover:-translate-y-1 hover:shadow-xl
              ring-1 ring-offset-2 ring-brand-ring-strong
              transition-transform duration-300
              "
            >
              Get Started
            </button>

            <MagneticButton>
              <button
                className="
                rounded-lg cursor-pointer px-6 py-3
                font-medium text-background
                bg-linear-to-l from-brand-3 to-brand-4
                active:scale-90 hover:shadow-lg
                transition-transform duration-200
                ring-1 ring-offset-2 ring-brand-ring-strong
                "
              >
                Watch 45-second demo →
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Right Content */}
        <div
          className="
          relative w-full h-120 md:h-140
          "
        >
          <Image
            src="/hero.png"
            alt="mhdd Tikify"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="
            object-contain
            drop-shadow-[0_40px_80px_rgba(37,99,235,0.25)]
            "
          />
        </div>
      </section>

      

      {/* Content Section */}
      {/* Actions Section */}
    </>
  );
}
