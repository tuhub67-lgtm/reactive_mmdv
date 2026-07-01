import { Check, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const adRows = [
  "1 500–5 000 ₽ за один лид",
  "Долго: разогрев холодной аудитории",
  "Не факт, что дойдёт до кресла",
  "Разовый эффект — платишь снова и снова",
];

const usRows = [
  "≈ 0 ₽ за возврат своего пациента",
  "Уже вас знают и доверяют",
  "Запуск за несколько дней",
  "Тянет за собой повторные визиты",
];

const benchmarks = [
  "Мультиконтакт (3–5 касаний) возвращает 15–25% спящих",
  "SMS читают в разы чаще писем",
  "Чем раньше позвать — тем выше возврат",
];

export function WhyItWorks() {
  return (
    <Section tone="dark">
      <Reveal>
        <Eyebrow tone="dark">Экономика</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 h2 max-w-[16ch] text-cream">Считайте деньги, а не показы</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Реклама на новых — приглушённая */}
        <Reveal>
          <div className="h-full rounded-card border border-cream/10 bg-scarlet-700/30 p-6 sm:p-7">
            <p className="font-display text-[20px] font-bold text-cream/70">Реклама на новых</p>
            <ul className="mt-5 space-y-3.5">
              {adRows.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-cream/60">
                  <X className="mt-0.5 h-5 w-5 flex-none text-cream/35" strokeWidth={2} aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Народный реактив — выделенная колонка */}
        <Reveal delay={0.08}>
          <div className="relative h-full rounded-card border-2 border-gold-500/70 bg-scarlet-700/55 p-6 shadow-goldGlow sm:p-7">
            <p className="font-display text-[20px] font-bold text-gold-300">Народный реактив</p>
            <ul className="mt-5 space-y-3.5">
              {usRows.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-cream/90">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-gold-400" strokeWidth={2.4} aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* бенчмарки */}
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3" stagger={0.1}>
        {benchmarks.map((b) => (
          <RevealItem
            key={b}
            className="rounded-card border border-gold-500/15 bg-scarlet-900/40 p-4 text-[14px] text-cream/70"
          >
            {b}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
