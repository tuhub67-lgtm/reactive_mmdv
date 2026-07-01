"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CrmMarquee } from "./CrmMarquee";

const steps = [
  {
    num: "I",
    title: "Открываем базу",
    text: "Выгрузка из вашей CRM (IDENT, Dental4Windows, 1С, Excel). База остаётся у вас — закрытый контур.",
  },
  {
    num: "II",
    title: "Находим и сегментируем своих",
    text: "Кто не был 8–12+ месяцев: гигиена год назад, недолеченные, разовые. Каждому — свой повод.",
  },
  {
    num: "III",
    title: "Зовём домой",
    text: "Персональные сообщения от лица клиники. Пациент записывается — вы получаете отчёт в деньгах.",
  },
];

/** Прочерчивающаяся золотая соединительная линия между шагами (desktop). */
function Connector() {
  return (
    <svg
      className="absolute left-0 right-0 top-[34px] hidden h-2 w-full md:block"
      viewBox="0 0 900 8"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.line
        x1="150"
        y1="4"
        x2="750"
        y2="4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="2 8"
        strokeLinecap="round"
        className="text-gold-700/60"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <Section id="how" tone="light">
      <Reveal>
        <Eyebrow tone="light">Как это работает</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 h2 max-w-[20ch] text-ink">
          Три шага — и ваши люди снова в кресле
        </h2>
      </Reveal>

      <div className="relative mt-14">
        <Connector />
        <RevealGroup className="grid gap-10 md:grid-cols-3 md:gap-8" stagger={0.14}>
          {steps.map((s) => (
            <RevealItem key={s.num} className="relative text-center md:px-2">
              <span className="relative z-[1] mx-auto grid h-[68px] w-[68px] place-items-center rounded-full border-2 border-gold-500/70 bg-parchment font-display text-[26px] font-extrabold text-gold-700 shadow-warm">
                {s.num}
              </span>
              <h3 className="mt-5 font-display text-[21px] font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-sm font-body text-[16px] leading-relaxed text-ink/75">
                {s.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* плашка про данные */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex items-start gap-3 rounded-card border border-gold-700/30 bg-parchment-deep/60 p-5">
          <ShieldCheck className="mt-0.5 h-6 w-6 flex-none text-gold-700" strokeWidth={1.8} aria-hidden="true" />
          <p className="font-body text-[15px] text-ink/85">
            <span className="font-semibold text-ink">Данные не уходят в чужие нейросети.</span>{" "}
            Работаем по договору, в закрытом контуре.
          </p>
        </div>
      </Reveal>

      {/* marquee CRM */}
      <div className="mt-10">
        <CrmMarquee />
      </div>
    </Section>
  );
}
