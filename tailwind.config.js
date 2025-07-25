/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e6e6e6", // hsl(220 13% 91%)
        input: "#e6e6e6", // hsl(220 13% 91%)
        ring: "#8cc34a", // hsl(142 76% 36%)
        background: "#f9faff", // hsl(250 100% 99%)
        foreground: "#2e2a2a", // hsl(225 15% 15%)
        primary: {
          DEFAULT: "#6ea22e", // hsl(142 76% 36%)
          foreground: "#ffffff", // hsl(0 0% 100%)
          glow: "#a6d24d", // hsl(142 86% 60%)
        },
        secondary: {
          DEFAULT: "#c6d9f5", // hsl(210 40% 96%)
          foreground: "#2e2a2a", // hsl(225 15% 15%)
        },
        destructive: {
          DEFAULT: "#e63946", // hsl(0 84.2% 60.2%)
          foreground: "#ffffff", // hsl(0 0% 100%)
        },
        muted: {
          DEFAULT: "#dbe1f5", // hsl(220 14% 96%)
          foreground: "#6f7a9d", // hsl(220 8.9% 46.1%)
        },
        accent: {
          DEFAULT: "#f0f9f0", // hsl(142 76% 95%)
          foreground: "#6ea22e", // hsl(142 76% 36%)
        },
        popover: {
          DEFAULT: "#ffffff", // hsl(0 0% 100%)
          foreground: "#2e2a2a", // hsl(225 15% 15%)
        },
        card: {
          DEFAULT: "#ffffff", // hsl(0 0% 100%)
          foreground: "#2e2a2a", // hsl(225 15% 15%)
        },
        success: {
          DEFAULT: "#6ea22e", // hsl(142 76% 36%)
          foreground: "#ffffff", // hsl(0 0% 100%)
        },
        warning: {
          DEFAULT: "#f7b500", // hsl(43 96% 56%)
          foreground: "#ffffff", // hsl(0 0% 100%)
        },
        sidebar: {
          DEFAULT: "#fafafa", // hsl(0 0% 98%)
          foreground: "#434343", // hsl(240 5.3% 26.1%)
          primary: "#3a3a3a", // hsl(240 5.9% 10%)
          "primary-foreground": "#fafafa", // hsl(0 0% 98%)
          accent: "#f5f5f5", // hsl(240 4.8% 95.9%)
          "accent-foreground": "#3a3a3a", // hsl(240 5.9% 10%)
          border: "#e6e6e6", // hsl(220 13% 91%)
          ring: "#d6b23a", // hsl(217.2 91.2% 59.8%)
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6ea22e, #a6d24d)",
        "gradient-accent": "linear-gradient(135deg, #f0f9f0, #c6d9f5)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(110, 162, 46, 0.05)",
        md: "0 4px 6px -1px rgba(110, 162, 46, 0.1)",
        lg: "0 10px 15px -3px rgba(110, 162, 46, 0.1)",
      },
      transitionDuration: {
        smooth: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
