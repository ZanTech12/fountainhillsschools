import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fountain Hills Schools | Excellence in Education",
  description: "An advanced school website built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}