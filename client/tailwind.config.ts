import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nafeza Brand Colors (Modernized)
        nafeza: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          500: '#334e68', // Primary Navy
          600: '#243b53', // Darker Navy
          700: '#102a43', // Deepest Navy (Sidebar)
          accent: '#d69e2e', // Gold (for "Premium" or "Action" buttons)
        },
        status: {
          success: '#38a169', // Green (Approved)
          warning: '#dd6b20', // Orange (Pending)
          error: '#e53e3e',   // Red (Rejected)
        }
      },
      fontFamily: {
        // We will use 'Inter' or 'Cairo' (for Arabic support later)
        sans: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
};
export default config;