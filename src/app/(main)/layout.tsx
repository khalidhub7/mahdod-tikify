import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen" >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default  MainLayout