import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "Services — Agenix",
  description:
    "E-Commerce stores, AI agents, and workflow automation — built end-to-end, from idea to production deployment.",
};

const services = [
  {
    n: "01",
    title: "E-Commerce Stores",
    href: "/services/stores",
    tag: "Shopify · WooCommerce · Custom",
    body: "We build online stores from scratch — Shopify, WooCommerce, or fully custom — designed to sell, handle large catalogues, and scale without breaking. From theme design to product import to payment setup.",
    feats: [
      "Shopify & WooCommerce development",
      "Custom storefronts for any catalogue size",
      "10,000–20,000+ product management",
      "Payment, shipping & inventory setup",
      "SEO, analytics & performance optimisation",
      "AI-powered product search (custom builds)",
    ],
    stat: { v: "2 weeks", l: "Average store launch" },
  },
  {
    n: "02",
    title: "AI Agents",
    href: "/services/agents",
    tag: "Store · Business · Personal",
    body: "Purpose-built AI agents that know your business, connect to your tools, and handle the job from start to finish. Store support, lead qualification, invoice processing, and personal assistants.",
    feats: [
      "Store support & sales agents",
      "Lead qualification & follow-up",
      "Invoice & finance automation",
      "Real-time personal assistants",
      "HR screening & document review",
      "Custom agents for any repeating job",
    ],
    stat: { v: "78%", l: "Queries resolved without human" },
  },
  {
    n: "03",
    title: "Workflow Automation",
    href: "/services/automation",
    tag: "Operations · Integrations · Reporting",
    body: "We map your operations and automate the steps that don't need a human. Tool integrations across your entire stack, automated reporting, and ongoing optimisation after launch.",
    feats: [
      "End-to-end workflow design & build",
      "Integrations across your entire tool stack",
      "Automated reporting & notifications",
      "Data entry & document processing",
      "Multi-system synchronisation",
      "Ongoing optimisation after launch",
    ],
    stat: { v: "5d → 4h", l: "Month-end close time (Stratum Finance)" },
  },
];

export default function ServicesPage() {
  return (
    <PageLayout>
      <PageHero
        label="Services"
        title={<>Everything we build,<br /><span className="m">in one place.</span></>}
        subtitle="Three core areas. One team. End-to-end from idea to production."
      />

      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {services.map((s, i) => (
              <div
                key={s.n}
                className={`rv d${i + 1}`}
                style={{ background: "var(--bg1)", border: "1px solid var(--bd)", borderRadius: 12, padding: 28 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <div style={{ fontSize: ".62rem", fontWeight: 500, color: "var(--t3)" }}>{s.n}</div>
                      <div className="store-tag">{s.tag}</div>
                    </div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-.025em", marginBottom: 12 }}>{s.title}</h2>
                    <p style={{ fontSize: ".85rem", color: "var(--t2)", lineHeight: 1.72, marginBottom: 20 }}>{s.body}</p>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 0" }}>
                      <div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-.025em" }}>{s.stat.v}</div>
                        <div style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 2 }}>{s.stat.l}</div>
                      </div>
                    </div>
                    <Link href={s.href} className="hbtn hbtn-p" style={{ marginTop: 16, display: "inline-flex" }}>
                      Explore {s.title} →
                    </Link>
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                    {s.feats.map((f) => (
                      <li key={f} className="pillar-item">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "80px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <span className="s-label rv">How It Works</span>
          <h2 className="s-h rv d1">From idea to production in 2 weeks</h2>
          <div className="steps rv d2" style={{ marginTop: 36 }}>
            {[
              { n: "01", title: "Discovery",        body: "We understand your business and the exact outcome you need.",              time: "Day 1–3"   },
              { n: "02", title: "Scope & Plan",     body: "A clear spec, a fixed price, a realistic timeline. No surprises.",        time: "Day 3–5"   },
              { n: "03", title: "Build",            body: "We build fast. You see progress daily. Feedback in as we go.",            time: "Day 5–12"  },
              { n: "04", title: "Deploy & Support", body: "Production deployment and 30 days post-launch support, included.",        time: "Day 12–14" },
            ].map((step) => (
              <div key={step.n} className="step">
                <div className="step-n">{step.n}</div>
                <div className="step-title">{step.title}</div>
                <p className="step-body">{step.body}</p>
                <span className="step-time">{step.time}</span>
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
            <h2 className="cta-h">Not sure where to start?</h2>
            <p className="cta-sub">
              Tell us what you&apos;re trying to build or fix. We&apos;ll scope it, price it, and get back to you within one business day.
            </p>
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
