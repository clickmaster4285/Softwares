import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";
import { defaultMetadata } from './metadata-config';

export const metadata: Metadata = {
  ...defaultMetadata,
  // Override or add specific metadata here
  verification: {
    google: "tH8GZm7N2hbAICQfeQEs4YejO057UvY4eJBWLkHHJxU",
  },
  // You can also add other verification codes
  // yandex: "yandex-verification-code",
  // other: {
  //   "msvalidate.01": "bing-verification-code",
  // },
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