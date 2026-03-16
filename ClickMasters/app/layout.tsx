import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/landingPage/navbar";
import { Footer } from "@/components/landingPage/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClickMasters - Professional Software Development",
  description:
    "Leading software development company providing custom solutions for businesses",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
         
          <main>{children}</main>
       
        </Providers>
      </body>
    </html>
  );
}
