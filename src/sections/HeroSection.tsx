import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "../components/TextReveal";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { DELAY, EASE_SMOOTH, PARALLAX, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.heroTitle]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1 + PARALLAX.heroBackgroundScale]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[580px] w-full flex items-center justify-center overflow-hidden px-4"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ scale: reducedMotion ? 1 : bgScale }}
      >
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none"
        style={{ opacity: gradientOpacity, y: particleY }}
      />

      <motion.div
        className="relative z-10 text-center container-page flex flex-col items-center max-w-5xl"
        style={{ y: reducedMotion ? 0 : titleY }}
      >
        <motion.span
          className="font-mono text-label-caps uppercase text-primary tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 }}
        >
          Henwic Biomedics
        </motion.span>

        <h1 className="font-display text-display-hero text-text-primary mb-2">
          <TextReveal
            as="span"
            text="Innovating Healthcare,"
            highlight={["Healthcare,"]}
            className="block"
            stagger={STAGGER.word}
          />
          <TextReveal
            as="span"
            text="Inspiring Wellness."
            highlight={["Wellness."]}
            className="block"
            delay={STAGGER.line}
            stagger={STAGGER.word}
          />
        </h1>

        <motion.p
          className={cn(
            "font-body text-body-md sm:text-body-lg text-text-muted max-w-2xl mt-4 sm:mt-6",
            "text-balance"
          )}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: EASE_SMOOTH,
            delay: DELAY.heroSubhead,
          }}
        >
          Henwic Pharmaceuticals Pvt. Ltd. is dedicated to building a healthier India through quality medicines, trusted partnerships, and a commitment to excellence in healthcare.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: DELAY.heroSubhead + 0.3 }}
        >
          <span className="font-mono text-technical-data text-primary/70 px-4 py-2 rounded-full border border-primary/20">
            FSSAI Licensed
          </span>
          <span className="font-mono text-technical-data text-primary/70 px-4 py-2 rounded-full border border-primary/20">
            ISO 9001:2008
          </span>
          <span className="font-mono text-technical-data text-primary/70 px-4 py-2 rounded-full border border-primary/20">
            GMP Certified
          </span>
        </motion.div>

        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
