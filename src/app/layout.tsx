import { Footer } from "@/components/layout/Footer";
import { CaseDeskUser } from "@/components/layout/navbar";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { getSessionUserFromServer } from "@/lib/getSessionFromServer";
import { Providers } from "@/providers/Providers";
import { Toast } from "@heroui/react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getSessionUserFromServer();
  const user: CaseDeskUser | undefined = userData?.user;
  const isAuthenticated: boolean = !!user;

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8F9FB] text-slate-900 ">
        <Providers>
          <Toast.Provider />
          <Navbar isAuthenticated={isAuthenticated} user={user} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
