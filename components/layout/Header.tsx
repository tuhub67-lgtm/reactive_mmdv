"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Wordmark } from "./Wordmark";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, TELEGRAM_URL } from "@/lib/constants";

/** Липкая шапка (scarlet), уплотняется на скролле. */
export function Header() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 24);
  });

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        condensed
          ? "border-b border-gold-500/20 bg-scarlet-900/90 shadow-warm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${
          condensed ? "py-2.5" : "py-4"
        }`}
      >
        <a href="#top" aria-label="Народный реактив — наверх" className="shrink-0">
          <Wordmark tone="dark" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-body text-[15px] font-medium text-cream/85 transition-colors hover:text-gold-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Button href={TELEGRAM_URL} variant="cta">
            Бесплатный разбор
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
