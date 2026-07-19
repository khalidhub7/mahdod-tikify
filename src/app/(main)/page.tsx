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
        min-h-screen md:mt-10 max-w-7xl mx-auto
        grid grid-cols-1 md:grid-cols-2 gap-10
        place-items-center
        "
      >
        {/* Left Content */}
        <div
          className="
          flex flex-col gap-8  h-full justify-center
          "
        >
          {/* this should be h1 */}
          <TypewriterEffectSmooth words={words} className="w-fit px-10" />

          <TextEffect
            className="
            px-10
            text-xl

            leading-loose text-chart-3
            tracking-wider
            text-center md:text-start
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
            No messyBrowser Sources. No restarts.`}
          </TextEffect>

          {/* CTA Button */}
          <div
            className="
            flex justify-evenly items-center w-full
            "
          >
            <button
              className="
            rounded-tr-3xl rounded-bl-3xl px-6 py-3 cursor-pointer
            text-background
            bg-linear-to-r from-blue-400 to-fuchsia-400
            font-semibold shadow-lg 
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-xl
            "
            >
              Get Started
            </button>

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
        <div className="">
          <Image
            src="/hero.png"
            alt="App Brand image"
            width={400}
            height={400}
            className="
            object-contain
            drop-shadow-[0_50px_100px_rgba(0,0,0,0.3)]
            "
            priority
            sizes="(max-width: 768px) 95vw, 50vw"
          />
        </div>
      </section>

      {/* Content Section */}
      {/* Actions Section */}
    </>
  );
}
