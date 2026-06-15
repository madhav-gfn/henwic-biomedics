/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0e0e0e",
        "surface-raised": "#131313",
        "surface-elevated": "#1c1b1b",

        // HENMINO — vibrant clinical green, the "active" voice
        primary: "#00D26A",
        "primary-bright": "#42EF83",
        "primary-dim": "#005A2C",

        // FAUNAJOY — softer sage / biological tones
        organic: "#9CE1B3",
        "organic-deep": "#81C599",
        "organic-dim": "#03522F",
        "organic-glow": "#ACF2C3",

        secondary: "#4ADE80",
        glow: "#B8FFCF",

        "text-primary": "#F8FAFC",
        "text-muted": "#A1A1AA",

        line: "rgba(255,255,255,0.07)",
        "line-strong": "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        display: ["Hanken Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      fontSize: {
        "display-hero": [
          "clamp(3.5rem, 9vw, 7.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        "headline-lg": [
          "clamp(2.25rem, 5vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "headline-md": [
          "clamp(1.5rem, 2.6vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "body-lg": ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-caps": [
          "0.625rem",
          { lineHeight: "0.75rem", letterSpacing: "0.22em", fontWeight: "700" },
        ],
        "technical-data": [
          "0.75rem",
          { lineHeight: "1rem", letterSpacing: "0.05em", fontWeight: "400" },
        ],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "grid-gutter": "1.5rem",
        "grid-margin": "4rem",
        "section-gap": "clamp(5rem, 10vw, 10rem)",
      },
      maxWidth: {
        container: "1440px",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        flow: {
          to: { strokeDashoffset: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "drift-slow": {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(2%, -4%, 0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
      },
      animation: {
        flow: "flow 4s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "drift-slow": "drift-slow 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};   