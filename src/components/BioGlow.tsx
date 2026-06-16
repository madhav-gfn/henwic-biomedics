import { cn } from "../lib/utils";

type BioGlowTone = "primary" | "organic" | "neutral";

interface BioGlowProps {
  className?: string;
  tone?: BioGlowTone;
}

const TONE_CLASS: Record<BioGlowTone, string> = {
  primary: "bio-glow-primary",
  organic: "bio-glow-organic",
  neutral: "bio-glow-neutral",
};

/** Ambient radial wash — positioned via Tailwind placement utilities on the parent. */
export function BioGlow({ className, tone = "primary" }: BioGlowProps) {
  return (
    <div
      className={cn("bio-glow pointer-events-none", TONE_CLASS[tone], className)}
      aria-hidden="true"
    />
  );
}
