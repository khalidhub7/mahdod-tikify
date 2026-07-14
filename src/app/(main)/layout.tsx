import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackgroundBeamsWithCollision } from "@/components/ui/aceternity/background-beams-with-collision";
// import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";

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
  return (
    <BackgroundBeamsWithCollision className="">
      <div className=" grid grid-rows-[auto_1fr_auto] min-h-screen w-full ">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default MainLayout;
