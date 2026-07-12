/* Imports */
import Image from "next/image";
import { TextEffect } from "@/components/ui/motion-primitives/text-effect";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";
import { TypewriterEffectSmooth } from "@/components/ui/aceternity/typewriter-effect";
import { AnimatedShinyButton } from "@/components/ui/eldoraui/animated-shiny-button";

export default function Home() {
  const words = [
    { text: "One" },
    { text: "Overlay.", className: "text-blue-500" },
    { text: "Total" },
    { text: "Control.", className: "text-blue-500" },
  ];

  return (
    <>
      <section className="max-h-screen border-red-500">
        <div
          className="
              grid grid-cols-1 md:grid-cols-2
              gap-12 md:gap-16
            "
        >
          {/* Left Content */}
          <div
            className="
                flex flex-col items-center gap-8
                p-4 md:pt-24
                md:items-start text-center md:text-left
              "
          >
            <TypewriterEffectSmooth words={words} />

            <TextEffect
              className="
                  text-[17px] sm:text-lg md:text-xl
                  
                  leading-relaxed text-zinc-700 font-normal
                  tracking-[-0.01em]
                "
              per="line"
              as="p"
              segmentWrapperClassName="overflow-hidden block"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
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
            flex justify-around items-center
            p-2 w-full
            "
            >
              <AnimatedShinyButton>Get Started</AnimatedShinyButton>

              <MagneticButton>
                <button
                  className="
                    cursor-pointer rounded-lg 
                    bg-linear-to-b from-blue-500 to-blue-700 
                    px-4 py-2 font-medium text-white 
                    ring-1 ring-white/20 ring-offset-1 
                    ring-offset-blue-500 transition-transform 
                    duration-150 ring-inset active:scale-98
                    "
                >
                  Watch 45-second demo →
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div
            className="
              relative 
              w-full max-w-140 aspect-16/13 md:aspect-auto md:h-155 lg:h-170
              "
          >
            <Image
              src="/hero.png"
              alt="App Brand image"
              fill
              className="
                object-contain
                drop-shadow-[0_50px_100px_rgba(0,0,0,0.3)]
                "
              priority
              sizes="(max-width: 768px) 95vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      {/* Actions Section */}
    </>
  );
}
