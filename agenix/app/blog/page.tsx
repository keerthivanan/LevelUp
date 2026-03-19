import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "Blog — Agenix",
  description: "Insights on AI agents, e-commerce, and workflow automation from the Agenix team.",
};

const posts = [
  {
    slug: "lead-qualification-agents",
    cat: "AI Agents",
    title: "How a Lead Qualification Agent Tripled a SaaS Company's Pipeline",
    excerpt: "What happens when you replace a 48-hour response time with a 42-second one — and how we built the agent that did it.",
    date: "12 Feb 2025",
    readTime: "6 min read",
  },
  {
    slug: "shopify-vs-custom",
    cat: "E-Commerce",
    title: "Shopify vs Custom Storefront: When to Upgrade and When Not To",
    excerpt: "Most businesses don't need a custom storefront. Here's the framework we use to decide — and the signals that tell us when they do.",
    date: "29 Jan 2025",
    readTime: "8 min read",
  },
  {
    slug: "invoice-automation",
    cat: "Automation",
    title: "From 5 Days to 4 Hours: Inside a Month-End Close Automation",
    excerpt: "A walkthrough of how we automated 2,000 invoices a month — including the architecture, the edge cases, and what 99.97% accuracy actually means.",
    date: "14 Jan 2025",
    readTime: "10 min read",
  },
  {
    slug: "ai-agents-vs-chatbots",
    cat: "AI Agents",
    title: "AI Agents vs Chatbots: What's the Actual Difference?",
    excerpt: "The word 'chatbot' has become a catch-all that covers everything from a FAQ widget to a fully autonomous business agent. Here's how to tell them apart.",
    date: "8 Jan 2025",
    readTime: "5 min read",
  },
  {
    slug: "woocommerce-large-catalogue",
    cat: "E-Commerce",
    title: "Managing 20,000 SKUs on WooCommerce Without Losing Your Mind",
    excerpt: "The plugins, the architecture decisions, and the import pipeline we use to keep large-catalogue WooCommerce stores running fast and accurate.",
    date: "18 Dec 2024",
    readTime: "7 min read",
  },
  {
    slug: "automation-roi",
    cat: "Automation",
    title: "How to Calculate the ROI of Business Automation (With Real Numbers)",
    excerpt: "A practical framework for working out whether a workflow automation is worth building — and how to present the business case internally.",
    date: "5 Dec 2024",
    readTime: "9 min read",
  },
];

const catColors: Record<string, string> = {
  "AI Agents":   "rgba(99,102,241,.15)",
  "E-Commerce":  "rgba(16,185,129,.12)",
  "Automation":  "rgba(245,158,11,.12)",
};

export default function BlogPage() {
  return (
    <PageLayout>
      <PageHero
        label="Blog"
        title={<>Insights from<br /><span className="m">the build.</span></>}
        subtitle="How we think about stores, agents, and automation — practical, numbers-first, no fluff."
      />

      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className={`pillar rv d${(i % 3) + 1}`}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: ".62rem", fontWeight: 600, letterSpacing: ".06em",
                      textTransform: "uppercase", padding: "3px 9px", borderRadius: 100,
                      background: catColors[post.cat] ?? "rgba(255,255,255,.05)",
                      border: "1px solid var(--bd)", color: "var(--t3)",
                    }}
                  >
                    {post.cat}
                  </span>
                  <span style={{ fontSize: ".62rem", color: "var(--t3)" }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontSize: ".9375rem", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.35, marginBottom: 10, flex: 1 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: ".78rem", color: "var(--t2)", lineHeight: 1.68, marginBottom: 18 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14 }}>
                  <span style={{ fontSize: ".65rem", color: "var(--t3)" }}>{post.date}</span>
                  <span style={{ fontSize: ".72rem", color: "var(--t3)" }}>Read →</span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon banner */}
          <div
            className="rv"
            style={{
              marginTop: 40, padding: "28px 24px", background: "var(--bg1)",
              border: "1px dashed rgba(255,255,255,.08)", borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: ".875rem", fontWeight: 600, marginBottom: 8 }}>More articles coming soon</div>
            <p style={{ fontSize: ".78rem", color: "var(--t2)", maxWidth: 420, margin: "0 auto" }}>
              We publish every couple of weeks on AI agents, e-commerce, and workflow automation. Articles are practical, numbers-first, and based on real client work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-glow" aria-hidden="true" />
        <div className="w">
          <div className="cta-inner rv">
            <h2 className="cta-h" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>
              Ready to start building?
            </h2>
            <p className="cta-sub">
              No consultation fees, no long discovery processes. Tell us what you need and we&apos;ll get straight to scoping.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="hbtn hbtn-p">Start a Project →</Link>
              <Link href="/services" className="hbtn hbtn-g">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
