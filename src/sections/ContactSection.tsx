import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "../components/TextReveal";
import { ContactForm } from "../components/ContactForm";
import { MagneticButton } from "../components/MagneticButton";
import { EASE_SMOOTH, STAGGER } from "../lib/motion";

const FOOTER_COLUMNS = [
  {
    title: "Marketed By",
    lines: [
      "Henwic Biomedics",
      "Office No. 501, Forth floor, 45-A",
      "Hasanpur main road, I.P. Extension",
      "Delhi-110092",
    ],
  },
  {
    title: "Manufactured By",
    lines: [
      "Manfriday Lifesciences",
      "Plot No. 370, EPIP, Sec-53, HSIIDC",
      "Kundli, Sonipat-131028 (Haryana)",
    ],
  },
  {
    title: "Contact",
    lines: [
      "Devendra Kumar Mishra",
      "+91-9548205171",
      "dev.bah44@gmail.com",
    ],
  },
  {
    title: "Certifications",
    lines: [
      "FSSAI Lic: 10019064001789",
      "ISO 9001:2008 Certified",
      "GMP Manufacturing",
    ],
  },
] as const;

export function ContactSection() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      <section
        className="relative pt-16 pb-20 flex items-center justify-center text-center overflow-hidden min-h-[40vh]"
        aria-label="Closing statement and contact form"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

        <div className="relative z-10 container-page flex flex-col items-center gap-10 w-full">
          <motion.div
            className="flex flex-col items-center gap-10"
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
            
            <AnimatePresence mode="wait">
              {!isFormVisible && (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                >
                  <div onClick={() => setIsFormVisible(true)}>
                    <MagneticButton type="button">Get in Touch</MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <AnimatePresence>
            {isFormVisible && (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
                className="w-full overflow-hidden"
              >
                <div className="relative pt-4">
                  <button 
                    onClick={() => setIsFormVisible(false)}
                    className="absolute top-8 right-0 md:right-[15%] z-20 w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-line text-text-muted hover:text-text-main transition-colors"
                    aria-label="Close contact form"
                  >
                    ×
                  </button>
                  <ContactForm />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16 text-left">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="font-mono text-label-caps uppercase text-primary mb-6 tracking-[0.22em]">
                  {column.title}
                </h4>
                {column.lines.map((line) => (
                  <p key={line} className="font-body text-body-md text-text-muted">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <p className="font-mono text-label-caps uppercase text-text-muted w-full border-t border-line pt-6 sm:pt-8 tracking-[0.18em]">
            © {new Date().getFullYear()} HENWIC BIOMEDICS & PHARMACEUTICALS. Biological Precision.
          </p>
        </div>
      </footer>
    </>
  );
}
