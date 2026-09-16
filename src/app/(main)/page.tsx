import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

const Home = () => {
  /* main tag content */
  return (
    <div className="max-w-[90%] mx-auto">
      <HeroSection />
      <WhyChooseUsSection />
      {/* <HowItWorksSection/>
      <FAQSection /> */}
    </div>
  );
};

export default Home;
