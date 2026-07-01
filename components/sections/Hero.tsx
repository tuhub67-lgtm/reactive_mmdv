import { ShieldCheck, Clock, HandCoins } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Kaima } from "@/components/ornament/Kaima";
import { HeroMoneyCard } from "./HeroMoneyCard";
import { PRIMARY_CTA, TELEGRAM_URL } from "@/lib/constants";

const trust = [
  { icon: ShieldCheck, text: "Данные не покидают клинику" },
  { icon: HandCoins, text: "Без обязательств на старте" },
  { icon: Clock, text: "Запуск за несколько дней" },
];

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-scarlet-900 pb-0 pt-28 text-cream sm:pt-32">
      <div className="hero-bg" aria-hidden="true" />
      {/* мягкое затемнение к низу для читаемости каймы */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-scarlet-900 to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative z-[2] grid items-center gap-12 pb-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-28">
        <div>
          <Reveal>
            <Eyebrow tone="dark">Для частных стоматологий</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 h1">
              В вашей базе спит{" "}
              <span className="text-gold-300">выручка</span>.{" "}
              <span className="text-gold-300">Достаём&nbsp;её.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="lead mt-6 max-w-xl text-cream/80">
              Народный реактив находит в базе клиники пациентов, которые давно не
              приходили, и по-человечески возвращает их — без рекламного бюджета.
              Работаем со своими, кто вас уже знает.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={TELEGRAM_URL} variant="cta" className="sm:w-auto w-full">
                {PRIMARY_CTA}
              </Button>
              <Button href="#how" variant="ghost" tone="dark" external={false} className="sm:w-auto w-full">
                Как это работает
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {trust.map((t) => (
                <li key={t.text} className="flex items-center gap-2 text-[14px] text-cream/70">
                  <t.icon className="h-4 w-4 flex-none text-gold-400" strokeWidth={1.8} aria-hidden="true" />
                  {t.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <HeroMoneyCard />
        </Reveal>
      </div>

      {/* полоса-доказательство */}
      <div className="relative z-[2] border-t border-gold-500/15">
        <div className="container-x py-5">
          <p className="text-center font-body text-[14px] text-cream/75 sm:text-[15px]">
            Реактивация — самый дешёвый источник выручки:{" "}
            <span className="font-semibold text-gold-300">
              в 5–25 раз дешевле
            </span>{" "}
            привлечения нового пациента.
          </p>
        </div>
      </div>

      {/* орнаментальная кайма внизу */}
      <div className="relative z-[2] text-gold-500">
        <Kaima />
      </div>
    </section>
  );
}
