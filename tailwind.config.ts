import type { Config } from "tailwindcss";

/**
 * Дизайн-токены «Народного реактива» — направление «Богатырский лубок».
 * Насыщенный красный (сила, тепло) + сусальное золото (узор, цифры, CTA)
 * + пергамент (светлые секции, НЕ белый). Синего/зелёного из прошлых версий нет.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scarlet: {
          900: "#4A0A0A", // фон тёмных секций
          700: "#7A1414",
          600: "#A31B1B", // базовый брендовый красный
          500: "#C22626", // яркий акцент
        },
        gold: {
          700: "#8A6A1F", // тёмное золото, обводки на светлом
          500: "#C9A227", // базовое золото
          400: "#E4BC3F", // яркое, узоры и подсветка
          300: "#F3D878", // самое светлое, текст на красном
        },
        parchment: {
          DEFAULT: "#F7EFDD", // светлый фон
          deep: "#EFE2C0", // карточки на светлом
        },
        ink: "#241207", // текст на светлом (тёплый почти-чёрный)
        cream: "#FBF3E4", // текст на тёмном
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "rgba(201,162,39,.35)", // line-gold по умолчанию
      },
      borderRadius: {
        card: "16px",
        xl2: "20px",
      },
      boxShadow: {
        warm: "0 14px 34px -16px rgba(74,10,10,.35)",
        lift: "0 22px 50px -20px rgba(74,10,10,.45)",
        goldGlow:
          "0 0 0 1px rgba(201,162,39,.4), 0 18px 46px -18px rgba(201,162,39,.4)",
        cta: "0 12px 30px -10px rgba(201,162,39,.6)",
      },
      maxWidth: {
        content: "1160px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
