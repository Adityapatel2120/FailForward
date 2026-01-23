import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Analytics from "./components/Analytics";
import Suggestions from "./components/Suggestions";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="max-w-350 mx-auto px-6 py-6 bg-linear-to-b from-blue-50 to-purple-50 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Analytics />
      <Suggestions />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;