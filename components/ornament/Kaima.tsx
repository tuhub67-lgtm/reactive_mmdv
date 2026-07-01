/**
 * Кайма — стилизованная растительная золотая кромка по низу (или верху)
 * тёмной секции. Тонкая графика, тайлится по ширине.
 */
export function Kaima({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height="34"
      viewBox="0 0 640 34"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <defs>
        <pattern
          id="kaima-unit"
          width="64"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          {/* фестон-арка */}
          <path
            d="M0 5 Q 32 30 64 5"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          {/* лист в основании арки */}
          <path
            d="M32 24 C 27 17, 27 12, 32 8 C 37 12, 37 17, 32 24 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinejoin="round"
          />
          {/* бусина в стыке */}
          <circle cx="0" cy="5" r="1.7" fill="currentColor" />
          <circle cx="64" cy="5" r="1.7" fill="currentColor" />
        </pattern>
      </defs>
      {/* верхняя тонкая линия */}
      <line x1="0" y1="5" x2="640" y2="5" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect width="640" height="34" fill="url(#kaima-unit)" />
    </svg>
  );
}
