"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA, TELEGRAM_URL } from "@/lib/constants";

/** Липкая CTA-кнопка внизу экрана на мобильном (появляется после hero). */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShow(y > 620);
  });

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold-500/25 bg-scarlet-900/95 p-3 backdrop-blur-md sm:hidden"
      initial={{ y: 100 }}
      animate={{ y: show ? 0 : 100 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <Button href={TELEGRAM_URL} variant="cta" className="w-full">
        {PRIMARY_CTA}
      </Button>
    </motion.div>
  );
}
