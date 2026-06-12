import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";


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
    <html lang="en" className="bg-gray-900">
      <body className="antialiased bg-gray-900 mih-h-screen">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>


    </html>
  );
}
