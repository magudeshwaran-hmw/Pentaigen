import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["'Instrument Serif'", "Georgia", "serif"],
        body: ["'Geist'", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        penta: {
          bg: "hsl(var(--penta-bg))",
          surface1: "hsl(var(--penta-surface1))",
          surface2: "hsl(var(--penta-surface2))",
          surface3: "hsl(var(--penta-surface3))",
          text1: "hsl(var(--penta-text1))",
          text2: "hsl(var(--penta-text2))",
          text3: "hsl(var(--penta-text3))",
          teal: "hsl(var(--penta-teal))",
          "teal-light": "hsl(var(--penta-teal-light))",
          "teal-mid": "hsl(var(--penta-teal-mid))",
          blue: "hsl(var(--penta-blue))",
          "blue-light": "hsl(var(--penta-blue-light))",
          "blue-mid": "hsl(var(--penta-blue-mid))",
          violet: "hsl(var(--penta-violet))",
          "violet-light": "hsl(var(--penta-violet-light))",
          "violet-mid": "hsl(var(--penta-violet-mid))",
          rose: "hsl(var(--penta-rose))",
          "rose-light": "hsl(var(--penta-rose-light))",
          "rose-mid": "hsl(var(--penta-rose-mid))",
          amber: "hsl(var(--penta-amber))",
          "amber-light": "hsl(var(--penta-amber-light))",
          "amber-mid": "hsl(var(--penta-amber-mid))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.125rem",
        "2xl": "1.375rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        penta: "var(--shadow-sm)",
        "penta-md": "var(--shadow-md)",
        "penta-lg": "var(--shadow-lg)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
