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
  metadataBase: new URL("https://dizilo.com"),
  title: {
    default: "Dizilo — Stores, Agents & Automation",
    template: "%s — Dizilo",
  },
  description:
    "We build Shopify & WooCommerce stores, custom AI agents, and workflow automation — end-to-end, from first line of code to production deployment.",
  keywords: [
    "Dizilo", "AI agents", "AI automation agency", "custom AI agent",
    "Shopify development", "WooCommerce development", "e-commerce store builder",
    "workflow automation", "business automation", "n8n automation",
    "lead qualification AI", "AI customer support agent", "build AI agent",
    "Shopify agency", "WooCommerce agency", "automate business processes",
    "AI agency UK", "automation agency Birmingham",
  ],
  openGraph: {
    title: "Dizilo — Stores, Agents & Automation",
    description:
      "From Shopify stores to AI agents, workflow automation to real-time assistants — we build the technology that takes the hard work out of running a business.",
    type: "website",
    url: "https://dizilo.com",
    locale: "en_GB",
    siteName: "Dizilo",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Dizilo — Stores, Agents & Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dizilo — Stores, Agents & Automation",
    description:
      "From Shopify stores to AI agents, workflow automation to real-time assistants — we build the technology that takes the hard work out of running a business.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/diziloredfavicon.png", type: "image/png" },
    ],
    shortcut: "/diziloredfavicon.png",
    apple: "/diziloredfavicon.png",
  },
  alternates: { canonical: "https://dizilo.com" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dizilo",
              url: "https://dizilo.com",
              logo: "https://dizilo.com/dizilo.png",
              description: "We build Shopify & WooCommerce stores, custom AI agents, and workflow automation for businesses.",
              address: { "@type": "PostalAddress", addressLocality: "Birmingham", addressCountry: "GB" },
              contactPoint: { "@type": "ContactPoint", contactType: "sales", url: "https://dizilo.com/contact" },
              sameAs: [],
            }),
          }}
        />
        {/* WebSite schema — enables Google Sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dizilo",
              url: "https://dizilo.com",
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: "https://dizilo.com/blog?q={search_term_string}" },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Service schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "Service",
                  position: 1,
                  name: "AI Agents",
                  description: "Custom AI agents for lead qualification, customer support, sales outreach, and personal assistants.",
                  url: "https://dizilo.com/services/agents",
                  provider: { "@type": "Organization", name: "Dizilo", url: "https://dizilo.com" },
                },
                {
                  "@type": "Service",
                  position: 2,
                  name: "E-Commerce Store Development",
                  description: "Shopify and WooCommerce store development — custom themes, headless, and AI-powered support.",
                  url: "https://dizilo.com/services/stores",
                  provider: { "@type": "Organization", name: "Dizilo", url: "https://dizilo.com" },
                },
                {
                  "@type": "Service",
                  position: 3,
                  name: "Workflow Automation",
                  description: "Business process automation using n8n, Zapier, and Make — invoices, CRM, lead routing, and more.",
                  url: "https://dizilo.com/services/automation",
                  provider: { "@type": "Organization", name: "Dizilo", url: "https://dizilo.com" },
                },
              ],
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
