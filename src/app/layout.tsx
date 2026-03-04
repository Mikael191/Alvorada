import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import AuthProvider from "@/components/AuthProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
        className={`${bricolage.variable} ${dmSans.variable} font-sans antialiased text-ink bg-paper min-h-screen texture-paper`}
      >
        <SmoothScroll>
          <CustomCursor />
          <AuthProvider>
            {children}
          </AuthProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
