import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ReactGA from "react-ga4";
import { Header } from "./components/layout/Header";
import { useLenis } from "./hooks/useLenis";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { FeaturedProductsSection } from "./sections/FeaturedProductsSection";
import { ScientificQualitySection } from "./sections/ScientificQualitySection";
import { OfficeGallerySection } from "./sections/OfficeGallerySection";

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
        <AboutSection />
        <FeaturedProductsSection />
        <ScientificQualitySection />
        <OfficeGallerySection />
        <ContactSection />
      </main>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
