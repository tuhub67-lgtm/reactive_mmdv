"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";

// Совпадает с --header-offset в globals.css (scroll-margin-top якорных секций).
const HEADER_OFFSET = 72;

/**
 * Плавный инерционный скролл (Lenis), синхронизированный с GSAP ScrollTrigger.
 * При prefers-reduced-motion Lenis не запускается — используется родной мгновенный
 * скролл, но обработчик якорных ссылок всё равно регистрируется (с ручной
 * компенсацией высоты липкой шапки через window.scrollTo), чтобы клик по «Как
 * работает» и подобным ссылкам не оставлял заголовок секции под шапкой.
 *
 * ScrollTrigger регистрируется и синхронизируется с Lenis по требованию стека
 * (см. NARODNY_REAKTIV_MASTER.md, часть III) — задел под будущие GSAP-таймлайны,
 * привязанные к скроллу; сейчас все reveal-анимации сделаны через Motion's
 * whileInView, поэтому ScrollTrigger.create() пока нигде не вызывается.
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

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const lenisInstance = lenis;
      lenisInstance.on("scroll", ScrollTrigger.update);

      raf = (time: number) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // Якорные ссылки: через Lenis (учитывая липкую шапку), либо, если Lenis
    // не запущен (reduced motion), мгновенным window.scrollTo с той же поправкой.
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -HEADER_OFFSET });
      } else {
        const top =
          el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: "auto" });
      }
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onAnchorClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      if (lenis && raf) {
        gsap.ticker.remove(raf);
        lenis.destroy();
      }
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
