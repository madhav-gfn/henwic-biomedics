import { useRef } from "react";
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
}: FloatingShowcaseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
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
        className="showcase-card-inner"
        style={{
          rotateX,
          rotateY,
          translateZ,
        }}
      >
        <GlassPanel className="p-8 md:p-10 flex flex-col gap-6 min-h-[320px] justify-between">
          <span className={cn("font-mono text-label-caps uppercase tracking-[0.28em]", accentClass)}>
            {label}
          </span>
          <div>
            <h3 className="font-display text-headline-md text-text-primary mb-3">{title}</h3>
            <p className="font-body text-body-md text-text-muted">{subtitle}</p>
          </div>
          <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30", accentClass)} />
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
