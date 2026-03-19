import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav        from "@/components/Nav";
import Footer      from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RevealInit  from "@/components/RevealInit";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agenix — Stores, Agents & Automation",
  description:
    "We build Shopify & WooCommerce stores, custom AI agents, and workflow automation — end-to-end, from first line of code to production deployment.",
  keywords: [
    "AI agents",
    "e-commerce stores",
    "Shopify development",
    "WooCommerce",
    "workflow automation",
    "business automation",
    "custom storefront",
  ],
  openGraph: {
    title: "Agenix — Stores, Agents & Automation",
    description:
      "From Shopify stores to AI agents, workflow automation to real-time assistants — we build the technology that takes the hard work out of running a business.",
    type: "website",
    locale: "en_GB",
    siteName: "Agenix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agenix — Stores, Agents & Automation",
    description:
      "From Shopify stores to AI agents, workflow automation to real-time assistants — we build the technology that takes the hard work out of running a business.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Agenix",
              description:
                "We build e-commerce stores, AI agents, and workflow automation for businesses of all sizes.",
              address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+44-20-7946-0392",
                contactType: "sales",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <RevealInit />
        <Nav />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
