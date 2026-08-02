/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        ocean: {
          bg: {
            primary: "#07151C",
            secondary: "#0B202B",
            elevated: "#0C2533",
          },
          surface: "#123C4D",
          brand: {
            DEFAULT: "#1F6E83",
            hover: "#26869F",
          },
          premium: "#8DE5E9",
          border: "#1F6E83/40",
          divider: "#123C4D/50",
          success: "#2CB587",
          warning: "#BA873C",
          error: "#AD3E3E",
        },
        text: {
          primary: "#F5F7F8",
          secondary: "#8DE5E9",
          muted: "#9CB3C2",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        'ocean-sm': "0 2px 8px rgba(0,0,0,0.3)",
        'ocean-md': "0 8px 16px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)",
        'ocean-lg': "0 16px 32px -8px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
}
