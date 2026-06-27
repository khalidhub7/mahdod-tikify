/* Imports */
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section
        className="
      container h-full mx-auto 

      grid grid-cols-2
      "
      >
        <div>text</div>
        <div className=" relative " >
          <Image src="/hero.png" fill alt="hero" >

          </Image>
        </div>
      </section>

      {/* Content Section */}
      {/* Actions Section */}
    </main>
  );
}
