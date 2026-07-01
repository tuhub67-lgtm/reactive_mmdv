import { Wordmark } from "./Wordmark";
import { TELEGRAM_URL, TELEGRAM_HANDLE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-gold-500/20 bg-scarlet-900 py-10 text-cream">
      <div className="container-x flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* СЛОТ ПОД ЛОГОТИП-МЕДВЕДЬ — см. Wordmark.tsx */}
          <Wordmark tone="dark" />
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[14px] text-cream/70">
          <span>проект MMDV</span>
          <span className="text-gold-500/60">·</span>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-300 transition-colors hover:text-gold-400"
          >
            {TELEGRAM_HANDLE}
          </a>
          <span className="text-gold-500/60">·</span>
          <span>© 2026</span>
        </p>
      </div>
    </footer>
  );
}
