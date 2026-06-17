import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hanguk Studio — Korean Language & Kitchen Workshops",
  description:
    "Intimate workshops in Korean language and cuisine — designed to bring you close to the living culture of Korea.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
