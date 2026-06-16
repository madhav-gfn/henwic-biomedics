export interface ShaderBackgroundProps {
  className?: string;
  /** Foreground "energy" colour, RGB 0-1 */
  colorPrimary?: readonly [number, number, number];
  /** Base/void colour, RGB 0-1 */
  colorBackground?: readonly [number, number, number];
  /** How strongly the noise field mixes towards colorPrimary */
  intensity?: number;
}

/**
 * Full-bleed ambient WebGL noise field. Acts as the "living tissue"
 * backdrop for hero and product universe sections. Cheap (single
 * triangle-strip, fragment-only noise) so it stays at 60fps.
 *
 * Note: Temporarily disabled (returns null) for performance optimization.
 */
export function ShaderBackground(_props: ShaderBackgroundProps) {
  return null;
}