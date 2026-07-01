"use client";

import { motion } from "motion/react";
import { Corners } from "@/components/ornament/Corners";
import { Cartouche } from "@/components/ornament/Cartouche";
import { CountUp } from "@/components/ui/CountUp";

function Bar({ pct }: { pct: number }) {
  return (
    <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}

export function HeroMoneyCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div className="relative rounded-xl2 border border-gold-500/40 bg-scarlet-700/35 p-6 shadow-warm backdrop-blur-[2px] sm:p-7">
        <Corners className="text-gold-400/70" size={38} inset={10} />

        <p className="eyebrow text-gold-300">Деньги в вашей базе</p>

        <div className="mt-5 space-y-4">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-body text-[15px] text-cream/80">Пациентов в базе</span>
              <CountUp value={2000} className="money text-[22px]" />
            </div>
            <Bar pct={100} />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-body text-[15px] text-cream/80">
                Спят — не были 8–12 мес
              </span>
              <CountUp value={1200} className="money text-[22px]" />
            </div>
            <Bar pct={60} />
          </div>
        </div>

        <div className="mt-6">
          <Cartouche tone="dark">
            <p className="font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-gold-300/90">
              Можно вернуть с первой волны
            </p>
            <p className="mt-1.5 leading-none">
              <span className="font-display text-[15px] font-bold text-gold-300 align-top">≈ </span>
              <CountUp value={240000} className="money text-[clamp(32px,7vw,44px)]" />
              <span className="money text-[clamp(28px,6vw,38px)]"> ₽</span>
            </p>
          </Cartouche>
        </div>
      </div>
    </div>
  );
}
