/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {

            colors: {
                primary: '#F653A6',
                champagne: '#F1DDCF',
                white: '#FFFFFF',
                whiteSmoke: '#F5F5F5',
                babypowder: '#FEFEFA',
                black: '#000000',
                slateGray: "#708090",
                cadetGray: "#91A3B0",
                lightGray: "#e0dede",
                bone: '#E3DAC9'
            },

            fontFamily: {
                josefin: ['"Josefin Sans"', 'sans-serif'],
                playfair: ['"Playfair Display"', 'serif'],
                yusei: ['"Yusei Magic"', '"Trebuchet MS"', 'Futura', '"Avenir Next"', '"Segoe UI"', '"Helvetica Neue"', 'Arial', 'system-ui', 'sans-serif'],
                vast: ['"Vast Shadow"', '"Rockwell"', '"Clarendon"', '"Bookman Old Style"', "Cambria", "Georgia", "serif"],
            },
        },
    },
    plugins: [],
};
