import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai, Prompt, Kanit, Sarabun } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import MobileBlocker from "@/components/MobileBlocker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-noto-sans-thai" });
const prompt = Prompt({ subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-prompt" });
const kanit = Kanit({ subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-kanit" });
const sarabun = Sarabun({ subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-sarabun" });

export const metadata: Metadata = {
  title: "SysCraft - Design System Simulator",
  description: "A premium design system simulator built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansThai.variable} ${prompt.variable} ${kanit.variable} ${sarabun.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <MobileBlocker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
