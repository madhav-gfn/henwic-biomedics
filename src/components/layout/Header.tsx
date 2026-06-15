import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { label: "Henmino", href: "#henmino" },
  { label: "Faunajoy", href: "#faunajoy" },
  { label: "Science", href: "#science" },
  { label: "Contact", href: "#contact" },
];

/**
 * Persistent top navigation. Its glass background sharpens from
 * near-invisible to a frosted bar as the page scrolls — read as the
 * instrument panel "powering on".
 */
export function Header() {
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 160], [0, 0.6]);
  const borderOpacity = useTransform(scrollY, [0, 160], [0, 0.1]);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: useTransform(backgroundOpacity, (v) => `rgba(5,5,5,${v})`),
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`),
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="font-display font-bold text-lg md:text-xl tracking-tight text-primary uppercase">
          Henwic Biomedics
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="#contact"
          className={cn(
            "font-mono text-label-caps uppercase tracking-[0.22em]",
            "bg-primary text-background px-5 py-2.5 rounded-full",
            "transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(0,210,106,0.5)]"
          )}
        >
          Portal
        </a>
      </div>
    </motion.header>
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