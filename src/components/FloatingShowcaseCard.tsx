import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "../lib/utils";
import { PARALLAX } from "../lib/motion";
import { GlassPanel } from "./GlassPanel";

interface FloatingShowcaseCardProps {
  title: string;
  subtitle: string;
  label: string;
  accentClass?: string;
  depth: number;
  className?: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  rotateBias?: number;
  image?: string;
}

/**
 * Editorial product card with perspective tilt driven by cursor and
 * scroll-linked vertical drift — no WebGL, pure transform layers.
 */
export function FloatingShowcaseCard({
  title,
  subtitle,
  label,
  accentClass = "text-primary",
  depth,
  className,
  mouseX,
  mouseY,
  rotateBias = 0,
  image,
}: FloatingShowcaseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [PARALLAX.cardDepth * depth, -PARALLAX.cardDepth * depth]);
  const rotateX = useTransform(mouseY, (v) => v * 0.04 + rotateBias);
  const rotateY = useTransform(mouseX, (v) => v * -0.06);
  const translateZ = depth * 40;

  return (
    <motion.div
      ref={ref}
      className={cn("showcase-card-perspective w-full max-w-md", className)}
      style={{ y: scrollY }}
    >
      <motion.div
        className="showcase-card-inner group"
        style={{
          rotateX,
          rotateY,
          translateZ,
        }}
      >
        <GlassPanel 
          onClick={() => setIsRevealed(p => !p)}
          className="p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-6 min-h-[240px] sm:min-h-[320px] justify-between relative overflow-hidden cursor-pointer"
        >
          {/* Image hover reveal */}
          {image && (
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center p-4">
              <div className={cn("absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-500 z-0", isRevealed ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
              <img
                src={image}
                alt={title}
                className={cn(
                  "w-full h-full object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 drop-shadow-2xl",
                  isRevealed 
                    ? "[clip-path:inset(0_0_0_0)] translate-y-0" 
                    : "[clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0_0)] -translate-y-4 group-hover:translate-y-0"
                )}
              />
            </div>
          )}
          
          <div className={cn("relative z-10 flex flex-col gap-4 sm:gap-6 h-full justify-between transition-opacity duration-500", isRevealed ? "opacity-0" : "group-hover:opacity-0")}>
            <span className={cn("font-mono text-label-caps uppercase tracking-[0.28em]", accentClass)}>
              {label}
            </span>
            <div>
              <h3 className="font-display text-headline-md text-text-primary mb-3">{title}</h3>
              <p className="font-body text-body-md text-text-muted">{subtitle}</p>
            </div>
          </div>
          <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-current to-transparent relative z-10 transition-opacity duration-500", accentClass, isRevealed ? "opacity-0" : "opacity-30 group-hover:opacity-0")} />
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
