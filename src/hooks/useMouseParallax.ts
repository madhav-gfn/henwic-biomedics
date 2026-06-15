import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface UseMouseParallax {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Tracks the cursor across the whole viewport and exposes spring-smoothed
 * motion values in the range [-strength, strength]. Designed to be wired
 * into `style={{ x, y }}` on layered elements for ambient depth.
 *
 * Pure motion-value updates — never triggers a React re-render.
 */
export function useMouseParallax(strength = 20): UseMouseParallax {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.4 });

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      x.set(nx * strength);
      y.set(ny * strength);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [x, y, strength]);

  return { x: springX, y: springY };
}