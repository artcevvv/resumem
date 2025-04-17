import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Global/Header";
import Providers from "@/components/Providers";
import HeaderWrapper from "@/components/Global/HeaderWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ResumeM",
  description: "Create your perfect resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <HeaderWrapper />
          <main className="w-screen bg-foreground">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
