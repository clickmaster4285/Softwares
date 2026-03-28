import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClickMasters - Professional Software Development",
  description:
    "Leading software development company providing custom solutions for businesses",
  icons: {
    icon: "/clickMasters.png",
  },
  verification: {
    google: "tH8GZm7N2hbAICQfeQEs4YejO057UvY4eJBWLkHHJxU",
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
