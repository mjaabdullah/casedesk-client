import { Toast } from "@heroui/react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/navbar/Navbar";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CaseDesk | Legal Case Management",
  description:
    "Modern legal case management for law firms, assistants, and clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8F9FB] text-slate-900 ">
        <Toast.Provider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
