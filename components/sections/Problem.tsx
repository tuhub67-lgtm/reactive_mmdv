import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Corners } from "@/components/ornament/Corners";
import { CountUp } from "@/components/ui/CountUp";

function FactCard({
  children,
  number,
}: {
  children: React.ReactNode;
  number: React.ReactNode;
}) {
  return (
    <RevealItem className="group relative rounded-card border border-gold-700/25 bg-parchment-deep/70 p-7 shadow-warm transition-transform duration-300 hover:-translate-y-1">
      <Corners className="text-gold-700/60" size={34} inset={9} corners={["tl", "br"]} />
      <p className="font-display text-[clamp(30px,5vw,40px)] font-extrabold leading-none">
        {number}
      </p>
      <p className="mt-4 font-body text-[16px] leading-relaxed text-ink/80">{children}</p>
    </RevealItem>
  );
}

export function Problem() {
  return (
    <Section id="problem" tone="light">
      <Reveal>
        <Eyebrow tone="light">Где утекают деньги</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 h2 max-w-[18ch] text-ink">
          У средней клиники 60–80% базы молчит
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        <FactCard
          number={
            <span className="text-scarlet-600">
              ~<CountUp value={25} />%
            </span>
          }
        >
          пациентов в год теряет средняя клиника — тихо, без скандалов.
        </FactCard>
        <FactCard number={<span className="text-scarlet-600">1 500–5 000&nbsp;₽</span>}>
          цена одного нового пациента с рекламы. И не факт, что дойдёт.
        </FactCard>
        <FactCard number={<span className="text-gold-700">≈&nbsp;0&nbsp;₽</span>}>
          цена возврата своего. Доверие он вам уже заплатил.
        </FactCard>
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-12 font-display text-[clamp(22px,3.4vw,32px)] font-extrabold leading-tight text-scarlet-700">
          Вы платите за чужих, пока свои спят в базе.
        </p>
      </Reveal>
    </Section>
  );
}
