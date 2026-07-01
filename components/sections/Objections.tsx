"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const qa = [
  {
    q: "Это не спам?",
    a: "Личные сообщения от лица вашей клиники, с реальным медицинским поводом. Человек вас знает — это не холодная рассылка чужим.",
  },
  {
    q: "Данные не утекут?",
    a: "Закрытый контур, доступ только у вас и у нас. База не уходит в сторонние сервисы и нейросети. Работаем по договору.",
  },
  {
    q: "А вдруг не сработает?",
    a: "Сначала бесплатный разбор базы и конкретные цифры. Платите только тогда, когда видите смысл.",
  },
  {
    q: "Долго и сложно?",
    a: "От вас — одна выгрузка базы. Остальное на нас, запуск за несколько дней.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <RevealItem className="overflow-hidden rounded-card border border-gold-500/25 bg-scarlet-900/40">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[18px] font-bold text-cream transition-colors hover:text-gold-300 sm:px-6"
        >
          <span>«{q}»</span>
          <motion.span
            className="flex-none text-gold-400"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            <Plus className="h-6 w-6" strokeWidth={2} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 font-body text-[16px] leading-relaxed text-cream/75 sm:px-6">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </RevealItem>
  );
}

export function Objections() {
  return (
    <Section tone="dark" className="!bg-scarlet-700">
      <Reveal>
        <Eyebrow tone="dark">Честно отвечаем</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 h2 text-cream">Спрашивайте прямо</h2>
      </Reveal>

      <RevealGroup className="mx-auto mt-10 flex max-w-3xl flex-col gap-3" stagger={0.08}>
        {qa.map((item) => (
          <Item key={item.q} q={item.q} a={item.a} />
        ))}
      </RevealGroup>
    </Section>
  );
}
