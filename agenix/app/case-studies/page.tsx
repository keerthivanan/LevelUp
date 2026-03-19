import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "Case Studies — Agenix",
  description:
    "Real results from live projects — pipeline growth, cost reduction, and automation that actually works.",
};

const cases = [
  {
    id: "meridian",
    cat: "B2B SaaS · Lead Qualification Agent",
    company: "Meridian SaaS",
    tagline: "Tripled pipeline in 90 days without a single new hire",
    challenge: "Meridian's sales team was manually processing 400+ inbound leads per month with a 48-hour average response time. Qualified leads were getting cold before the team even reached them, and SDRs spent most of their day on admin rather than selling.",
    solution: "We built a lead qualification agent that intercepts every inbound enquiry within seconds, enriches the lead with company data, scores it against Meridian's ICP, and either books a meeting directly or routes it into the appropriate nurture sequence. The sales team only engages when a lead is warm, qualified, and ready.",
    quote: "Our SDRs used to spend most of their day sorting through leads. Now they only talk to people who are ready. Pipeline tripled in a quarter and we didn't add a single person to the team.",
    quoteAuthor: "James Rothwell",
    quoteRole: "CEO, Meridian SaaS",
    quoteInitials: "JR",
    metrics: [
      { v: "340%", l: "Pipeline growth in 90 days" },
      { v: "42 sec", l: "Response time (was 48 hrs)" },
      { v: "31%", l: "Lead-to-meeting rate (was 12%)" },
      { v: "−65%", l: "SDR operating cost" },
    ],
    service: "Lead Qualification Agent",
    serviceHref: "/services/agents#leads",
  },
  {
    id: "nexus",
    cat: "E-Commerce · Store Support Agent",
    company: "Nexus Retail",
    tagline: "Cut support costs 70% while increasing customer satisfaction",
    challenge: "Nexus Retail's support team was handling 3,000+ queries per month across email and chat. Response times were averaging 6 hours during peak periods, CSAT was 3.8/5, and the support function was absorbing significant headcount and cost.",
    solution: "We built a support agent trained on Nexus's product catalogue, order management system, and returns policy. It integrates directly with their WooCommerce store and handles order queries, return requests, and complaints across chat and WhatsApp — escalating to a human only when genuinely needed.",
    quote: "We were sceptical about adding a support agent to our store. But CSAT went from 3.8 to 4.9 and support costs dropped 70%. Customers don't care if it's AI — they care about getting a fast, accurate answer.",
    quoteAuthor: "Ananya Shah",
    quoteRole: "Head of CX, Nexus Retail",
    quoteInitials: "AS",
    metrics: [
      { v: "−70%", l: "Support operating cost" },
      { v: "4.9/5", l: "CSAT score (was 3.8/5)" },
      { v: "78%", l: "Queries resolved without human" },
      { v: "< 30s", l: "Average response time" },
    ],
    service: "Store Support Agent",
    serviceHref: "/services/agents#support",
  },
  {
    id: "stratum",
    cat: "Finance · Workflow Automation",
    company: "Stratum Finance",
    tagline: "Month-end close went from 5 days to 4 hours",
    challenge: "Stratum's finance team was processing 2,000+ invoices per month entirely manually — reading, matching to POs, flagging discrepancies, and posting to their accounting system. Three team members spent the majority of their working week on data entry alone.",
    solution: "We built an automated invoice processing pipeline that reads incoming invoices using document AI, matches against purchase orders, flags any discrepancies for human review, and posts approved entries directly to Xero. The human team reviews exceptions only — not every document.",
    quote: "We'd spoken to larger agencies who wanted six months to scope the work. Agenix had us live in two weeks with results in the first few days. That's the difference between a consultancy and a team that actually builds things.",
    quoteAuthor: "David Vance",
    quoteRole: "CTO, Solara Energy",
    quoteInitials: "DV",
    metrics: [
      { v: "99.97%", l: "Processing accuracy" },
      { v: "5d → 4h", l: "Month-end close time" },
      { v: "2,000", l: "Documents processed/month" },
      { v: "3", l: "Staff freed from manual entry" },
    ],
    service: "Invoice & Finance Automation",
    serviceHref: "/services/automation",
  },
];

