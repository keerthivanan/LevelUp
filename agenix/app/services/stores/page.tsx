import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "E-Commerce Stores — Agenix",
  description:
    "Shopify, WooCommerce, and fully custom e-commerce stores — built to sell, designed to scale, and ready for catalogues of any size.",
};

const platforms = [
  {
    id: "shopify",
    platform: "Shopify",
    tag: "Most Popular",
    title: "Shopify Store Development",
    body: "Custom Shopify stores built for speed, conversions, and large catalogues. We handle everything from theme design to product import to payment setup — so you launch with a store that's actually ready to sell.",
    feats: [
      "Custom theme design & development from scratch",
      "Product import & bulk management (10,000–20,000+ SKUs)",
      "Payment gateway & shipping configuration",
      "App integrations (reviews, loyalty, upsell, subscriptions)",
      "SEO, Core Web Vitals & performance optimisation",
      "Analytics setup & conversion tracking",
      "Training & documentation included",
    ],
    stat1: { v: "2 wks",  l: "Average launch timeline" },
    stat2: { v: "10k+",   l: "Products managed per store" },
  },
  {
    id: "woocommerce",
    platform: "WooCommerce",
    tag: "Full Control",
    title: "WooCommerce Development",
    body: "Built on WordPress, fully customisable, and owned by you completely. No monthly platform fees, no lock-in. Ideal for businesses that need flexibility, multi-currency support, or custom checkout flows.",
    feats: [
      "Custom theme & plugin development",
      "Multi-currency & multi-language support",
      "Subscription & membership features",
      "Custom checkout & payment flows",
      "Hosting setup & server configuration",
      "Performance optimisation & caching",
      "Security hardening & ongoing updates",
    ],
    stat1: { v: "0",      l: "Monthly platform fees" },
    stat2: { v: "100%",   l: "Owned by you" },
  },
  {
    id: "custom",
    platform: "Custom Storefront",
    tag: "Enterprise",
    title: "Fully Custom E-Commerce Platforms",
    body: "For businesses that have outgrown off-the-shelf platforms — or need something specific that doesn't exist yet. Built from the ground up with Next.js, bespoke APIs, and AI agents baked in from day one.",
    feats: [
      "Bespoke frontend built with Next.js",
      "Custom backend API & database architecture",
      "AI-powered product search & recommendations",
      "Real-time inventory & order management",
      "Built-in customer support agent",
      "Scalable cloud infrastructure (AWS / GCP / Vercel)",
      "Any catalogue size — no platform limits",
      "Full source code ownership",
    ],
    stat1: { v: "Any",    l: "Catalogue size" },
    stat2: { v: "AI",     l: "Agents built in" },
  },
];

const faqs = [
  {
    q: "Do you work with existing stores or only new builds?",
    a: "Both. We can build a new store from scratch or take over an existing one — redesigning, migrating, or extending it. We'll scope exactly what needs to happen during discovery.",
  },
  {
    q: "How do you handle large product catalogues?",
    a: "We've managed catalogues of 10,000–20,000+ SKUs on Shopify and WooCommerce. We use bulk import tools, custom scripts, and supplier feed integrations to keep everything accurate and up to date.",
  },
  {
    q: "Can you integrate my store with my existing tools?",
    a: "Yes. We integrate with ERPs, inventory systems, accounting software, shipping providers, CRMs, and more. If an API exists, we can connect it.",
  },
  {
    q: "What's included in the 30-day post-launch support?",
    a: "Bug fixes, minor adjustments, and technical questions — all included for 30 days after launch. If something doesn't work as expected, we fix it.",
  },
  {
    q: "How is the price determined?",
    a: "We scope the project thoroughly during discovery, then provide a fixed price before we start. You know exactly what you're paying — no hourly billing, no scope creep charges.",
  },
];

