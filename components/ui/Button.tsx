import type { ReactNode } from "react";

type Variant = "cta" | "ghost";
type Tone = "dark" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl2 font-body font-semibold text-center transition-all duration-200 ease-out focus-visible:outline-none min-h-[48px] px-6 py-3 text-[16px] cursor-pointer select-none";

const variants: Record<Variant, string> = {
  // Янтарь заменён на золото: заливка gold, текст тёмно-красный (scarlet-900)
  cta: "bg-gradient-to-b from-gold-400 to-gold-500 text-scarlet-900 shadow-cta hover:-translate-y-0.5 hover:from-gold-300 hover:to-gold-400 hover:shadow-goldGlow active:translate-y-0",
  ghost: "border border-gold-500/70 bg-transparent hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/10",
};

const ghostTone: Record<Tone, string> = {
  dark: "text-gold-300",
  light: "text-gold-700",
};

export function Button({
  children,
  href,
  variant = "cta",
  tone = "dark",
  external = true,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  tone?: Tone;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `${base} ${variants[variant]} ${
    variant === "ghost" ? ghostTone[tone] : ""
  } ${className}`;

  const extra =
    external && href.startsWith("http")
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

  return (
    <a href={href} className={cls} aria-label={ariaLabel} {...extra}>
      {children}
    </a>
  );
}
