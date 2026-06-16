export interface ParticleFieldProps {
  count?: number;
  /** Tailwind background-color class, e.g. "bg-primary" */
  colorClass?: string;
  className?: string;
  /** Particle diameter range in px */
  sizeRange?: [number, number];
}

/**
 * Drifting biotech-style particles. Transform + opacity only, so it
 * stays GPU-accelerated and cheap even with ~30 instances.
 *
 * Note: Temporarily disabled (returns null) for performance optimization.
 */
export function ParticleField(_props: ParticleFieldProps) {
  return null;
}