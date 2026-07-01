/** Русское форматирование чисел: 2 000, 240 000 */
const ruFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function formatRu(value: number): string {
  return ruFormatter.format(Math.round(value));
}

/** Сумма с рублём: «240 000 ₽» */
export function formatRub(value: number): string {
  return `${formatRu(value)} ₽`;
}

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
