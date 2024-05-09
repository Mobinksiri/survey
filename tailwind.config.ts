import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         gridColumn: {
            "span-13": "span 13 / span 13",
            "span-14": "span 14 / span 14",
            "span-15": "span 15 / span 15",
            "span-16": "span 16 / span 16",
            "span-17": "span 17 / span 17",
            "span-18": "span 18 / span 18",
            "span-20": "span 20 / span 20",
         },
         gridTemplateColumns: {
            // Simple 16 column grid
            "16": "repeat(16, minmax(0, 1fr))",
            "17": "repeat(17, minmax(0, 1fr))",
            "18": "repeat(18, minmax(0, 1fr))",
            "19": "repeat(19, minmax(0, 1fr))",
            "20": "repeat(20, minmax(0, 1fr))",
         },
         lineClamp: {
            7: "7",
            8: "8",
            9: "9",
            10: "10",
         },
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         colors: {
            text1: "#272727",
            text3: "#858687",
            gray1: "#c6c6c6",
            gray2: "#EFEFEF",
            PostCardBg: "#fbfbfb",
            green1: "#00B894",
            primary: "#26373B",
            red: "#F54D42",
            white1: "#F0F0F0",
            green5: "#0B3940",
            green3: "#101D20",
            green4: "#2D8489",
            dark: "#111617",
            orange: "#D1704B",
            yellow: "#fdcb6e",
            purple: "#A964AD",
         },
      },
      container: {
         screens: {
            sm: "600px",
            md: "728px",
            lg: "984px",
            xl: "1200px",
         },
      },
      boxShadow: {
         default: "0 6px 25px rgba(187, 187, 187, .25)",
         dropdown: "0px 6px 12px 0px rgba(0, 0, 0, 0.08), 0px -1px 12px 0px rgba(0, 0, 0, 0.08)",
      },
   },
   plugins: [],
};
export default config;
