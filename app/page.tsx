import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import Care from "@/components/sections/Care";
import Pricing from "@/components/sections/Pricing";
import ServiceArea from "@/components/sections/ServiceArea";
import About from "@/components/sections/About";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="site" />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Care />
      <Pricing />
      <ServiceArea />
      <About />
      <Reviews />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
