import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
  },
};

const Home = () => {
  /* main tag content */
  return (
    <div className="max-w-[90%] mx-auto space-y-16 mb-56">
      <HeroSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
};

export { metadata };
export default Home;
