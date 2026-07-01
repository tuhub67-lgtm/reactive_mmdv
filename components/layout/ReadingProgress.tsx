"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Тонкий золотой индикатор прогресса чтения вверху страницы. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300"
      style={{ scaleX }}
    />
  );
}
