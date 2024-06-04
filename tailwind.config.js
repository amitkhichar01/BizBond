/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                nunito: ["var(--font-nunito)", "sans-serif"],
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                playfair: ["var(--font-playfair)", "serif"],
                raleway: ["var(--font-raleway)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
