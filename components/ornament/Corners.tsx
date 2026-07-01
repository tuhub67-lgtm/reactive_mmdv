import type { CSSProperties } from "react";

/**
 * Угловые орнаментальные виньетки — золотой узор в углах карточки
 * (не по всему периметру, чтобы не перегружать). Кладётся внутрь
 * relative-контейнера. По умолчанию все четыре угла.
 */
function CornerShape({
  style,
  size,
}: {
  style: CSSProperties;
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", ...style }}
    >
      {/* уголок-скобка */}
      <path d="M6 26 L6 12 Q6 6 12 6 L26 6" />
      {/* завиток на изломе */}
      <path d="M12 6 C 12 12, 6 12, 6 12" />
      <path d="M15 9 C 20 7, 22 12, 18 14 C 15.5 15.2, 14 12.5, 16.5 11.5" />
      {/* лист вдоль верхней грани */}
      <path d="M26 6 C 31 3.5, 37 5, 40 8 C 35 9, 30 8, 26 6 Z" />
      {/* бусина */}
      <circle cx="6" cy="26" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Corners({
  size = 42,
  inset = 8,
  className = "text-gold-500",
  corners = ["tl", "tr", "bl", "br"],
}: {
  size?: number;
  inset?: number;
  className?: string;
  corners?: Array<"tl" | "tr" | "bl" | "br">;
}) {
  const map: Record<string, CSSProperties> = {
    tl: { top: inset, left: inset, transform: "rotate(0deg)" },
    tr: { top: inset, right: inset, transform: "rotate(90deg)" },
    br: { bottom: inset, right: inset, transform: "rotate(180deg)" },
    bl: { bottom: inset, left: inset, transform: "rotate(270deg)" },
  };
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {corners.map((c) => (
        <CornerShape key={c} size={size} style={map[c]} />
      ))}
    </div>
  );
}
