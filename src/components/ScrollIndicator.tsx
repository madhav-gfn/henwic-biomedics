import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DELAY, EASE_SMOOTH } from "../lib/motion";
import { cn } from "../lib/utils";

interface ScrollIndicatorProps {
  className?: string;
}

/** Subtle pulsing scroll cue anchored to the hero baseline. */
export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <motion.div
      className={cn("mt-16 flex flex-col items-center gap-2 text-text-muted", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: DELAY.heroIndicator }}
    >
      <span className="font-mono text-label-caps uppercase tracking-[0.3em]">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}
