import Hero from "../components/hero";
import Features from "../components/Features";
import Analytics from "../components/Analytics";
import HowItWorks from "../components/HowItWorks";
import Suggestions from "../components/Suggestions";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <div className="mt-8 space-y-10">
      <Hero />
      <Features />
      <Analytics />
      <HowItWorks />
      <Suggestions />
      <CTA />
    </div>
  );
}
