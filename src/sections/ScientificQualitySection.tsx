import { useEffect, useRef } from "react";
import { Shield, Users, Lightbulb, Scale, HeartHandshake, CheckCircle } from "lucide-react";
import { gsap, ensureGsapPlugins } from "../lib/gsap";
import { BioGlow } from "../components/BioGlow";
import { GlassPanel } from "../components/GlassPanel";
import { SectionLabel } from "../components/SectionLabel";
import { TextReveal } from "../components/TextReveal";
import { DURATION, STAGGER } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

const VALUES = [
  {
    id: "quality",
    icon: CheckCircle,
    title: "Quality First",
    body: "We ensure quality-assured products through strict compliance with manufacturing standards.",
  },
  {
    id: "integrity",
    icon: Scale,
    title: "Integrity & Transparency",
    body: "We uphold ethical business practices in every interaction and transaction.",
  },
  {
    id: "customer",
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    body: "We are committed to strong customer support and long-term trusted partnerships.",
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Innovation",
    body: "Continuously improving healthcare solutions to meet the evolving needs of patients.",
  },
  {
    id: "ethical",
    icon: Users,
    title: "Ethical Marketing",
    body: "Our practices strictly adhere to the highest standards of marketing ethics.",
  },
  {
    id: "patient",
    icon: Shield,
    title: "Patient Care",
    body: "A relentless focus on patient well-being and healthcare excellence.",
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
        <div className="text-center mb-10 md:mb-16 lg:mb-24 max-w-3xl mx-auto">
          <SectionLabel className="justify-center mb-6">Why Choose Henwic?</SectionLabel>
          <TextReveal
            as="h2"
            text="Our Core Values"
            highlight={["Values"]}
            className="font-display text-headline-lg text-text-primary justify-center"
            stagger={STAGGER.word}
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {VALUES.map((val, index) => {
            const Icon = val.icon;
            return (
              <GlassPanel
                key={val.id}
                data-cert
                className={cn(
                  "p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-6",
                  "transition-transform duration-500 hover:-translate-y-2"
                )}
              >
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.25} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-headline-md text-text-primary mb-3">{val.title}</h3>
                  <p className="font-body text-body-md text-text-muted">{val.body}</p>
                </div>
                <span className="font-mono text-technical-data text-primary/60">
                  {String(index + 1).padStart(2, "0")} / 06
                </span>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
