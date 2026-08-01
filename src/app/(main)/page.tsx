import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

const Home = () => {
  return (
    <div className="max-w-[90%] mx-auto space-y-10 md:space-y-16">
      <HeroSection />
      <WhyChooseUsSection />
      {/* How It Works Section (todo later) */}
      <FAQSection />
    </div>
  );
};

export default Home;
