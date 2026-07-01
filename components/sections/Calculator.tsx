"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Cartouche } from "@/components/ornament/Cartouche";
import { Corners } from "@/components/ornament/Corners";
import { CountUp } from "@/components/ui/CountUp";
import { clamp, formatRu, formatRub } from "@/lib/format";
import { TELEGRAM_URL } from "@/lib/constants";

const RETURN_RATE = 0.05; // по практике возвращается 4–7% → берём 5%

type FieldConfig = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
};

function Field({
  cfg,
  value,
  onChange,
}: {
  cfg: FieldConfig;
  value: number;
  onChange: (v: number) => void;
}) {
  const [buf, setBuf] = useState(String(value));
  const pct = ((clamp(value, cfg.min, cfg.max) - cfg.min) / (cfg.max - cfg.min)) * 100;

  // Слайдер — единый источник со state; печать в поле не рассинхронит результат.
  const onSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    onChange(v);
    setBuf(String(v));
  };
  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setBuf(raw);
    const n = parseInt(raw, 10);
    if (raw === "" || Number.isNaN(n)) return; // не мешаем печатать
    onChange(clamp(n, 0, cfg.max)); // считаем по введённому (низ докручиваем на blur)
  };
  const onBlur = () => {
    const n = parseInt(buf, 10);
    const v = Number.isNaN(n) ? cfg.min : clamp(n, cfg.min, cfg.max);
    onChange(v);
    setBuf(String(v));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={cfg.id} className="font-body text-[15px] font-medium text-ink">
          {cfg.label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={cfg.id}
            type="number"
            inputMode="numeric"
            min={cfg.min}
            max={cfg.max}
            step={cfg.step}
            value={buf}
            onChange={onType}
            onBlur={onBlur}
            className="w-24 rounded-lg border border-gold-700/40 bg-parchment px-2.5 py-1.5 text-right font-display text-[18px] font-extrabold tabular-nums text-scarlet-700 outline-none transition-colors focus:border-gold-500"
          />
          {cfg.suffix ? (
            <span className="font-display text-[16px] font-bold text-ink/60">{cfg.suffix}</span>
          ) : null}
        </div>
      </div>
      <input
        type="range"
        aria-label={cfg.label}
        min={cfg.min}
        max={cfg.max}
        step={cfg.step}
        value={clamp(value, cfg.min, cfg.max)}
        onChange={onSlider}
        className="range-gold mt-3 w-full"
        style={{
          background: `linear-gradient(to right, var(--gold-500) ${pct}%, rgba(138,106,31,.18) ${pct}%)`,
        }}
      />
    </div>
  );
}

export function Calculator() {
  const [cards, setCards] = useState(2000);
  const [check, setCheck] = useState(4000);
  const [share, setShare] = useState(60);

  const { sleeping, returns, revenue, sleepPct, returnPct } = useMemo(() => {
    const c = clamp(cards, 200, 20000);
    const chk = clamp(check, 1000, 20000);
    const sh = clamp(share, 0, 100);
    const sleeping = Math.round(c * (sh / 100));
    const returns = Math.round(sleeping * RETURN_RATE);
    const revenue = returns * chk;
    return {
      sleeping,
      returns,
      revenue,
      sleepPct: sh,
      returnPct: Math.max(sh * RETURN_RATE, sleeping > 0 ? 2 : 0),
    };
  }, [cards, check, share]);

  return (
    <Section id="calc" tone="light">
      <Reveal>
        <Eyebrow tone="light">Счёт на ваших цифрах</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 h2 max-w-[20ch] text-ink">
          Посчитайте, сколько денег спит в вашей базе
        </h2>
      </Reveal>

      <div className="relative mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Управление */}
        <Reveal>
          <div className="relative rounded-xl2 border border-gold-700/25 bg-parchment-deep/60 p-6 shadow-warm sm:p-8">
            <Corners className="text-gold-700/50" size={36} inset={10} corners={["tl", "br"]} />
            <div className="space-y-7">
              <Field
                cfg={{ id: "calc-cards", label: "Карточек в базе", min: 200, max: 20000, step: 100 }}
                value={cards}
                onChange={setCards}
              />
              <Field
                cfg={{ id: "calc-check", label: "Средний чек", min: 1000, max: 20000, step: 100, suffix: "₽" }}
                value={check}
                onChange={setCheck}
              />
              <Field
                cfg={{ id: "calc-share", label: "Доля молчащих", min: 0, max: 100, step: 1, suffix: "%" }}
                value={share}
                onChange={setShare}
              />
            </div>

            {/* мини-гейдж спящие → возвращаемые */}
            <div className="mt-8 space-y-3 border-t border-gold-700/20 pt-6">
              <GaugeRow label="Спящих в базе" value={sleeping} pct={sleepPct} tone="muted" />
              <GaugeRow label="Вернётся с первой волны" value={returns} pct={returnPct} tone="gold" />
            </div>
          </div>
        </Reveal>

        {/* Результат */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col justify-center">
            <Cartouche tone="light">
              <p className="font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-gold-700">
                Можно вернуть с первой же волны
              </p>
              <p className="mt-2 leading-none text-scarlet-700">
                <span className="font-display text-[18px] font-bold align-top">≈ </span>
                <span className="font-display font-extrabold tabular-nums text-[clamp(40px,9vw,68px)] text-gold-700">
                  <CountUp value={revenue} format={formatRu} />
                </span>
                <span className="font-display font-extrabold text-gold-700 text-[clamp(30px,7vw,50px)]"> ₽</span>
              </p>
              <p className="mt-4 font-body text-[14px] text-ink/70">
                по практике возвращается 4–7%. И это только первый визит — дальше повторные.
              </p>
            </Cartouche>

            <div className="mt-6">
              <Button href={TELEGRAM_URL} variant="cta" className="w-full sm:w-auto">
                Хочу точный расчёт по моей базе — бесплатно
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function GaugeRow({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: number;
  pct: number;
  tone: "muted" | "gold";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-body text-[14px] text-ink/70">{label}</span>
        <span
          className={`font-display text-[18px] font-extrabold tabular-nums ${
            tone === "gold" ? "text-gold-700" : "text-scarlet-700"
          }`}
        >
          <CountUp value={value} duration={0.5} />
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${
            tone === "gold"
              ? "bg-gradient-to-r from-gold-500 to-gold-400"
              : "bg-scarlet-600/70"
          }`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}
