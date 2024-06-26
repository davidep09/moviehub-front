// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        fontFamily: {
            'logo': ["Tac One", "sans-serif"],
            'body': ["Roboto", "sans-serif"],
        },
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
};
