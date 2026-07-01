"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";

/**
 * Плавный инерционный скролл (Lenis), синхронизированный с GSAP ScrollTrigger.
 * При prefers-reduced-motion Lenis не запускается — остаётся родной мгновенный скролл.
 *
 * MotionConfig reducedMotion="user": все motion-анимации в приложении становятся
 * мгновенными для пользователей с system-настройкой «уменьшить движение».
 * Это решение НАМЕРЕННО не ветвит JSX-структуру по useReducedMotion() в компонентах —
 * такое ветвление даёт разный HTML на сервере и клиенте (SSR всегда «не reduced»,
 * а первый клиентский рендер уже видит реальную настройку через matchMedia)
 * и ломает гидратацию (React error #418). MotionConfig отключает анимации
 * на уровне рантайма, не меняя разметку.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Якорные ссылки едут через Lenis (учитывая липкую шапку)
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onAnchorClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
