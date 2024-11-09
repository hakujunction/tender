import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Override the default green color
        green: {
          100: '#8ACE00',  // Light green variant
          200: '#8ACE00',  // Medium-light green
          300: '#8ACE00',  // Medium green
          400: '#8ACE00',  // Default green
          500: '#8ACE00',  // Darker green
          600: '#8ACE00',  // Even darker green
          700: '#8ACE00',  // Very dark green
          800: '#8ACE00',  // Almost black green
          900: '#8ACE00',  // Deep green
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
