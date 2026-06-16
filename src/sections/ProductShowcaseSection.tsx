import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingShowcaseCard } from "../components/FloatingShowcaseCard";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { PARALLAX, STAGGER } from "../lib/motion";
import { useMouseParallax } from "../hooks/useMouseParallax";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SHOWCASE_ITEMS = [
  {
    title: "Henmino™ Tablets",
    subtitle: "Amino energy tablets for daily cellular energy.",
    label: "Nutraceuticals",
    accentClass: "text-primary",
    depth: 1,
    rotateBias: -2,
    image: "/henwin.png",
  },
  {
    title: "Faunajoy™ Capsules",
    subtitle: "4-strain pre & probiotic formula for complete gut harmony.",
    label: "Gastrointestinal",
    accentClass: "text-organic",
    depth: 2,
    rotateBias: 3,
    image: "/faunajoy.png",
  },
  {
    title: "General Medicines",
    subtitle: "High-quality formulations for everyday health and recovery.",
    label: "Pharmaceuticals",
    accentClass: "text-blue-400",
    depth: 1,
    rotateBias: -3,
    image: "", 
  },
  {
    title: "Antibiotics",
    subtitle: "Advanced antimicrobial therapies for effective treatment.",
    label: "Infection Control",
    accentClass: "text-red-400",
    depth: 2,
    rotateBias: 4,
    image: "",
  },
  {
    title: "Pediatric Range",
    subtitle: "Safe and gentle care for our youngest patients.",
    label: "Pediatrics",
    accentClass: "text-yellow-400",
    depth: 1,
    rotateBias: -2,
    image: "",
  },
  {
    title: "Gynecology",
    subtitle: "Specialized healthcare solutions for women.",
    label: "Women's Health",
    accentClass: "text-pink-400",
    depth: 2,
    rotateBias: 2,
    image: "",
  },
  {
    title: "Pain Management",
    subtitle: "Effective relief for improved quality of life.",
    label: "Analgesics",
    accentClass: "text-purple-400",
    depth: 1,
    rotateBias: -4,
    image: "",
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

        <div className="w-full overflow-x-auto pb-16 pt-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-6 sm:gap-10 md:gap-16 items-center w-max px-4 md:px-[10vw]">
            {SHOWCASE_ITEMS.map((item, index) => (
              <div key={item.title} className="w-[300px] sm:w-[350px] md:w-[420px] shrink-0">
                <FloatingShowcaseCard
                  {...item}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  className={index % 2 !== 0 ? "md:mt-24" : "md:-mt-12"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
