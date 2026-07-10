import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Science", href: "#science" },
  { label: "Gallery", href: "#gallery" },
] as const;

/**
 * Persistent top navigation with mobile hamburger drawer.
 * Glass background sharpens as page scrolls.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 160], [0, 0.72]);
  const borderOpacity = useTransform(scrollY, [0, 160], [0, 0.1]);
  const backgroundColor = useTransform(backgroundOpacity, (v) => `rgba(5,5,5,${v})`);
  const borderBottom = useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor,
          borderBottom,
        }}
      >
        <div className="container-page flex items-center justify-between h-14 sm:h-16 md:h-20">
          <a
            href="#top"
            className="font-display font-bold text-base sm:text-lg md:text-xl tracking-tight text-primary uppercase"
          >
            Henwic Biomedics
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA button — hidden on very small screens */}
            <a
              href="#contact"
              className={cn(
                "hidden sm:inline-flex font-mono text-label-caps uppercase tracking-[0.22em]",
                "bg-primary text-background px-4 py-2 md:px-5 md:py-2.5 rounded-full",
                "transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(0,210,106,0.5)]"
              )}
            >
              Contact
            </a>

            {/* Hamburger button — visible below lg */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
              <span
                className={cn(
                  "block absolute h-[2px] w-6 bg-text-primary rounded-full transition-all duration-300",
                  mobileOpen ? "rotate-45 top-[19px]" : "top-[13px]"
                )}
              />
              <span
                className={cn(
                  "block absolute h-[2px] w-6 bg-text-primary rounded-full transition-all duration-300",
                  mobileOpen ? "opacity-0" : "top-[19px]"
                )}
              />
              <span
                className={cn(
                  "block absolute h-[2px] w-6 bg-text-primary rounded-full transition-all duration-300",
                  mobileOpen ? "-rotate-45 top-[19px]" : "top-[25px]"
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              className="absolute top-14 sm:top-16 inset-x-0 bg-surface/95 backdrop-blur-xl border-b border-line"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-label="Mobile navigation"
            >
              <div className="container-page py-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-lg text-text-muted hover:text-primary py-3 px-4 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile-only CTA */}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "mt-4 text-center font-mono text-label-caps uppercase tracking-[0.22em]",
                    "bg-primary text-background px-5 py-3 rounded-full",
                    "transition-shadow duration-300"
                  )}
                >
                  Get in Touch
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="relative font-mono text-label-caps uppercase text-text-muted hover:text-primary transition-colors duration-300 group"
    >
      {children}
      <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
