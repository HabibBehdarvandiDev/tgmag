import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const Yekan = localFont({ src: "./fonts/yekan/YekanBakhFaNum-VF.woff2" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={Yekan.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
