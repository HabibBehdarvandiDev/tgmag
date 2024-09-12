import localFont from "next/font/local";
import "./globals.css";

const Yekan = localFont({ src: "./fonts/yekan/YekanBakhFaNum-VF.woff2" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={Yekan.className}>{children}</body>
    </html>
  );
}
