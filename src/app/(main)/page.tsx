/* Imports */
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
  const words = [
    { text: "One" },
    { text: "Overlay.", className: "text-blue-500" },
    { text: "Total" },
    { text: "Control.", className: "text-blue-500" },
  ];

  return (
    <>
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 pt-8 md:pt-0 pb-12 md:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
              
              <TypewriterEffectSmooth
                className="max-w-xl"
                words={words}
              />

              <TextEffect
                className="
                  max-w-lg md:max-w-xl 
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
              <div className="pt-2">
                <MagneticButton>
                  <button
                    className="
                      group relative
                      px-8 py-4 rounded-2xl
                      bg-gradient-to-b from-fuchsia-500 to-violet-700
                      font-semibold text-white text-lg
                      shadow-xl shadow-fuchsia-500/30
                      ring-1 ring-white/20
                      transition-all duration-200 
                      active:scale-[0.97] hover:brightness-110
                      focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-fuchsia-500
                    "
                  >
                    Watch 45-second demo →
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-[560px] aspect-[16/13] md:aspect-auto md:h-[620px] lg:h-[680px]">
                <Image
                  src="/hero.png"
                  alt="TikTok Overlay Dashboard Preview"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 95vw, 50vw"
                  quality={92}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {/* Actions Section */}
    </>
  );
}