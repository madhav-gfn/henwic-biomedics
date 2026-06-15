import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface TextRevealProps {
  text: string;
  /** Words (without punctuation) to render in the primary accent colour */
  highlight?: string[];
  className?: string;
  /** Extra class applied to the highlighted span */
  highlightClassName?: string;
  /** Stagger start offset, in seconds */
  delay?: number;
  /** Per-word stagger interval, in seconds */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Splits text into words, each masked inside an overflow-hidden box and
 * revealed with a vertical slide-up — the signature hero headline reveal.
 */
export function TextReveal({
  text,
  highlight = [],
  className,
  highlightClassName = "text-primary",
  delay = 0,
  stagger = 0.08,
  as = "span",
}: TextRevealProps) {
  const words = text.split(" ");
  const Tag = motion[as as "span"];

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const bare = word.replace(/[.,!?]/g, "");
        const isHighlighted = highlight.includes(bare);
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.05em] mr-[0.28em] last:mr-0"
          >
            <motion.span
              className={cn("inline-block", isHighlighted && highlightClassName)}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.95,
                ease: EASE,
                delay: delay + i * stagger,
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}