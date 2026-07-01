"use client";

import { motion } from "motion/react";

/**
 * Печать-клеймо — круглый орнаментальный знак доверия (в духе гербовой печати).
 * Золото. Лёгкая анимация «оттиска» (scale + fade) при входе в вьюпорт.
 * Reduced-motion обрабатывается глобально через <MotionConfig reducedMotion="user">.
 */
export function Seal({
  className = "",
  label = "· ДАННЫЕ ЗАЩИЩЕНЫ · ЗАКРЫТЫЙ КОНТУР",
  size = 128,
}: {
  className?: string;
  label?: string;
  size?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.82, opacity: 0, rotate: -6 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="text-gold-500"
      >
        <defs>
          <path id="seal-ring" d="M64 64 m 0 -49 a 49 49 0 1 1 -0.01 0" />
        </defs>
        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="64" cy="64" r="49" stroke="currentColor" strokeWidth="2.4" />
        <text
          className="fill-gold-500 font-body font-bold uppercase"
          fontSize="8.6"
        >
          <textPath href="#seal-ring" startOffset="0" textLength="300" lengthAdjust="spacingAndGlyphs">
            {label}
          </textPath>
        </text>
        {/* центральная богатырская розетка-щит */}
        <g stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none">
          <path d="M64 40 L82 48 L82 66 C 82 78, 74 86, 64 90 C 54 86, 46 78, 46 66 L46 48 Z" />
          <path d="M64 52 L72 58 L64 64 L56 58 Z" fill="currentColor" stroke="none" />
          <path d="M64 66 L64 80" />
        </g>
      </svg>
    </motion.div>
  );
}
