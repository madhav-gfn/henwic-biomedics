export interface BrandPhase {
  id: string;
  phase: string;
  headline: string;
  headlineLines: [string, string, string];
  body: string;
  accent: "primary" | "organic" | "secondary";
}

export const BRAND_PHASES: BrandPhase[] = [
  {
    id: "human-health",
    phase: "PHASE 01",
    headline: "Human Health Evolved.",
    headlineLines: ["Human", "Health", "Evolved."],
    body: "The foundation of precision wellness — observing the body as a living system, not a symptom list.",
    accent: "primary",
  },
  {
    id: "energy",
    phase: "PHASE 02",
    headline: "Energy Unlocked.",
    headlineLines: ["Energy", "Unlocked", "Within."],
    body: "Cellular ATP production optimized through precise amino acid synthesis and mitochondrial support.",
    accent: "primary",
  },
  {
    id: "digestion",
    phase: "PHASE 03",
    headline: "Digestion Recalibrated.",
    headlineLines: ["Digestion", "Recalibrated", "Daily."],
    body: "Microbiome recalibration via targeted, resilient probiotic strains engineered for modern diets.",
    accent: "organic",
  },
  {
    id: "balance",
    phase: "PHASE 04",
    headline: "Balance Restored.",
    headlineLines: ["Balance", "Restored", "Systemically."],
    body: "Homeostasis achieved through systemic biological engineering — equilibrium as a measurable outcome.",
    accent: "organic",
  },
  {
    id: "innovation",
    phase: "PHASE 05",
    headline: "Innovation Delivered.",
    headlineLines: ["Innovation", "Delivered", "Clinically."],
    body: "Formulations born in the lab, validated by certification, refined for the human experience.",
    accent: "secondary",
  },
];
