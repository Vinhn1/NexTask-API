import Navbar from "./Navbar";
import Hero from "./Hero";
import { Stats } from "./Stats";
import Features from "./Features";
import { HowItWorks } from "./HowItWorks";
import Pricing from "./Pricing";
import AboutUs from "./AboutUs";
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
      <AboutUs />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
