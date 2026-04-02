import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  defaultMetadata,
  organizationSchema,
  webSiteBlogSearchSchema,
  webSiteSchema,
} from './metadata-config';
import Script from 'next/script';

export const metadata: Metadata = defaultMetadata;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

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
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable}`}
      >
        <Providers>
          {children}
        </Providers>

        {/* Organization Schema - Improves brand visibility in search */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* WebSite Schema - Enables Google Sitelinks Search Box */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />

        {/* Additional WebSite schema for blog search action */}
        <Script
          id="website-blog-search-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteBlogSearchSchema),
          }}
        />
      </body>
    </html>
  );
}