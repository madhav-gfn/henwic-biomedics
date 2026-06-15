import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "../lib/gsap";

/**
 * Drives the whole page with Lenis for buttery smooth scrolling,
 * and keeps GSAP's ScrollTrigger in sync with Lenis's virtual scroll position.
 *
 * Mount once near the root of the app.
 */
export function useLenis() {
  useEffect(() => {
    ensureGsapPlugins();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}