import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@/context/ToastContext";

const Yekan = localFont({ src: "./fonts/yekan/YekanBakhFaNum-VF.woff2" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={Yekan.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <ToastProvider>{children}</ToastProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
