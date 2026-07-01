"use client";

import { motion } from "motion/react";

/**
 * Травный узор — тонкая золотая вьющаяся линия с завитками и листьями.
 * Разделитель секций / обрамление. Прорисовывается (stroke-draw) при входе
 * в вьюпорт, как будто выводят кистью. Симметрична относительно центра.
 * Reduced-motion обрабатывается глобально через <MotionConfig reducedMotion="user">.
 */
export function Vine({
  className = "",
  width = 460,
}: {
  className?: string;
  width?: number;
}) {
  // Половина узора (левая), правая — зеркало через scale(-1,1)
  const half = (
    <>
      {/* основная вьющаяся линия к центру */}
      <path d="M6 24 C 70 24, 96 24, 120 24 C 150 24, 156 10, 176 12 C 192 13.5, 192 27, 178 27 C 170 27, 168 19, 176 18" />
      {/* лист на изгибе */}
      <path d="M120 24 C 128 14, 140 12, 150 15 C 140 20, 130 22, 120 24 Z" />
      {/* маленький завиток-усик */}
      <path d="M92 24 C 96 18, 104 18, 106 23" />
      {/* точка-бусина */}
      <circle cx="60" cy="24" r="1.8" />
    </>
  );

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <svg
      className={className}
      width={width}
      height={(width * 48) / 460}
      viewBox="0 0 460 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0 } } }}
      >
        {/* центральная розетка-ромб */}
        <motion.g variants={draw}>
          <path d="M230 12 L242 24 L230 36 L218 24 Z" />
          <circle cx="230" cy="24" r="3.4" />
        </motion.g>
        {/* левая половина */}
        <motion.g variants={draw} style={{ transform: "translateX(0px)" }}>
          {half}
        </motion.g>
        {/* правая половина (зеркало) */}
        <motion.g
          variants={draw}
          style={{ transformOrigin: "230px 24px", transform: "scaleX(-1)" }}
        >
          {half}
        </motion.g>
      </motion.g>
    </svg>
  );
}
