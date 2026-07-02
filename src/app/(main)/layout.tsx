import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GravityStarsBackground className="absolute inset-0 -z-10" />
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
