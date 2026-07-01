import type { ReactNode } from "react";

/** Декоративный гребень-крест для верха/низа картуша */
function Crest({ className = "" }: { className?: string }) {
  return (
    <svg
      width="86"
      height="22"
      viewBox="0 0 86 22"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* центральный ромб */}
      <path d="M43 4 L49 11 L43 18 L37 11 Z" />
      <circle cx="43" cy="11" r="1.6" fill="currentColor" stroke="none" />
      {/* левый завиток с листом */}
      <path d="M37 11 C 28 11, 22 11, 16 11 C 10 11, 8 6, 12 5 C 15 4.2, 16 8, 12 9" />
      <path d="M30 11 C 26 6, 20 6, 17 9 C 22 11, 27 11, 30 11 Z" />
      {/* правый завиток с листом (зеркало) */}
      <path d="M49 11 C 58 11, 64 11, 70 11 C 76 11, 78 6, 74 5 C 71 4.2, 70 8, 74 9" />
      <path d="M56 11 C 60 6, 66 6, 69 9 C 64 11, 59 11, 56 11 Z" />
    </svg>
  );
}

/**
 * Картуш / щит — декоративная золотая рамка вокруг ключевой денежной цифры.
 * Двойная золотая линия + гребни сверху и снизу. Отсылка к богатырскому щиту,
 * геометрично-абстрактно, без буквального клипарта.
 */
export function Cartouche({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const goldEdge = tone === "dark" ? "text-gold-400" : "text-gold-700";
  const borderCol = tone === "dark" ? "border-gold-400/70" : "border-gold-700/60";
  const innerCol = tone === "dark" ? "border-gold-400/30" : "border-gold-700/25";
  const bg =
    tone === "dark"
      ? "bg-scarlet-900/40"
      : "bg-[color:var(--parchment)]";

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative rounded-xl2 border-2 ${borderCol} ${bg} px-6 py-6 text-center`}
      >
        <span
          className={`pointer-events-none absolute inset-[5px] rounded-[15px] border ${innerCol}`}
          aria-hidden="true"
        />
        <Crest
          className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ${goldEdge}`}
        />
        <div className="relative">{children}</div>
        <Crest
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-180 ${goldEdge}`}
        />
      </div>
    </div>
  );
}
