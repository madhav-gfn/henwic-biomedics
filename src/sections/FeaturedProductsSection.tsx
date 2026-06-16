import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FloatingShowcaseCard } from "../components/FloatingShowcaseCard";
import { ShaderBackground } from "../components/ShaderBackground";
import { ParticleField } from "../components/ParticleField";
import { EnergyPaths } from "../components/EnergyPaths";
import { OrganicMicrobiome } from "../components/OrganicMicrobiome";
import { BioGlow } from "../components/BioGlow";
import { GlassPanel } from "../components/GlassPanel";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { HENMINO_INGREDIENTS } from "../data/ingredients";
import { FAUNAJOY_STRAINS } from "../data/strains";
import { EASE_SMOOTH, PARALLAX, PARTICLE, SHADER, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMouseParallax } from "../hooks/useMouseParallax";

const HENMINO_SHADER_PRIMARY: readonly [number, number, number] = [0, 0.82, 0.41];
const HENMINO_SHADER_BG: readonly [number, number, number] = [0.01, 0.04, 0.02];

const FAUNAJOY_SHADER_PRIMARY: readonly [number, number, number] = [0.61, 0.88, 0.7];
const FAUNAJOY_SHADER_BG: readonly [number, number, number] = [0.02, 0.05, 0.03];

