import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, ensureGsapPlugins } from "../lib/gsap";
import { HENMINO_INGREDIENTS } from "../data/ingredients";
import { ShaderBackground } from "../components/ShaderBackground";
import { ParticleField } from "../components/ParticleField";
import { EnergyPaths } from "../components/EnergyPaths";
import { BioGlow } from "../components/BioGlow";
import { GlassPanel } from "../components/GlassPanel";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { DURATION, SHADER, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

const HENMINO_SHADER_PRIMARY: readonly [number, number, number] = [0, 0.82, 0.41];
const HENMINO_SHADER_BG: readonly [number, number, number] = [0.01, 0.04, 0.02];

export function HenminoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const shaderY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapPlugins();

    const items = ingredientsRef.current?.querySelectorAll("[data-ingredient]");
    if (!items?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 36, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: DURATION.panel,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ingredientsRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="henmino"
      ref={sectionRef}
      className="relative pt-16 pb-20 overflow-hidden"
      aria-label="Henmino product universe"
    >
      <BioGlow tone="primary" className="top-0 right-0 translate-x-1/3 -translate-y-1/4" />

      <motion.div
        className="absolute inset-0 opacity-50 will-change-transform"
        style={{ y: reducedMotion ? 0 : shaderY }}
      >
        <ShaderBackground
          colorPrimary={HENMINO_SHADER_PRIMARY}
          colorBackground={HENMINO_SHADER_BG}
          intensity={SHADER.henminoIntensity}
        />
      </motion.div>

      <EnergyPaths />
      <ParticleField count={22} colorClass="bg-primary-bright" className="opacity-70" />

      <motion.div
        className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-grid-gutter items-center"
        style={{ y: reducedMotion ? 0 : contentY }}
      >
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-8">
          <SectionLabel>Henmino™ Tablets</SectionLabel>
          <TextReveal
            as="h2"
            text="Henmino. Dynamic Energy."
            highlight={["Henmino.", "Energy."]}
            className="font-display text-headline-lg text-text-primary"
            stagger={STAGGER.word}
          />
          <p className="font-body text-body-lg text-text-muted max-w-md">
            L-Carnitine L-Tartrate, L-Arginine, Cyanocobalamin, Vitamin E & Magnesium
            Tablets — a precision amino matrix engineered for peak cellular output.
          </p>
          <span className="font-mono text-technical-data text-primary/60">10 × 10 Tablets per pack</span>
          <div className="henmino-glow-bar h-1 w-32 rounded-full bg-primary/80 shadow-[0_0_24px_rgba(0,210,106,0.45)]" />
        </div>

        <div ref={ingredientsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HENMINO_INGREDIENTS.map((ingredient, index) => (
            <GlassPanel
              key={ingredient.id}
              data-ingredient
              className={cn(
                "p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 transition-transform duration-500",
                "hover:-translate-y-1",
                index === 0 && "sm:col-span-2 sm:flex-row sm:items-center sm:gap-8"
              )}
            >
              <span className="font-mono text-technical-data text-primary w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                {ingredient.symbol}
              </span>
              <div>
                <h3 className="font-display text-headline-md text-text-primary mb-1">{ingredient.name}</h3>
                <p className="font-body text-body-md text-text-muted">{ingredient.role}</p>
                <span className="font-mono text-technical-data text-primary/50 mt-1 inline-block">{ingredient.dosage} per tablet</span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
