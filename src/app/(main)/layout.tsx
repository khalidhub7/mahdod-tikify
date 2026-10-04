import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
      min-h-screen grid grid-rows-[auto_1fr_auto]
      bg-hex
      "
    >
      <Header className="z-50" />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
