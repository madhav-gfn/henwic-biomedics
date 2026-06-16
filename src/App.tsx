import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";
import { Header } from "./components/layout/Header";
import { useLenis } from "./hooks/useLenis";
import { ContactSection } from "./sections/ContactSection";
import { FaunajoySection } from "./sections/FaunajoySection";
import { HenminoSection } from "./sections/HenminoSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductShowcaseSection } from "./sections/ProductShowcaseSection";
import { ScientificQualitySection } from "./sections/ScientificQualitySection";

function App() {
  useLenis();

  useEffect(() => {
    // Initialize Google Analytics with your Measurement ID
    // Replace "G-XXXXXXXXXX" with your actual Google Analytics Measurement ID
    ReactGA.initialize("G-XXXXXXXXXX");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <HeroSection />
        <HenminoSection />
        <FaunajoySection />
        <ProductShowcaseSection />
        <ScientificQualitySection />
        <ContactSection />
      </main>
      <Analytics />
    </>
  );
}

export default App;