export default function CaseStudiesPage() {
  return (
    <PageLayout>
      <PageHero
        label="Case Studies"
        title={<>Real results,<br /><span className="m">real numbers.</span></>}
        subtitle="Three businesses that used Agenix to cut costs, grow revenue, and get time back."
      />

      {/* Summary stats */}
      <section style={{ padding: "56px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[
              { v: "340%", l: "Pipeline growth in 90 days" },
              { v: "−70%", l: "Support cost reduction"     },
              { v: "5d → 4h", l: "Month-end close time"   },
              { v: "2 wks",   l: "Average time to live"   },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`rv d${i + 1}`}
                style={{ textAlign: "center", padding: "22px 16px", background: "var(--bg1)", border: "1px solid var(--bd)", borderRadius: 12 }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: ".7rem", color: "var(--t3)", marginTop: 6, lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      {cases.map((c, idx) => (
        <section
          key={c.id}
          id={c.id}
          style={{ padding: "80px 0", background: idx % 2 === 1 ? "var(--bggrey)" : undefined }}
        >
          <div className="w">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start" }}>
              {/* Left */}
              <div>
                <div className="rc-cat rv">{c.cat}</div>
                <h2
                  className="rv d1"
                  style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1.2, margin: "10px 0 20px" }}
                >
                  {c.company}: {c.tagline}
                </h2>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 8 }}>The Challenge</div>
                  <p className="rv d2" style={{ fontSize: ".83rem", color: "var(--t2)", lineHeight: 1.75 }}>{c.challenge}</p>
                </div>
                <div>
                  <div style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 8 }}>What We Built</div>
                  <p className="rv d3" style={{ fontSize: ".83rem", color: "var(--t2)", lineHeight: 1.75 }}>{c.solution}</p>
                </div>

                <div
                  className="rv d4"
                  style={{ background: "var(--bg2)", border: "1px solid var(--bd)", borderRadius: 12, padding: 20, marginTop: 24 }}
                >
                  <p style={{ fontSize: ".8125rem", color: "var(--t2)", lineHeight: 1.78, fontStyle: "italic" }}>
                    &ldquo;{c.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 14 }}>
                    <div className="tc-av">{c.quoteInitials}</div>
                    <div>
                      <div style={{ fontSize: ".8rem", fontWeight: 600 }}>{c.quoteAuthor}</div>
                      <div style={{ fontSize: ".7rem", color: "var(--t3)", marginTop: 1 }}>{c.quoteRole}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — metrics */}
              <div className="rv d2">
                <dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {c.metrics.map((m) => (
                    <div
                      key={m.l}
                      style={{ background: "var(--bg1)", border: "1px solid var(--bd)", borderRadius: 12, padding: "20px 18px" }}
                    >
                      <dd style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1 }}>{m.v}</dd>
                      <dt style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 5, lineHeight: 1.5 }}>{m.l}</dt>
                    </div>
                  ))}
                </dl>
                <div
                  style={{ marginTop: 10, background: "var(--bg1)", border: "1px solid var(--bd)", borderRadius: 12, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>
                    <div style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 4 }}>Service Used</div>
                    <div style={{ fontSize: ".875rem", fontWeight: 600 }}>{c.service}</div>
                  </div>
                  <Link href={c.serviceHref} style={{ fontSize: ".78rem", color: "var(--t3)", whiteSpace: "nowrap" }}>
                    View service →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-glow" aria-hidden="true" />
        <div className="w">
          <div className="cta-inner rv">
            <h2 className="cta-h">Your results could be next.</h2>
            <p className="cta-sub">
              Tell us what you&apos;re trying to fix or build. We&apos;ll come back with a clear plan and a fixed price.
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
