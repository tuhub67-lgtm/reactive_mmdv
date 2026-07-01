/** Надзаголовок (eyebrow) с орнаментальной чертой. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  // На пергаменте — тёмное золото для контраста; на scarlet — базовое золото
  const color = tone === "light" ? "text-gold-700" : "text-gold-500";
  const rule = tone === "light" ? "bg-gold-700/60" : "bg-gold-500/60";
  return (
    <p className={`eyebrow ${color} flex items-center gap-3 ${className}`}>
      <span className={`h-px w-6 ${rule}`} aria-hidden="true" />
      {children}
    </p>
  );
}
