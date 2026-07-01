import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Corners } from "@/components/ornament/Corners";
import { PRIMARY_CTA, TELEGRAM_URL } from "@/lib/constants";

const tiers = [
  {
    name: "Разбор базы",
    price: "Бесплатно",
    note: "Выгружаем, считаем, показываем ваши реальные цифры. Без обязательств.",
    cta: PRIMARY_CTA,
    featured: true,
  },
  {
    name: "Запуск",
    price: "от 80 000 ₽",
    note: "Настройка системы под вашу базу и CRM. Можно оплатить 50/50.",
    cta: "Обсудить запуск",
    featured: false,
  },
  {
    name: "Ведение",
    price: "от 30 000 ₽/мес",
    note: "Регулярные волны реактивации + ежемесячный отчёт в деньгах. Без долгих контрактов — остановить можно когда угодно.",
    cta: "Обсудить ведение",
    featured: false,
  },
];

export function Pricing() {
  return (
    <Section id="pricing" tone="light">
      <Reveal>
        <Eyebrow tone="light">Цены сразу</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 h2 max-w-[20ch] text-ink">
          Понятные условия, без мелкого шрифта
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid items-stretch gap-6 md:grid-cols-3" stagger={0.1}>
        {tiers.map((t) => (
          <RevealItem
            key={t.name}
            className={`relative flex flex-col rounded-xl2 p-7 transition-transform duration-300 hover:-translate-y-1 ${
              t.featured
                ? "border-2 border-gold-500 bg-white shadow-lift"
                : "border border-gold-700/25 bg-parchment-deep/60 shadow-warm"
            }`}
          >
            {t.featured && <Corners className="text-gold-500" size={40} inset={9} />}
            {t.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-b from-gold-400 to-gold-500 px-3 py-1 font-body text-[11.5px] font-bold uppercase tracking-[0.1em] text-scarlet-900">
                Начните здесь
              </span>
            )}

            <h3 className="font-display text-[22px] font-bold text-ink">{t.name}</h3>
            <p
              className={`mt-2 font-display text-[clamp(28px,4vw,34px)] font-extrabold leading-none ${
                t.featured ? "text-scarlet-600" : "text-gold-700"
              }`}
            >
              {t.price}
            </p>
            <p className="mt-4 flex-1 font-body text-[15px] leading-relaxed text-ink/75">
              {t.note}
            </p>

            <div className="mt-6">
              {t.featured ? (
                <Button href={TELEGRAM_URL} variant="cta" className="w-full">
                  {t.cta}
                </Button>
              ) : (
                <Button href={TELEGRAM_URL} variant="ghost" tone="light" className="w-full">
                  {t.cta}
                </Button>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center font-body text-[15px] text-ink/70">
          Никаких скрытых процентов. Что видите — то и платите.
        </p>
      </Reveal>
    </Section>
  );
}
