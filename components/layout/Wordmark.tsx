/**
 * Вордмарк «Народный реактив» + маленький нейтральный знак.
 *
 * СЛОТ ПОД БУДУЩИЙ ЛОГОТИП-МЕДВЕДЬ (маскот MMDV):
 * сюда позже встанет геральдический знак-медведь в круглой печати-клейме,
 * золото на красном. Сейчас — нейтральная орнаментальная розетка-заглушка.
 * НЕ генерировать медведя-иллюстрацию до утверждённого лого.
 */
export function Wordmark({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const wordColor = tone === "dark" ? "text-cream" : "text-ink";
  const accentColor = tone === "dark" ? "text-gold-300" : "text-scarlet-700";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* нейтральный знак-заглушка (слот под медведя) */}
      <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-gold-500/60 text-gold-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z"
            fill="currentColor"
          />
          <circle cx="12" cy="12" r="2.4" fill="var(--scarlet-900)" />
        </svg>
      </span>
      <span className="font-display text-[19px] font-extrabold leading-none">
        <span className={wordColor}>Народный </span>
        <span className={accentColor}>реактив</span>
      </span>
    </span>
  );
}
