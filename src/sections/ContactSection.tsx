import { motion } from "framer-motion";
import { MagneticButton } from "../components/MagneticButton";
import { TextReveal } from "../components/TextReveal";
import { EASE_SMOOTH, STAGGER } from "../lib/motion";

const FOOTER_COLUMNS = [
  {
    title: "HQ Location",
    lines: ["Shahdara, Delhi", "India"],
  },
  {
    title: "Inquiries",
    lines: ["contact@henwicbiomedics.com", "+91 98765 43210"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Research"],
  },
] as const;

export function ContactSection() {
  return (
    <>
      <section
        className="relative pt-16 pb-20 flex items-center justify-center text-center overflow-hidden"
        aria-label="Closing statement"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

        <motion.div
          className="relative z-10 container-page flex flex-col items-center gap-10"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE_SMOOTH }}
        >
          <TextReveal
            as="h2"
            text="Better Health Begins Within."
            highlight={["Within."]}
            className="font-display text-display-hero text-gradient-hero justify-center"
            stagger={STAGGER.word}
          />
          <MagneticButton type="button">Explore Ecosystem</MagneticButton>
        </motion.div>
      </section>

      <footer
        id="contact"
        className="bg-surface w-full pt-12 pb-10 border-t border-line"
      >
        <div className="container-page flex flex-col items-center text-center">
          <p
            className="font-display text-display-hero text-primary uppercase opacity-10 select-none pointer-events-none w-full overflow-hidden mb-12 leading-[0.85]"
            aria-hidden="true"
          >
            Henwic
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl gap-12 mb-16 text-left">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="font-mono text-label-caps uppercase text-primary mb-6 tracking-[0.22em]">
                  {column.title}
                </h4>
                {"lines" in column ? (
                  column.lines.map((line) => (
                    <p key={line} className="font-body text-body-md text-text-muted">
                      {line}
                    </p>
                  ))
                ) : (
                  <div className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="font-mono text-label-caps uppercase text-text-muted hover:text-primary transition-colors duration-300"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="font-mono text-label-caps uppercase text-text-muted w-full border-t border-line pt-8 tracking-[0.18em]">
            © {new Date().getFullYear()} HENWIC BIOMEDICS. Biological Precision.
          </p>
        </div>
      </footer>
    </>
  );
}
