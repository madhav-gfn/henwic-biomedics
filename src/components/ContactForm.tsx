import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { EASE_SMOOTH } from "../lib/motion";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      await emailjs.sendForm(
        "service_vaf7e4c",
        "template_g5nihaw",
        formRef.current,
        "BiXlLjEsMNckwT4E2"
      );
      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-xl mx-auto mt-12 bg-surface p-8 rounded-2xl border border-line"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.2 }}
    >
      <h3 className="font-display text-2xl text-primary mb-6 text-left">Get in Touch</h3>
      
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-left">
          Thank you! Your message has been sent successfully. We will get back to you soon.
        </div>
      )}
      
      {status === "error" && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor="user_name" className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            className="bg-transparent border-b border-line px-0 py-2 focus:outline-none focus:border-primary text-text-main placeholder:text-text-muted/50 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="user_email" className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Email
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            className="bg-transparent border-b border-line px-0 py-2 focus:outline-none focus:border-primary text-text-main placeholder:text-text-muted/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="bg-transparent border-b border-line px-0 py-2 focus:outline-none focus:border-primary text-text-main placeholder:text-text-muted/50 transition-colors resize-none"
            placeholder="How can we help you?"
          />
        </div>

        <div className="mt-4 flex justify-start">
          <MagneticButton type="submit" className={isSubmitting ? "opacity-50 pointer-events-none" : ""}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}
