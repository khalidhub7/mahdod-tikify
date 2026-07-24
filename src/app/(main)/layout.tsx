import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
// import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";


const blobClipPath = `
  polygon(
    74.1% 44.1%, 100% 61.6%,
    97.5% 26.9%, 85.5% 0.1%,
    80.7% 2%, 72.5% 32.5%,
    60.2% 62.4%, 52.4% 68.1%,
    47.5% 58.3%, 45.2% 34.5%,
    27.5% 76.7%, 0.1% 64.9%,
    17.9% 100%, 27.6% 76.8%,
    76.1% 97.7%, 74.1% 44.1%
  )
`;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  /* return (
    <div>
      <GravityStarsBackground className="absolute inset-0 -z-10" />
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  ); */
  /* return (
    <BackgroundBeamsWithCollision className="">
      <div className=" grid grid-rows-[auto_1fr_auto] min-h-screen w-full ">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </BackgroundBeamsWithCollision>
  ); */

  return (
    <div
      className="
    grid min-h-screen grid-rows-[auto_1fr_auto]
    relative isolate overflow-hidden bg-white
    "
    >
      {/* Top background blob */}
      <div
        aria-hidden="true"
        className="
  absolute inset-x-0 -top-40 -z-10
  transform-gpu overflow-hidden blur-3xl sm:-top-80
"
      >
        <div
          style={{ clipPath: blobClipPath, }}
          className="
  relative left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)]
  aspect-1155/678 w-144.5 sm:w-288.75
  -translate-x-1/2 rotate-30
  bg-linear-to-tr from-[#ff80b5] to-[#9089fc]
  opacity-30
"
        />
      </div>

      {/* main content */}
      <Header />

      <main>{children}</main>

      <Footer />

      {/* Bottom background blob */}
      <div
        aria-hidden="true"
        className="
  absolute inset-x-0 top-[calc(100%-13rem)] -z-10
  transform-gpu overflow-hidden blur-3xl
  sm:top-[calc(100%-30rem)]
"
      >
        <div
          style={{
            clipPath: `
    polygon(
      74.1% 44.1%, 100% 61.6%,
      97.5% 26.9%, 85.5% 0.1%,
      80.7% 2%, 72.5% 32.5%,
      60.2% 62.4%, 52.4% 68.1%,
      47.5% 58.3%, 45.2% 34.5%,
      27.5% 76.7%, 0.1% 64.9%,
      17.9% 100%, 27.6% 76.8%,
      76.1% 97.7%, 74.1% 44.1%
    )
  `,
          }}
          className="
  relative left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)]
  aspect-1155/678 w-144.5 sm:w-288.75
  -translate-x-1/2
  bg-linear-to-tr from-[#ff80b5] to-[#9089fc]
  opacity-30
"
        />
      </div>
    </div>
  );
};

export default MainLayout;
