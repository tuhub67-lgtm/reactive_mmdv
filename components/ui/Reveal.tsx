"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Появление одного элемента: fade + подъём.
 *
 * Всегда рендерит motion-элемент (без ветвления по useReducedMotion) —
 * сокращение анимации для reduced-motion пользователей обрабатывает
 * <MotionConfig reducedMotion="user"> в SmoothScroll, на уровне рантайма,
 * без изменения структуры разметки (иначе — рассинхрон SSR/CSR).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Контейнер со стаггером: дети с классом/варинтом появляются по очереди. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

/** Ребёнок стаггер-группы. */
export function RevealItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
