/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                josefin: ['"Josefin Sans"', 'sans-serif'],
                playfair: ['"Playfair Display"', 'serif'], // if you're keeping both
            },
        },
    },
    plugins: [],
};
