import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProvider } from "@/store/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Ecommerce digital app you  can buy every thing pakistan No 1 Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        

        <Navbar/>
        {children}
        <Footer/>
        
      </body>
    </html>
      </AppProvider>

    </ClerkProvider>
  );
}
