import type { Config } from "tailwindcss";

// Design system tokens map to the CSS variables defined in globals.css.
// The rgb(var(--x) / <alpha-value>) form lets Tailwind opacity utilities work.
function token(name: string) {
  return `rgb(var(--${name}) / <alpha-value>)`;
}

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "72rem",
      },
    },
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
        primary: {
          DEFAULT: token("primary"),
          hover: token("primary-hover"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        border: token("border"),
        success: {
          DEFAULT: token("success"),
          foreground: token("success-foreground"),
        },
        cream: token("cream"),
        sage: token("sage"),
        warning: {
          DEFAULT: token("warning"),
          foreground: token("warning-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        ring: token("ring"),
        wood: {
          DEFAULT: token("wood"),
          dark: token("wood-dark"),
          light: token("wood-light"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Warm and calm, not bubbly. Cards cap at 14px, buttons at 10 to 12px.
        lg: "0.625rem",
        xl: "0.75rem",
        "2xl": "0.875rem",
      },
      boxShadow: {
        // Matte. Borders do the work, shadows are a whisper.
        soft: "0 1px 2px rgb(31 31 27 / 0.04)",
        lift: "0 2px 8px rgb(31 31 27 / 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
