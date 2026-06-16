import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "../components/TextReveal";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { DELAY, EASE_SMOOTH, PARALLAX, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useMouseParallax } from "../hooks/useMouseParallax";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { x: mouseX, y: mouseY } = useMouseParallax(reducedMotion ? 0 : PARALLAX.mouseDefault);

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
      className="relative h-[100dvh] min-h-[640px] w-full flex items-center justify-center overflow-hidden"
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
        <h1 className="font-display text-display-hero text-text-primary mb-2">
          <TextReveal
            as="span"
            text="Precision Wellness."
            highlight={["Wellness"]}
            className="block"
            stagger={STAGGER.word}
          />
          <TextReveal
            as="span"
            text="Powered by Science."
            highlight={["Science"]}
            className="block"
            delay={STAGGER.line}
            stagger={STAGGER.word}
          />
        </h1>

        <motion.p
          className={cn(
            "font-body text-body-lg text-text-muted max-w-2xl mt-6",
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
          Advanced nutritional and probiotic formulations engineered for modern health.
          Cinematic minimalism meets clinical purity.
        </motion.p>

        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
