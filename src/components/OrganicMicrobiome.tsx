import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface OrganicMicrobiomeProps {
  count?: number;
  className?: string;
}

interface Cell {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

/**
 * Soft, cell-like blobs — slower and larger than ParticleField to evoke
 * microbiome colonies rather than ambient dust.
 */
export function OrganicMicrobiome({ count = 18, className }: OrganicMicrobiomeProps) {
  const reducedMotion = useReducedMotion();

  const cells = useMemo<Cell[]>(() => {
    return Array.from({ length: count }, (_, id) => ({
      id,
      size: 48 + Math.random() * 96,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 22 + Math.random() * 16,
      delay: Math.random() * -18,
    }));
  }, [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="organic-cell absolute rounded-full"
          data-size={cell.size}
          style={
            {
              "--cell-x": `${cell.x}%`,
              "--cell-y": `${cell.y}%`,
              "--cell-size": `${cell.size}px`,
            } as React.CSSProperties
          }
          animate={
            reducedMotion
              ? { opacity: 0.25 }
              : {
                  scale: [1, 1.12, 0.94, 1],
                  opacity: [0.08, 0.28, 0.12, 0.08],
                  x: [0, 12, -8, 0],
                  y: [0, -16, 10, 0],
                }
          }
          transition={{
            duration: cell.duration,
            repeat: reducedMotion ? 0 : Infinity,
            ease: "easeInOut",
            delay: cell.delay,
          }}
        />
      ))}
    </div>
  );
}
