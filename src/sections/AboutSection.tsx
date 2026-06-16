import { motion } from "framer-motion";
import { TextReveal } from "../components/TextReveal";
import { SectionLabel } from "../components/SectionLabel";
import { EASE_SMOOTH, STAGGER } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-surface overflow-hidden">
      <div className="container-page relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div>
              <SectionLabel className="mb-6">About Henwic</SectionLabel>
              <TextReveal
                as="h2"
                text="Improving Healthcare Through Innovation."
                highlight={["Innovation."]}
                className="font-display text-headline-lg text-text-primary"
                stagger={STAGGER.word}
              />
            </div>
            
            <motion.div 
              className="flex flex-col gap-6 font-body text-body-lg text-text-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
            >
              <p>
                Founded in New Delhi in 2025–26, Henwic Pharmaceuticals Pvt. Ltd. is a rapidly growing pharmaceutical startup committed to delivering safe, effective, and affordable medicines across various therapeutic segments.
              </p>
              <p>
                We believe that healthcare is a fundamental right. Our mission is to provide high-quality pharmaceutical products that enhance patient well-being while maintaining the highest standards of ethics, compliance, and customer satisfaction.
              </p>
            </motion.div>

            <motion.div 
              className="flex gap-4 pt-4 border-t border-line/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col">
                <span className="font-mono text-label-caps uppercase text-primary/70 mb-1">Head Office</span>
                <span className="text-text-primary font-medium">New Delhi, India</span>
              </div>
              <div className="w-px h-auto bg-line/50 mx-4" />
              <div className="flex flex-col">
                <span className="font-mono text-label-caps uppercase text-primary/70 mb-1">Established</span>
                <span className="text-text-primary font-medium">2025–26</span>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-6">
            <GlassPanel className="p-8 sm:p-10 flex flex-col gap-4">
              <h3 className="font-display text-headline-md text-primary">Our Vision</h3>
              <p className="font-body text-body-md text-text-muted">
                To become one of India's most trusted pharmaceutical startups by delivering innovative healthcare solutions and creating a healthier future for all.
              </p>
            </GlassPanel>

            <GlassPanel className="p-8 sm:p-10 flex flex-col gap-4">
              <h3 className="font-display text-headline-md text-organic">Our Mission</h3>
              <ul className="flex flex-col gap-3 font-body text-body-md text-text-muted list-none p-0">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-organic/50 mt-2.5 shrink-0" />
                  <span>To provide affordable and quality medicines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-organic/50 mt-2.5 shrink-0" />
                  <span>To build long-term relationships with healthcare professionals and distributors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-organic/50 mt-2.5 shrink-0" />
                  <span>To maintain strict quality standards in all products.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-organic/50 mt-2.5 shrink-0" />
                  <span>To contribute to better healthcare outcomes across India.</span>
                </li>
              </ul>
            </GlassPanel>
          </div>

        </div>
      </div>
    </section>
  );
}
