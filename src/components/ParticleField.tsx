import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface ParticleFieldProps {
  count?: number;
  /** Tailwind background-color class, e.g. "bg-primary" */
  colorClass?: string;
  className?: string;
  /** Particle diameter range in px */
  sizeRange?: [number, number];
}

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  drift: number;
}

/**
 * Drifting biotech-style particles. Transform + opacity only, so it
 * stays GPU-accelerated and cheap even with ~30 instances.
 */
export function ParticleField({
  count = 28,
  colorClass = "bg-primary",
  className,
  sizeRange = [2, 6],
}: ParticleFieldProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, id) => ({
      id,
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 14 + Math.random() * 18,
      delay: Math.random() * -20,
      drift: (Math.random() - 0.5) * 60,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={cn("absolute rounded-full blur-[0.5px]", colorClass)}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -48, 0],
            x: [0, p.drift, 0],
            opacity: [0.05, 0.5, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}