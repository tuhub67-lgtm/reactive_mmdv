"use client";

import { CRM_SYSTEMS } from "@/lib/constants";
import { Database } from "lucide-react";

/** Бесконечный marquee «работает с вашей базой» (CRM-системы). */
export function CrmMarquee() {
  const items = [...CRM_SYSTEMS, ...CRM_SYSTEMS];
  return (
    <div className="relative overflow-hidden py-2" aria-label="Работает с вашей CRM">
      {/* мягкие края */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-parchment to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-parchment to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-10">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap font-body text-[15px] font-medium text-ink/55"
          >
            <Database className="h-4 w-4 text-gold-700" strokeWidth={1.7} aria-hidden="true" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
