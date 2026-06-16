import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap, ensureGsapPlugins } from "../lib/gsap";
import { FAUNAJOY_STRAINS } from "../data/strains";
import { ShaderBackground } from "../components/ShaderBackground";
import { OrganicMicrobiome } from "../components/OrganicMicrobiome";
import { BioGlow } from "../components/BioGlow";
import { GlassPanel } from "../components/GlassPanel";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { DURATION, PARTICLE, SHADER, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FAUNAJOY_SHADER_PRIMARY: readonly [number, number, number] = [0.61, 0.88, 0.7];
const FAUNAJOY_SHADER_BG: readonly [number, number, number] = [0.02, 0.05, 0.03];

export function FaunajoySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const strainsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const layerRotate = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.6]);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapPlugins();

    const cards = strainsRef.current?.querySelectorAll("[data-strain]");
    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, x: 48, rotateY: -8 },
        {
          autoAlpha: 1,
          x: 0,
          rotateY: 0,
          duration: DURATION.panel,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: strainsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="faunajoy"
      ref={sectionRef}
      className="relative pt-16 pb-20 overflow-hidden bg-surface/40"
      aria-label="Faunajoy product universe"
    >
      <BioGlow tone="organic" className="bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />

      <motion.div
        className="absolute inset-0 opacity-40 will-change-transform faunajoy-shader-layer"
        style={{ rotate: reducedMotion ? 0 : layerRotate }}
      >
        <ShaderBackground
          colorPrimary={FAUNAJOY_SHADER_PRIMARY}
          colorBackground={FAUNAJOY_SHADER_BG}
          intensity={SHADER.faunajoyIntensity}
        />
      </motion.div>

      <OrganicMicrobiome
        count={reducedMotion ? PARTICLE.organicCountMobile : PARTICLE.organicCount}
      />

      <motion.div
        className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter items-start"
        style={{ opacity: reducedMotion ? 1 : contentOpacity }}
      >
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-8">
          <SectionLabel dotClassName="bg-organic">Phase 03 — Microbiome</SectionLabel>
          <TextReveal
            as="h2"
            text="Faunajoy. Organic Balance."
            highlight={["Faunajoy.", "Balance."]}
            className="font-display text-headline-lg text-organic-glow"
            highlightClassName="text-organic"
            stagger={STAGGER.word}
          />
          <p className="font-body text-body-lg text-text-muted max-w-md">
            Calm, biological intelligence — probiotic colonies in harmonious motion,
            restoring the ecosystem within.
          </p>
        </div>

        <div ref={strainsRef} className="lg:col-span-7 flex flex-col gap-5">
          {FAUNAJOY_STRAINS.map((strain, index) => (
            <GlassPanel
              key={strain.id}
              data-strain
              className={cn(
                "p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
                "border-organic/20 hover:border-organic/40 transition-colors duration-500",
                index % 2 === 1 && "md:translate-x-6"
              )}
            >
              <div>
                <h3 className="font-display text-headline-md text-organic mb-2">{strain.name}</h3>
                <p className="font-body text-body-md text-text-muted max-w-lg">{strain.benefit}</p>
              </div>
              <span className="font-mono text-technical-data text-organic-deep shrink-0 px-4 py-2 rounded-full border border-organic/30">
                {strain.colony}
              </span>
            </GlassPanel>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
