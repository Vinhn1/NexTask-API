import { C } from "@/constants/brand";

import Navbar from "./Navbar";
import Hero from "./Hero";
import { Stats } from "./Stats";
import Features from "./Features";
import { HowItWorks } from "./HowItWorks";
import Pricing from "./Pricing";
import { Testimonials, CTABanner, Footer } from "./Sections";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-bg text-dark font-inter">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}