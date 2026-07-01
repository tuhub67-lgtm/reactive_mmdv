import type { Metadata, Viewport } from "next";
import { Bitter, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";

// Заголовки — тёплый весомый slab-serif «богатырского» духа
const bitter = Bitter({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Текст, кнопки, подписи — чистый гротеск для контраста с тяжёлыми заголовками
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://reactive-mmdv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Народный реактив — достаём выручку, которая спит в базе клиники",
  description:
    "Сервис реактивации спящих пациентов для стоматологий. Находим в вашей базе тех, кто давно не приходил, и возвращаем персональными сообщениями от лица клиники — без рекламного бюджета. Бесплатный разбор базы.",
  keywords: [
    "реактивация пациентов",
    "возврат пациентов стоматология",
    "маркетинг для стоматологии",
    "база пациентов",
    "Народный реактив",
    "MMDV",
  ],
  authors: [{ name: "MMDV" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Народный реактив",
    title: "В вашей базе спит выручка. Достаём её.",
    description:
      "Возврат спящих пациентов стоматологии по-человечески, без рекламного бюджета. Бесплатный разбор базы — узнайте, сколько денег спит в вашей базе прямо сейчас.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Народный реактив — выручка, которая спит в вашей базе",
    description:
      "Реактивация спящих пациентов стоматологий. Бесплатный разбор базы.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#4A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${bitter.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-scarlet-900"
        >
          К содержанию
        </a>
        <SmoothScroll>
          <ReadingProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCta />
        </SmoothScroll>
      </body>
    </html>
  );
}
