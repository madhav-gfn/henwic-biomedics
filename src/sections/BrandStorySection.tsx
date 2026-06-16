import { useEffect, useRef } from "react";
import { gsap, ensureGsapPlugins } from "../lib/gsap";
import { BRAND_PHASES } from "../data/brandStory";
import { BioGlow } from "../components/BioGlow";
import { GlassPanel } from "../components/GlassPanel";
import { SectionLabel } from "../components/SectionLabel";
import { DURATION, SCROLL } from "../lib/motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ACCENT_TEXT: Record<string, string> = {
  primary: "text-primary",
  organic: "text-organic",
  secondary: "text-secondary",
};

/**
 * Pinned scroll narrative: each phase crossfades headline, body, and
 * ambient glow while the reader scrubs through the brand journey.
 */
export function BrandStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const phaseLabelRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    ensureGsapPlugins();
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const headlines = headlineRefs.current.filter(Boolean);
      const totalPhases = BRAND_PHASES.length;

      gsap.set(headlines, { autoAlpha: 0, y: 48 });
      gsap.set(headlines[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${SCROLL.brandPinMultiplier * 100}%`,
          pin: pin,
          scrub: SCROLL.brandScrub,
          anticipatePin: 1,
        },
      });

      BRAND_PHASES.forEach((phase, index) => {
        if (index === 0) return;

        const segmentStart = (index - 1) / (totalPhases - 1);
        const segmentMid = index / (totalPhases - 1);

        tl.to(
          headlines[index - 1],
          { autoAlpha: 0, y: -40, duration: DURATION.scrub * 0.35, ease: "power2.inOut" },
          segmentStart
        )
          .to(
            headlines[index],
            { autoAlpha: 1, y: 0, duration: DURATION.scrub * 0.45, ease: "power2.out" },
            segmentStart + 0.05
          )
          .to(
            bodyRef.current,
            { autoAlpha: 0, y: -12, duration: DURATION.scrub * 0.2, ease: "power2.in" },
            segmentStart
          )
          .fromTo(
            bodyRef.current,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: DURATION.scrub * 0.35, ease: "power2.out" },
            segmentStart + 0.12
          )
          .to(
            phaseLabelRef.current,
            { autoAlpha: 0, duration: DURATION.scrub * 0.15 },
            segmentStart
          )
          .call(
            () => {
              if (phaseLabelRef.current) phaseLabelRef.current.textContent = phase.phase;
              if (bodyRef.current) bodyRef.current.textContent = phase.body;
            },
            [],
            segmentMid - 0.02
          )
          .to(
            phaseLabelRef.current,
            { autoAlpha: 1, duration: DURATION.scrub * 0.2 },
            segmentMid
          )
          .to(
            glowRef.current,
            {
              x: index % 2 === 0 ? "-15%" : "15%",
              opacity: 0.55 + (index % 3) * 0.15,
              duration: DURATION.scrub * 0.5,
              ease: "power1.inOut",
            },
            segmentStart
          );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const activePhase = BRAND_PHASES[0];

  return (
    <section
      ref={sectionRef}
      className="relative scientific-grid"
      aria-label="Brand story"
    >
      <div ref={pinRef} className="relative min-h-[100dvh] py-section-gap">
        <div ref={glowRef} className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4">
          <BioGlow tone="primary" />
        </div>

        <div className="container-page relative z-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter items-center">
            <div className="lg:col-span-5">
              <GlassPanel className="p-8 md:p-10 aspect-square flex flex-col justify-between">
                <SectionLabel dotClassName="bg-primary">
                  <span ref={phaseLabelRef}>{activePhase.phase}</span>
                </SectionLabel>

                <div className="relative min-h-[12rem]">
                  {BRAND_PHASES.map((phase, index) => (
                    <h2
                      key={phase.id}
                      ref={(el) => {
                        headlineRefs.current[index] = el;
                      }}
                      className={cn(
                        "font-display text-headline-lg text-mask",
                        index === 0 ? "relative" : "absolute inset-x-0 top-0",
                        reducedMotion && index > 0 && "hidden"
                      )}
                    >
                      {phase.headlineLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>
                  ))}
                </div>

                <p
                  ref={bodyRef}
                  className="font-mono text-label-caps uppercase text-text-muted tracking-[0.2em]"
                >
                  {activePhase.body}
                </p>
              </GlassPanel>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-12 lg:pl-12 lg:pt-8">
              {BRAND_PHASES.slice(1).map((phase, index) => (
                <StoryRailItem
                  key={phase.id}
                  title={phase.headlineLines[0]}
                  body={phase.body.split(".")[0] + "."}
                  accent={phase.accent}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryRailItem({
  title,
  body,
  accent,
  index,
  reducedMotion,
}: {
  title: string;
  body: string;
  accent: string;
  index: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapPlugins();

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, x: -32 },
        {
          autoAlpha: 1,
          x: 0,
          duration: DURATION.panel,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.08,
        }
      );
    });

    return () => ctx.revert();
  }, [index, reducedMotion]);

  return (
    <div
      ref={ref}
      className="border-l border-line pl-8"
    >
      <h3 className={cn("font-display text-headline-md mb-2", ACCENT_TEXT[accent] ?? "text-primary")}>
        {title}
      </h3>
      <p className="font-body text-body-md text-text-muted">{body}</p>
    </div>
  );
}