export function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const { x: mouseX, y: mouseY } = useMouseParallax(
    reducedMotion ? 0 : PARALLAX.mouseShowcase
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative min-h-[100vh] pt-24 pb-32 overflow-hidden bg-background flex flex-col justify-center"
      aria-label="Featured Products"
    >
      {/* Background Ambience based on active slide */}
      <AnimatePresence mode="popLayout">
        {activeSlide === 0 ? (
          <motion.div
            key="henmino-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE_SMOOTH }}
            className="absolute inset-0"
          >
            <BioGlow tone="primary" className="top-0 right-0 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute inset-0 opacity-50 will-change-transform">
              <ShaderBackground
                colorPrimary={HENMINO_SHADER_PRIMARY}
                colorBackground={HENMINO_SHADER_BG}
                intensity={SHADER.henminoIntensity}
              />
            </div>
            <EnergyPaths />
            <ParticleField count={22} colorClass="bg-primary-bright" className="opacity-70" />
          </motion.div>
        ) : (
          <motion.div
            key="faunajoy-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE_SMOOTH }}
            className="absolute inset-0"
          >
            <BioGlow tone="organic" className="bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />
            <div className="absolute inset-0 opacity-40 will-change-transform faunajoy-shader-layer">
              <ShaderBackground
                colorPrimary={FAUNAJOY_SHADER_PRIMARY}
                colorBackground={FAUNAJOY_SHADER_BG}
                intensity={SHADER.faunajoyIntensity}
              />
            </div>
            <OrganicMicrobiome count={reducedMotion ? PARTICLE.organicCountMobile : PARTICLE.organicCount} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-page relative z-20 flex flex-col items-center justify-between gap-12 w-full h-full">
        {/* Navigation Header */}
        <div className="w-full flex justify-between items-center z-30 mb-8 lg:mb-12">
          <SectionLabel className="hidden sm:flex">Our Portfolio</SectionLabel>
          
          <div className="flex gap-4 items-center w-full sm:w-auto justify-between sm:justify-end">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-line/30 bg-surface/20 hover:bg-surface backdrop-blur-md transition-colors text-text-primary"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              <div className={cn("h-1.5 rounded-full transition-all duration-500", activeSlide === 0 ? "w-8 bg-primary" : "w-2 bg-line/50")} />
              <div className={cn("h-1.5 rounded-full transition-all duration-500", activeSlide === 1 ? "w-8 bg-organic" : "w-2 bg-line/50")} />
            </div>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-line/30 bg-surface/20 hover:bg-surface backdrop-blur-md transition-colors text-text-primary"
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Slides Container */}
        <div className="relative w-full overflow-visible min-h-[680px] lg:min-h-[560px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {activeSlide === 0 ? (
              <motion.div
                key="henmino-slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 w-full h-full"
                style={{ y: reducedMotion ? 0 : contentY }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full">
                  
                  {/* Card — left, large and prominent */}
                  <div className="flex justify-center perspective-1000">
                    <FloatingShowcaseCard
                      title="Henmino™ Tablets"
                      subtitle="Amino energy tablets for daily cellular energy."
                      label="Nutraceuticals"
                      accentClass="text-primary"
                      depth={1}
                      rotateBias={-2}
                      image="/henwin.png"
                      mouseX={mouseX}
                      mouseY={mouseY}
                      className="w-full max-w-[460px]"
                    />
                  </div>

                  {/* Info — right */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <TextReveal
                        as="h2"
                        text="Henmino."
                        className="font-display text-headline-lg text-text-primary block mb-1"
                        stagger={STAGGER.word}
                      />
                      <TextReveal
                        as="h2"
                        text="Dynamic Energy."
                        highlight={["Energy."]}
                        className="font-display text-headline-lg text-text-primary block"
                        stagger={STAGGER.word}
                      />
                    </div>
                    <p className="font-body text-body-lg text-text-muted">
                      L-Carnitine L-Tartrate, L-Arginine, Cyanocobalamin, Vitamin E & Magnesium
                      Tablets — a precision amino matrix engineered for peak cellular output.
                    </p>
                    <span className="font-mono text-technical-data text-primary/60">10 × 10 Tablets per pack</span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {HENMINO_INGREDIENTS.map((ingredient) => (
                        <GlassPanel
                          key={ingredient.id}
                          className="p-3 sm:p-4 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300"
                        >
                          <span className="font-mono text-technical-data text-primary w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-[10px]">
                            {ingredient.symbol}
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-display text-[13px] sm:text-headline-sm text-text-primary leading-tight truncate">{ingredient.name}</h3>
                            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-primary/50">{ingredient.dosage}</span>
                          </div>
                        </GlassPanel>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="faunajoy-slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 w-full h-full"
                style={{ y: reducedMotion ? 0 : contentY }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full">
                  
                  {/* Card — left, large and prominent */}
                  <div className="flex justify-center perspective-1000">
                    <FloatingShowcaseCard
                      title="Faunajoy™ Capsules"
                      subtitle="4-strain pre & probiotic formula for complete gut harmony."
                      label="Gastrointestinal"
                      accentClass="text-organic"
                      depth={2}
                      rotateBias={3}
                      image="/faunajoy.png"
                      mouseX={mouseX}
                      mouseY={mouseY}
                      className="w-full max-w-[460px]"
                    />
                  </div>

                  {/* Info — right */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <TextReveal
                        as="h2"
                        text="Faunajoy."
                        className="font-display text-headline-lg text-organic-glow block mb-1"
                        stagger={STAGGER.word}
                      />
                      <TextReveal
                        as="h2"
                        text="Gut Harmony."
                        highlight={["Harmony."]}
                        highlightClassName="text-organic"
                        className="font-display text-headline-lg text-organic block"
                        stagger={STAGGER.word}
                      />
                    </div>
                    <p className="font-body text-body-lg text-text-muted">
                      Pre & Probiotic hard gelatin capsules with 4 clinically validated bacterial
                      strains — restoring the gut ecosystem from within.
                    </p>
                    <span className="font-mono text-technical-data text-organic-deep/60">10 × 10 Capsules · 1.4 kcal per capsule</span>
                    
                    <div className="flex flex-col gap-3">
                      {FAUNAJOY_STRAINS.map((strain) => (
                        <GlassPanel
                          key={strain.id}
                          className="p-3 sm:p-4 flex items-center justify-between gap-4 hover:-translate-y-1 transition-transform duration-300 border-organic/20"
                        >
                          <div className="min-w-0">
                            <h3 className="font-display text-[13px] sm:text-headline-sm text-organic leading-tight">{strain.name}</h3>
                            <p className="font-body text-[12px] text-text-muted mt-0.5 line-clamp-1">{strain.benefit}</p>
                          </div>
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-organic-deep shrink-0 px-3 py-1.5 rounded-full border border-organic/30">{strain.colony}</span>
                        </GlassPanel>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
