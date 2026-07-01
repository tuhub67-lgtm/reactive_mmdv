import { Send } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Kaima } from "@/components/ornament/Kaima";
import { Seal } from "@/components/ornament/Seal";
import { PRIMARY_CTA_FINAL, TELEGRAM_URL } from "@/lib/constants";

export function FinalCta() {
  return (
    <section id="final" className="grain relative overflow-hidden bg-scarlet-900 text-cream">
      {/* кайма сверху */}
      <div className="relative z-[1] text-gold-500">
        <Kaima flip />
      </div>

      <div className="container-x relative z-[1] grid items-center gap-12 py-[clamp(56px,8vw,104px)] lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow tone="dark">Первый шаг</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 h2 max-w-[18ch] text-cream">
              Начнём с <span className="text-gold-300">бесплатного разбора</span> вашей базы
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-5 max-w-xl text-cream/80">
              Одно сообщение — и вы узнаете, сколько своих денег спит в базе прямо
              сейчас.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Button href={TELEGRAM_URL} variant="cta" className="text-[17px] sm:w-auto w-full">
                <Send className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                {PRIMARY_CTA_FINAL}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center gap-3 justify-self-center lg:justify-self-end">
          <Seal size={148} />
          <p className="font-body text-[13px] uppercase tracking-[0.14em] text-gold-300/80">
            Работаем честно
          </p>
        </div>
      </div>
    </section>
  );
}
