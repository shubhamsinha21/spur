/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  colors: {
    bg: "#0f172a",        // slate-900
    card: "#020617",      // slate-950
    accent: "#6366f1",    // indigo-500
    muted: "#94a3b8",     // slate-400
  },
}

  },
  plugins: [],
};
