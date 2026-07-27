/* Imports */
import Image from "next/image";
import { TextEffect } from "@/components/ui/motion-primitives/text-effect";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";
import { TypewriterEffectSmooth } from "@/components/ui/aceternity/typewriter-effect";

export default function Home() {
  const words = [
    { text: "One",  className: "font-mono" },
    { text: "Overlay.", className: "text-blue-500 dark:text-blue-400 font-mono" },
    { text: "Total",  className: "font-mono" },
    { text: "Control.", className: "text-blue-500 dark:text-blue-400 font-mono" },
  ];

  return (
    <>
      <section
        className="
        grid grid-cols-1 md:grid-cols-2 place-items-center
        max-w-7xl mx-auto gap-12 md:gap-20
        px-4 md:px-8 py-8 md:py-12
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
          <TypewriterEffectSmooth words={words} />

          <TextEffect
            as="p"
            per="line"
            segmentWrapperClassName="overflow-hidden block"
            className="
            text-lg md:text-xl text-foreground
            tracking-wider leading-10
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
              px-10 py-3
              text-olive-50 font-mono tracking-wide
              bg-linear-to-r from-brand-btn-2 to-brand-btn-5
              rounded-lg cursor-pointer
              hover:shadow-brand-btn-shadow hover:-translate-y-1
              active:scale-90
              transition-transform duration-300
              "
            >
              Get Started
            </button>

            <MagneticButton>
              <button
                className="
                px-6 py-3
                text-olive-50 font-mono tracking-wide
                bg-linear-to-l from-brand-btn-3 to-brand-btn-4
                rounded-lg cursor-pointer
                active:scale-90 hover:shadow-brand-btn-shadow
                transition-transform duration-200
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
            className=" object-contain drop-shadow-brand-drop-shadow"
          />
        </div>
      </section>

      

      {/* Content Section */}
      {/* Actions Section */}
    </>
  );
}
