import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Grêmio Alvorada",
  description: "Página oficial do Grêmio Alvorada - Representação, Projetos e Transparência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${notoSerifJP.variable} font-sans antialiased text-ink bg-paper min-h-screen texture-paper`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
