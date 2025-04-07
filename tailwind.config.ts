
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
        'orbitron': ['Orbitron', 'sans-serif'],
        'kode-mono': ['Kode Mono', 'monospace'],
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
        'cyber-black': '#0D0208',
        'cyber-darkgray': '#1A1A1D',
        'cyber-red': '#FF073A',
        'cyber-orange': '#F97316',
        'cyber-blue': '#00FFFF',
        'cyber-yellow': '#FFFF00',
        'sidebar': {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "0.99",
            filter: "brightness(1)"
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.4",
            filter: "brightness(0.8)"
          }
        },
        "glow": {
          "0%, 100%": {
            textShadow: "0 0 2px rgba(249, 115, 22, 0.7), 0 0 5px rgba(249, 115, 22, 0.5)"
          },
          "50%": {
            textShadow: "0 0 5px rgba(249, 115, 22, 0.9), 0 0 10px rgba(249, 115, 22, 0.7)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flicker": "flicker 3s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      boxShadow: {
        'neon-orange': '0 0 5px 2px rgba(249, 115, 22, 0.5)',
        'neon-red': '0 0 5px 2px rgba(255, 7, 58, 0.5)',
        'neon-blue': '0 0 5px 2px rgba(0, 255, 255, 0.5)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
