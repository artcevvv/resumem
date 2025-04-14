import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Global/Header";
import Providers from "@/components/Providers";

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
      <body className={`${poppins.variable} antialiased p-[20px]`}>
        <Providers>
          <Header />
          <main className="w-screen -mx-[20px] bg-foreground">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
