import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Vine } from "@/components/ornament/Vine";

export function Reframe() {
  return (
    <Section tone="dark" className="!bg-scarlet-700">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow tone="dark" className="justify-center">
            Простая мысль
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mt-6">
            <span
              className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-[80px] leading-none text-gold-500/40 sm:-left-6"
              aria-hidden="true"
            >
              «
            </span>
            <h2 className="h2 text-cream">
              Самый дешёвый источник выручки у вас уже есть —{" "}
              <span className="text-gold-300">это ваша база</span>
            </h2>
            <span
              className="pointer-events-none absolute -bottom-12 -right-2 select-none font-display text-[80px] leading-none text-gold-500/40 sm:-right-6"
              aria-hidden="true"
            >
              »
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="lead mx-auto mt-8 max-w-2xl text-cream/80">
            Не нужно покупать новых. Пациенты, которые у вас лечились, возвращаются в
            разы дешевле и охотнее — если их вовремя и по-человечески позвать.
            Народный реактив делает это системно.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center text-gold-500">
            <Vine width={380} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
