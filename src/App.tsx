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
    </>
  );
}

export default App;
