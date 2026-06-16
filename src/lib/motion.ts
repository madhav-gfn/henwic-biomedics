/** Shared motion tokens — single source for durations, easings, and scroll distances. */

export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  reveal: 0.95,
  fade: 0.7,
  panel: 1.1,
  scrub: 1,
} as const;

export const STAGGER = {
  word: 0.08,
  line: 0.14,
  item: 0.12,
} as const;

export const DELAY = {
  heroSubhead: 0.55,
  heroIndicator: 1.2,
} as const;

export const PARALLAX = {
  heroTitle: 120,
  heroBackgroundScale: 0.08,
  mouseDefault: 20,
  mouseShowcase: 14,
  cardDepth: 48,
} as const;

export const SCROLL = {
  /** Total scroll distance for the pinned brand narrative (viewport multiples). */
  brandPinMultiplier: 4,
  brandScrub: 1,
  showcasePinMultiplier: 1.5,
} as const;

export const PARTICLE = {
  heroCount: 28,
  heroCountMobile: 16,
  organicCount: 18,
  organicCountMobile: 10,
} as const;

export const SHADER = {
  heroIntensity: 0.15,
  henminoIntensity: 0.22,
  faunajoyIntensity: 0.12,
} as const;

export const SPRING = {
  magnetic: { stiffness: 180, damping: 14, mass: 0.15 },
  parallax: { stiffness: 60, damping: 20, mass: 0.4 },
} as const;
