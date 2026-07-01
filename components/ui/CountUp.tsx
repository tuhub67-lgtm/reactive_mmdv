"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { formatRu } from "@/lib/format";

/**
 * Count-up крупных цифр: при входе в вьюпорт число «сбрасывается» и считается
 * до value; при последующих изменениях value (калькулятор) плавно досчитывает
 * от текущего к новому. prefers-reduced-motion — через MotionConfig глобально
 * не относится к этому компоненту (он не использует motion.*), поэтому здесь
 * проверяем matchMedia сами, но ТОЛЬКО внутри эффекта (после монтирования) —
 * никогда в первом рендере. Так исходный HTML на сервере и клиенте совпадает
 * (оба показывают готовое отформатированное значение), а лёгкое покадровое
 * обновление текста — чисто клиентское улучшение поверх гидратации.
 */
export function CountUp({
  value,
  format = formatRu,
  className = "",
  duration = 1,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  // SSR-safe: и сервер, и первый клиентский рендер показывают финальное значение.
  const [display, setDisplay] = useState(() => format(value));
  const current = useRef(0);
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (!inView) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      current.current = value;
      hasRevealed.current = true;
      setDisplay(format(value));
      return;
    }

    const from = hasRevealed.current ? current.current : 0;
    hasRevealed.current = true;

    const controls = animate(from, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        current.current = v;
        setDisplay(format(v));
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
