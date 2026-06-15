import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  /** Colour accent for the leading marker dot */
  dotClassName?: string;
}

/**
 * "// 01 — PRODUCT UNIVERSE" style eyebrow. The dot + monospace pairing
 * reads as a lab readout rather than decorative numbering.
 */
export function SectionLabel({ children, className, dotClassName = "bg-primary" }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-label-caps uppercase text-text-muted", className)}>
      <span className={cn("inline-block w-1.5 h-1.5 rounded-full", dotClassName)} />
      <span>{children}</span>
    </div>
  );
}