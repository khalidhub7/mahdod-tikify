import Image from "next/image";
import Link from "next/link";
import { TextEffect } from "@/components/ui/motion-primitives/text-effect";
import { MagneticButton } from "@/components/ui/aceternity/magnetic-button";
import { TypewriterEffectSmooth } from "@/components/ui/aceternity/typewriter-effect";

const words = [
  { text: "One", className: "" },
  { text: "Overlay.", className: "text-blue-500 dark:text-blue-400 " },
  { text: "Total", className: "" },
  { text: "Control.", className: "text-blue-500 dark:text-blue-400 " },
];

const HeroSection = () => {
  return (
    <section
      className="
      section
      grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20
      "
    >
      {/* Left Content */}
      <div
        className="
        bg-amber-100
        p-5 flex flex-col
        items-center md:items-start gap-8 md:gap-10
        text-center md:text-left
        "
      >
        {/* Should render an h1 */}
        <TypewriterEffectSmooth words={words}  />

        <TextEffect
          as="p"
          per="line"
          segmentWrapperClassName="overflow-hidden block"
          className="
          text-xl md:text-2xl text-foreground
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
          bg-red-100
          p-5
          w-full flex justify-around
          md:justify-start md:gap-20
          "
        >
          {/* rule: internal navigation use next/link */}
          <Link
            href={"/"}
            className="
            px-10 py-3
            text-olive-50 font-playpen tracking-wide
            bg-linear-to-r from-brand-btn-2 to-brand-btn-5
            rounded-lg cursor-pointer
            hover:shadow-brand-btn-shadow-strong hover:-translate-y-1
            active:scale-90
            transition-transform duration-300
            "
          >
            Get Started
          </Link>

          <MagneticButton>
            <button
              className="
                    px-6 py-3
                    text-olive-50 font-playpen tracking-wide
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
  );
};

export { HeroSection };
