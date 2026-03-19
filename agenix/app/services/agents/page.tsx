import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "AI Agents — Agenix",
  description:
    "Purpose-built AI agents for your store, your business, and your personal workflow. Not generic chatbots — agents that know your business and handle the job end-to-end.",
};

const agents = [
  {
    n: "01", tag: "Store", id: "support",
    title: "Store Support Agent",
    body: "Handles customer questions, order status checks, returns, and complaints — across store chat, email, and WhatsApp. Trained on your products, policies, and tone of voice. Available 24/7 without a support team.",
    usecases: ["Order status & tracking queries", "Returns & refund requests", "Product questions & recommendations", "Complaint handling & escalation", "WhatsApp & email integration"],
    stat1: { v: "78%",  l: "Queries resolved without a human" },
    stat2: { v: "24/7", l: "Always available" },
  },
  {
    n: "02", tag: "Store", id: "sales",
    title: "Sales & Upsell Agent",
    body: "Recommends the right products at the right time, recovers abandoned carts, and personalises the shopping experience for every customer. Knows your catalogue, understands buying intent, and converts.",
    usecases: ["Abandoned cart recovery sequences", "Product recommendations & cross-sells", "Personalised promotions & offers", "Post-purchase upsell flows", "Browse abandonment recovery"],
    stat1: { v: "+34%", l: "Average order value" },
    stat2: { v: "−28%", l: "Cart abandonment rate" },
  },
  {
    n: "03", tag: "Business", id: "leads",
    title: "Lead Qualification Agent",
    body: "Responds to inbound enquiries in seconds, qualifies against your criteria, books meetings or starts follow-up sequences — without your team lifting a finger. Works across email, web forms, and LinkedIn.",
    usecases: ["Instant inbound lead response", "Qualification against your ICP", "Meeting booking & calendar sync", "CRM enrichment & data entry", "Multi-channel: email, web, LinkedIn"],
    stat1: { v: "42 sec", l: "Average lead response time" },
    stat2: { v: "340%",   l: "Pipeline growth (Meridian SaaS)" },
  },
  {
    n: "04", tag: "Business", id: "finance",
    title: "Invoice & Finance Agent",
    body: "Reads invoices, matches purchase orders, flags discrepancies, and posts approved entries to your accounting system automatically. Handles 2,000+ documents a month at 99.97% accuracy — no spreadsheets.",
    usecases: ["Invoice reading & data extraction", "PO matching & reconciliation", "Discrepancy flagging & approval routing", "Accounting system integration (Xero, QuickBooks)", "Month-end reporting automation"],
    stat1: { v: "99.97%", l: "Processing accuracy" },
    stat2: { v: "8 min",  l: "Per invoice (was 5 days)" },
  },
  {
    n: "05", tag: "Personal", id: "personal",
    title: "Real-Time Personal Assistant",
    body: "An AI assistant trained on your context — your work, your schedule, your documents. Helps students research faster, teachers plan lessons, and professionals get through the day without the admin overhead.",
    usecases: ["Research & document summarisation", "Lesson & content planning", "Email drafting & calendar management", "Meeting notes & action item extraction", "Custom knowledge base integration"],
    stat1: { v: "Any role",  l: "Student, teacher, professional" },
    stat2: { v: "Private",   l: "Your data stays yours" },
  },
  {
    n: "06", tag: "Custom", id: "custom",
    title: "Any Agent You Need",
    body: "HR screening, contract review, inventory management, content creation, compliance monitoring — if there's a job that repeats, we can build an agent that handles it. Fixed price, deployed in 2 weeks.",
    usecases: ["HR screening & onboarding automation", "Contract review & clause extraction", "Inventory & supplier management", "Content creation & publishing workflows", "Compliance monitoring & reporting"],
    stat1: { v: "2 wks",  l: "Average deployment time" },
    stat2: { v: "Fixed",  l: "Pricing — no surprises" },
  },
];

export default function AgentsPage() {
  return (
    <PageLayout>
      <PageHero
        label="AI Agents"
        title={<>Agents built for<br /><span className="m">real work.</span></>}
        subtitle="Not generic chatbots. Purpose-built agents that know your business, connect to your tools, and handle the job from start to finish."
      />

      {/* Agents list */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">What We Build</span>
          <h2 className="s-h rv d1">Six agents — or something entirely custom</h2>
          <p className="s-sub rv d2">
            Each agent is built for a specific job. Pick one, combine several, or describe what you need and we&apos;ll build it.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 36 }}>
            {agents.map((a, i) => (
              <div
                key={a.id}
                id={a.id}
                className={`store-card rv d${(i % 3) + 1}`}
                style={{ padding: "26px 28px" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <div className="ag-n">{a.n}</div>
                      <div className="ag-tag">{a.tag}</div>
                    </div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-.02em", marginBottom: 12 }}>{a.title}</h3>
                    <p style={{ fontSize: ".83rem", color: "var(--t2)", lineHeight: 1.72, marginBottom: 20 }}>{a.body}</p>
                    <div style={{ display: "flex", gap: 24, padding: "14px 0" }}>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.02em" }}>{a.stat1.v}</div>
                        <div style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 2 }}>{a.stat1.l}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.02em" }}>{a.stat2.v}</div>
                        <div style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 2 }}>{a.stat2.l}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 12 }}>Use Cases</div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {a.usecases.map((uc) => (
                        <li key={uc} className="pillar-item">{uc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How agents work */}
      <section style={{ padding: "80px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <span className="s-label rv">How It Works</span>
          <h2 className="s-h rv d1">From brief to deployed in 2 weeks</h2>
          <div className="steps rv d2" style={{ marginTop: 36 }}>
            {[
              { n: "01", title: "Define the job",      body: "We understand exactly what the agent needs to do — not just the task, but the edge cases, the escalation paths, and the success criteria.",    time: "Day 1–2"   },
              { n: "02", title: "Connect & configure", body: "We connect to your tools (CRM, email, WhatsApp, Slack, accounting system) and configure the agent with your data, policies, and tone of voice.", time: "Day 3–7"   },
              { n: "03", title: "Test & refine",       body: "We run it against real scenarios, edge cases, and stress tests. You review outputs. We refine until it handles every case correctly.",            time: "Day 7–12"  },
              { n: "04", title: "Deploy & monitor",    body: "Live deployment with monitoring, escalation paths, and 30 days post-launch support. We watch the metrics and fix anything that drifts.",        time: "Day 12–14" },
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

      {/* Integrations */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">Integrations</span>
          <h2 className="s-h rv d1">Connects to your existing tools</h2>
          <p className="s-sub rv d2">We integrate with the tools you already use — no ripping and replacing your stack.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 36 }}>
            {[
              { cat: "Communication",  items: ["WhatsApp", "Email (any)", "Slack", "Intercom"]           },
              { cat: "CRM & Sales",    items: ["HubSpot",  "Salesforce",  "Pipedrive", "Notion"]        },
              { cat: "E-Commerce",     items: ["Shopify",  "WooCommerce", "Magento",   "Custom"]        },
              { cat: "Finance & Ops",  items: ["Xero",     "QuickBooks",  "SAP",       "Monday.com"]    },
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

      {/* CTA */}
      <section style={{ padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-glow" aria-hidden="true" />
        <div className="w">
          <div className="cta-inner rv">
            <h2 className="cta-h">Ready to build your agent?</h2>
            <p className="cta-sub">
              Tell us the job it needs to do. We&apos;ll scope it, build it, and have it live in two weeks.
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
