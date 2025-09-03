import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriScan - AI-Powered Agricultural Disease Detection",
  description: "Intelligent agricultural platform that helps farmers identify plant diseases, bacteria, fungi, and other crop health issues through image analysis.",
  keywords: "agriculture, plant disease, AI, farming, crop health, disease detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen bg-gradient-to-br from-green-50 to-emerald-100">
          {children}
        </div>
      </body>
    </html>
  );
}
