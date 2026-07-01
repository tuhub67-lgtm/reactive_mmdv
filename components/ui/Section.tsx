import type { ReactNode } from "react";

/**
 * Секция с чередованием тёмного (scarlet-900) и светлого (parchment) фона.
 * Тёмные несут тёплую зернистость (.grain).
 */
export function Section({
  id,
  tone,
  children,
  className = "",
  grain = true,
}: {
  id?: string;
  tone: "dark" | "light";
  children: ReactNode;
  className?: string;
  grain?: boolean;
}) {
  const toneCls =
    tone === "dark"
      ? `bg-scarlet-900 text-cream ${grain ? "grain" : ""}`
      : "bg-parchment text-ink";

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-[clamp(64px,9vw,120px)] ${toneCls} ${className}`}
    >
      <div className="container-x relative z-[1]">{children}</div>
    </section>
  );
}