export default function StoresPage() {
  return (
    <PageLayout>
      <PageHero
        label="E-Commerce Stores"
        title={<>Stores built to<br /><span className="m">sell and scale.</span></>}
        subtitle="Shopify, WooCommerce, or fully custom — designed for conversions, built for large catalogues, ready from day one."
      />

      {/* Platforms */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">Platforms</span>
          <h2 className="s-h rv d1">Three ways we build stores</h2>
          <p className="s-sub rv d2">
            We recommend the right platform for your situation — not the one that&apos;s easiest for us.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 36 }}>
            {platforms.map((p, i) => (
              <div
                key={p.id}
                id={p.id}
                className={`store-card rv d${(i % 3) + 1}`}
                style={{ padding: 28 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                  <div>
                    <div className="store-card-top" style={{ marginBottom: 16 }}>
                      <div className="store-platform">{p.platform}</div>
                      <div className="store-tag">{p.tag}</div>
                    </div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-.02em", marginBottom: 12 }}>{p.title}</h3>
                    <p style={{ fontSize: ".83rem", color: "var(--t2)", lineHeight: 1.72, marginBottom: 20 }}>{p.body}</p>
                    <div style={{ display: "flex", gap: 24, padding: "14px 0" }}>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.02em" }}>{p.stat1.v}</div>
                        <div style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 2 }}>{p.stat1.l}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.02em" }}>{p.stat2.v}</div>
                        <div style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 2 }}>{p.stat2.l}</div>
                      </div>
                    </div>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {p.feats.map((f) => (
                      <li key={f} className="pillar-item">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ padding: "80px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <span className="s-label rv">Tech Stack</span>
          <h2 className="s-h rv d1">What we build with</h2>
          <p className="s-sub rv d2">
            Production-proven tools — nothing experimental unless you specifically need it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 36 }}>
            {[
              { cat: "Storefronts",   items: ["Shopify",   "WooCommerce", "Next.js",    "Remix"]          },
              { cat: "Payments",      items: ["Stripe",    "PayPal",      "Klarna",     "Revolut"]        },
              { cat: "Infrastructure",items: ["Vercel",    "AWS",         "Cloudflare", "PlanetScale"]    },
              { cat: "Integrations",  items: ["Klaviyo",   "Gorgias",     "Shipstation","Xero"]           },
            ].map((col, i) => (
              <div key={col.cat} className={`sector rv d${i + 1}`} style={{ padding: "22px 20px" }}>
                <div className="sector-name" style={{ marginBottom: 12 }}>{col.cat}</div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ fontSize: ".775rem", color: "var(--t2)" }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">Results</span>
          <h2 className="s-h rv d1">What clients achieved</h2>
          <div className="res-grid" style={{ marginTop: 36 }}>
            <div className="rc rv d1">
              <div className="rc-cat">E-Commerce · WooCommerce + Agent</div>
              <div className="rc-title">Nexus Retail cut support costs 70% after adding a store agent</div>
              <p className="rc-body">A support agent built into their WooCommerce store handles order queries, returns, and complaints across chat and WhatsApp. Customer satisfaction went up, costs went down.</p>
              <dl className="rc-mini" style={{ marginTop: 16 }}>
                <div><dd style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.025em", lineHeight: 1 }}>−70%</dd><dt style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 3 }}>Support cost</dt></div>
                <div><dd style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.025em", lineHeight: 1 }}>4.9/5</dd><dt style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 3 }}>CSAT (was 3.8)</dt></div>
              </dl>
              <div className="rc-hr" />
              <div className="rc-co">Nexus Retail · D2C e-commerce</div>
            </div>
            <div className="rc rv d2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", background: "var(--bg2)" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1 }}>2 weeks</div>
              <div style={{ fontSize: ".8rem", color: "var(--t2)", marginTop: 8, lineHeight: 1.6 }}>Average time from first call<br />to a live, selling store</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 0" }}>
        <div className="w" style={{ maxWidth: 720 }}>
          <span className="s-label rv">FAQ</span>
          <h2 className="s-h rv d1">Common questions</h2>
          <div style={{ marginTop: 36, display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rv d${(i % 4) + 1}`}
                style={{ padding: "20px 0" }}
              >
                <div style={{ fontSize: ".9rem", fontWeight: 600, letterSpacing: "-.01em", marginBottom: 8 }}>{faq.q}</div>
                <p style={{ fontSize: ".82rem", color: "var(--t2)", lineHeight: 1.72 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-glow" aria-hidden="true" />
        <div className="w">
          <div className="cta-inner rv">
            <h2 className="cta-h">Ready to build your store?</h2>
            <p className="cta-sub">Tell us what you need. We&apos;ll scope it, price it, and get back within one business day.</p>
            <div className="cta-btns">
              <Link href="/contact" className="hbtn hbtn-p">Start a Project →</Link>
              <Link href="/case-studies" className="hbtn hbtn-g">See Results</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
