import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";
import { defaultMetadata, organizationSchema, webSiteSchema } from './metadata-config';
import Script from 'next/script';

export const metadata: Metadata = defaultMetadata;

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
      </body>
    </html>
  );
}