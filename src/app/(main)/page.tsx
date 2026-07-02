/* Imports */
import Image from "next/image";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
  return (
    <main>
      <section
        className="
        container h-full mx-auto
        grid grid-cols-2
        "
      >
        {/* child 1 */}
        <div className=" flex flex-col justify-center gap-5 ">
          <h1>Bring Your Stream to Life</h1>
          <TypewriterEffectSmooth
            className="h-fit bg-amber-200"
            words={[
              { text: "Connect your TikTok account," },
              { text: "add the widgets you want," },
              { text: "customize everything," },
              { text: "use one OBS overlay URL." },
              { text: "Changes update live instantly." },
              { text: "No restart required." },
            ]}
          />

          <div>
            <button>Get Started</button>
            <button>See Demo</button>
          </div>
          <p>
            Everything You Need for a Better TikTok Live Create professional
            live overlays without installing any software.
          </p>
        </div>

        {/* child 2 */}

        <div className="relative">
          <Image src="/hero.png" fill alt="hero" />
        </div>
      </section>

      {/* Content Section */}
      {/* Actions Section */}
    </main>
  );
}
