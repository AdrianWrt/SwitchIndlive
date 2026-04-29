import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Providers from "./providers";
import CartBadge from "@/components/CartBadge";
import AuthButton from "@/components/AuthButton";
import Header from "@/components/Header";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwitchInd ",
  description: "E-Commerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Header />


          {children}
        </Providers>
      </body>


    </html>
  );
}
