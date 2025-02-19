module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the src folder and subfolders
    "./public/index.html" // Include the public index.html for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        primary: "#1E3A8A",
        secondary: "#D1D5DB",
      },
      spacing: {
        // Add custom spacing values if required
        128: "32rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For better styling of form elements
    require('@tailwindcss/typography'), // For rich text utilities
  ],
};
