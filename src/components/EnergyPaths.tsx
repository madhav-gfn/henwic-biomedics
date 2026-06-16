import { cn } from "../lib/utils";

interface EnergyPathsProps {
  className?: string;
}

/**
 * Flowing SVG energy traces — stroke-dash animation keeps motion on the
 * compositor without DOM layout cost.
 */
export function EnergyPaths({ className }: EnergyPathsProps) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full pointer-events-none opacity-40", className)}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="energy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D26A" stopOpacity="0" />
          <stop offset="50%" stopColor="#42EF83" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00D26A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="energy-path"
        d="M-40 420 C 280 180, 520 640, 820 380 S 1280 120, 1500 520"
        fill="none"
        stroke="url(#energy-gradient)"
        strokeWidth="1.5"
      />
      <path
        className="energy-path energy-path-delayed"
        d="M-20 680 C 320 820, 580 420, 900 720 S 1320 860, 1520 640"
        fill="none"
        stroke="url(#energy-gradient)"
        strokeWidth="1"
      />
      <path
        className="energy-path energy-path-slow"
        d="M200 -40 C 480 260, 640 80, 960 300 S 1380 520, 1440 200"
        fill="none"
        stroke="url(#energy-gradient)"
        strokeWidth="0.75"
      />
    </svg>
  );
}
