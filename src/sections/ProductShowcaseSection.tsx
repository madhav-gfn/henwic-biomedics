import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingShowcaseCard } from "../components/FloatingShowcaseCard";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { PARALLAX, SCROLL, STAGGER } from "../lib/motion";
import { useMouseParallax } from "../hooks/useMouseParallax";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SHOWCASE_ITEMS = [
  {
    title: "Henmino™ Tablets",
    subtitle: "L-Carnitine L-Tartrate, L-Arginine, Cyanocobalamin, Vitamin E & Magnesium — 10×10 tablets for daily cellular energy.",
    label: "Amino Energy Tablets",
    accentClass: "text-primary",
    depth: 1,
    rotateBias: -4,
    image: "/henwin.png",
  },
  {
    title: "Faunajoy™ Capsules",
    subtitle: "4-strain pre & probiotic formula with 166 million organisms per capsule — for complete gut harmony.",
    label: "Pre & Probiotic Capsules",
    accentClass: "text-organic",
    depth: 2,
    rotateBias: 5,
    image: "/faunajoy.png",
  },
] as const;

export function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { x: mouseX, y: mouseY } = useMouseParallax(
    reducedMotion ? 0 : PARALLAX.mouseShowcase
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative pt-16 pb-20 overflow-hidden flex items-center"
      aria-label="Product showcase"
    >
      <div className="container-page relative z-10 w-full">
        <motion.div
          className="text-center mb-10 md:mb-16 lg:mb-24 max-w-3xl mx-auto"
          style={{ y: reducedMotion ? 0 : headingY }}
        >
          <SectionLabel className="justify-center mb-6">Product Showcase</SectionLabel>
          <TextReveal
            as="h2"
            text="Two Worlds. One Standard."
            highlight={["Worlds.", "Standard."]}
            className="font-display text-headline-lg text-text-primary justify-center"
            stagger={STAGGER.word}
          />
        </motion.div>

        <div
          className="showcase-stage grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center justify-items-center"
        >
          {SHOWCASE_ITEMS.map((item, index) => (
            <FloatingShowcaseCard
              key={item.title}
              {...item}
              mouseX={mouseX}
              mouseY={mouseY}
              className={index === 1 ? "md:mt-24" : "md:-mt-12"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
