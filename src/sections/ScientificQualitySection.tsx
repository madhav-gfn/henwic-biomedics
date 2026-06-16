import { useEffect, useRef } from "react";
import { Shield, FlaskConical, BadgeCheck } from "lucide-react";
import { gsap, ensureGsapPlugins } from "../lib/gsap";
import { BioGlow } from "../components/BioGlow";
import { GlassPanel } from "../components/GlassPanel";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { DURATION, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CERTIFICATIONS = [
  {
    id: "iso",
    icon: BadgeCheck,
    title: "ISO Certified",
    body: "Manufacturing processes conforming to rigorous international standards.",
  },
  {
    id: "gmp",
    icon: FlaskConical,
    title: "GMP Manufacturing",
    body: "Good Manufacturing Practices ensuring consistent quality and safety.",
  },
  {
    id: "fssai",
    icon: Shield,
    title: "FSSAI Compliance",
    body: "Fully compliant with the Food Safety and Standards Authority of India.",
  },
] as const;

export function ScientificQualitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapPlugins();

    const panels = gridRef.current?.querySelectorAll("[data-cert]");
    if (!panels?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panels,
        { autoAlpha: 0, y: 56 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.panel,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="science"
      ref={sectionRef}
      className="relative pt-16 pb-20 overflow-hidden scientific-grid"
      aria-label="Scientific quality"
    >
      <BioGlow tone="primary" className="bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

      <div className="container-page relative z-10">
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <SectionLabel className="justify-center mb-6">Clinical Validation</SectionLabel>
          <TextReveal
            as="h2"
            text="Engineered for Purity"
            highlight={["Purity"]}
            className="font-display text-headline-lg text-text-primary justify-center"
            stagger={STAGGER.word}
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CERTIFICATIONS.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <GlassPanel
                key={cert.id}
                data-cert
                className={cn(
                  "p-8 md:p-10 flex flex-col gap-6",
                  "transition-transform duration-500 hover:-translate-y-2"
                )}
              >
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.25} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-headline-md text-text-primary mb-3">{cert.title}</h3>
                  <p className="font-body text-body-md text-text-muted">{cert.body}</p>
                </div>
                <span className="font-mono text-technical-data text-primary/60">
                  {String(index + 1).padStart(2, "0")} / 03
                </span>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
