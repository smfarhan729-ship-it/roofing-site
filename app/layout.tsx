import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${siteConfig.company.name} | Architectural Roofing & Exterior Systems`,
  description: siteConfig.company.subtagline,
  keywords: [
    "roofing company",
    "architectural roofing",
    "standing seam metal roof",
    "hail damage restoration",
    "roof replacement",
    "luxury home roofing",
    "drone roof inspection",
  ],
  authors: [{ name: siteConfig.company.name }],
  openGraph: {
    title: `${siteConfig.company.name} | Architectural Roofing & Exterior Systems`,
    description: siteConfig.company.subtagline,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.company.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.company.name} | Architectural Roofing & Exterior Systems`,
    description: siteConfig.company.subtagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#070A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <head>
        {/* JSON-LD LocalBusiness / RoofingContractor Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              name: siteConfig.company.name,
              legalName: siteConfig.company.legalName,
              description: siteConfig.company.subtagline,
              telephone: siteConfig.company.phone,
              email: siteConfig.company.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.company.address,
                addressLocality: "Denver",
                addressRegion: "CO",
                postalCode: siteConfig.company.zip,
                addressCountry: "US",
              },
              areaServed: siteConfig.company.serviceArea,
              priceRange: "$$$",
              openingHours: "Mo-Sa 07:00-19:00",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.98",
                reviewCount: "4850",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#070A0F] text-[#F3F4F6] font-sans antialiased selection:bg-orange-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
