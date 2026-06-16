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
  return null;
}