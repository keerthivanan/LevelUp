import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "Workflow Automation — Agenix",
  description:
    "End-to-end workflow automation — we map your operations and automate the steps that don't need a human. Less manual work, fewer errors, faster results.",
};

const automations = [
  {
    n: "01",
    title: "Document Processing",
    desc: "Invoices, contracts, purchase orders, application forms — we build pipelines that read, classify, extract, and route documents automatically. No manual data entry.",
    examples: ["Invoice capture & PO matching", "Contract clause extraction", "Application form processing", "Receipt & expense categorisation"],
  },
  {
    n: "02",
    title: "Reporting & Analytics",
    desc: "Replace manual report building with automated pipelines that pull data from multiple sources, format it correctly, and deliver it to the right people at the right time.",
    examples: ["Daily/weekly/monthly reporting", "Multi-source data aggregation", "Slack & email delivery", "Custom dashboards & alerts"],
  },
  {
    n: "03",
    title: "CRM & Sales Operations",
    desc: "Automate lead enrichment, follow-up sequences, pipeline updates, and deal stage triggers — so your sales team works on selling, not admin.",
    examples: ["Lead enrichment & scoring", "Automated follow-up sequences", "Deal stage & CRM updates", "Meeting scheduling & reminders"],
  },
  {
    n: "04",
    title: "HR & Onboarding",
    desc: "From application screening to onboarding checklists — automate the repetitive parts of your HR process so your team focuses on the people, not the paperwork.",
    examples: ["Application screening & scoring", "Offer letter & contract generation", "Onboarding task automation", "Document collection & verification"],
  },
  {
    n: "05",
    title: "Finance & Month-End",
    desc: "Automate reconciliation, expense approval, payroll prep, and close activities — turning days of manual work into hours of automated processing.",
    examples: ["Invoice matching & reconciliation", "Expense approval workflows", "Payroll data preparation", "Month-end close automation"],
  },
  {
    n: "06",
    title: "Operations & Logistics",
    desc: "Inventory alerts, supplier communication, order routing, and fulfilment updates — automated across your entire supply chain without manual oversight.",
    examples: ["Low-stock alerts & reordering", "Supplier communication", "Order routing & fulfilment", "Shipping notification sequences"],
  },
];

const tools = [
  { cat: "Automation Platforms", items: ["Zapier", "Make (Integromat)", "n8n", "Custom pipelines"] },
  { cat: "Data & Documents",     items: ["Google Workspace", "Microsoft 365", "Notion", "Airtable"]  },
  { cat: "Communication",        items: ["Slack", "Email (SMTP/API)", "WhatsApp", "Teams"]            },
  { cat: "Finance",              items: ["Xero", "QuickBooks", "Sage", "SAP"]                         },
];

export default function AutomationPage() {
  return (
    <PageLayout>
      <PageHero
        label="Workflow Automation"
        title={<>Automate the work<br /><span className="m">that doesn&apos;t need you.</span></>}
        subtitle="We map your operations and build automations that run without human oversight — fewer errors, less time, more done."
      />

      {/* What we automate */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">What We Automate</span>
          <h2 className="s-h rv d1">Six areas where automation delivers the most</h2>
          <div className="agents-grid" style={{ marginTop: 36 }}>
            {automations.map((a, i) => (
              <div key={a.n} className={`ag rv d${(i % 3) + 1}`}>
                <div className="ag-header">
                  <div className="ag-n">{a.n}</div>
                </div>
                <div className="ag-title">{a.title}</div>
                <p className="ag-body">{a.desc}</p>
                <ul style={{ marginTop: 14, paddingTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                  {a.examples.map((ex) => (
                    <li key={ex} className="pillar-item" style={{ fontSize: ".72rem" }}>{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results highlight */}
      <section style={{ padding: "80px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <span className="s-label rv">Results</span>
          <h2 className="s-h rv d1">Real impact, real numbers</h2>
          <div className="res-grid" style={{ marginTop: 36 }}>
            <div className="rc big rv">
              <div>
                <div className="rc-cat">Finance · Invoice Automation</div>
                <div className="rc-title">Stratum Finance closed the month in 4 hours instead of 5 days</div>
                <p className="rc-body">An invoice processing automation handles 2,000 documents a month at 99.97% accuracy. Three staff who spent entire weeks on data entry now focus on analysis and client work.</p>
                <div className="rc-hr" />
                <div className="rc-co">Stratum Finance · Financial services</div>
              </div>
              <div>
                <dl className="rc-nums">
                  <div><dd className="rn-v">99.97%</dd><dt className="rn-l">Processing accuracy</dt></div>
                  <div><dd className="rn-v">5d → 4h</dd><dt className="rn-l">Month-end close time</dt></div>
                  <div><dd className="rn-v">2,000</dd><dt className="rn-l">Documents/month automated</dt></div>
                  <div><dd className="rn-v">3</dd><dt className="rn-l">Staff freed from data entry</dt></div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">Tools & Integrations</span>
          <h2 className="s-h rv d1">Connects to your entire stack</h2>
          <p className="s-sub rv d2">We work with the tools you already use — no ripping and replacing.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 36 }}>
            {tools.map((t, i) => (
              <div key={t.cat} className={`sector rv d${i + 1}`} style={{ padding: "22px 20px" }}>
                <div className="sector-name" style={{ marginBottom: 12 }}>{t.cat}</div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {t.items.map((item) => (
                    <li key={item} style={{ fontSize: ".775rem", color: "var(--t2)" }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "80px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <span className="s-label rv">Our Process</span>
          <h2 className="s-h rv d1">How we build automations</h2>
          <div className="steps rv d2" style={{ marginTop: 36 }}>
            {[
              { n: "01", title: "Map the workflow",   body: "We document every step in the current process — including the exceptions, the edge cases, and the parts that break.",               time: "Day 1–2" },
              { n: "02", title: "Design the system",  body: "We design the automation architecture, agree on the tools, and define how exceptions are handled without human intervention.",      time: "Day 2–5" },
              { n: "03", title: "Build & integrate",  body: "We build and connect each step, integrate with your existing tools, and run end-to-end tests against real data.",                 time: "Day 5–12" },
              { n: "04", title: "Monitor & optimise", body: "Post-launch monitoring, error alerting, and 30 days of support included. We tune the automation until it runs without oversight.", time: "Day 12–14" },
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
            <h2 className="cta-h">What&apos;s worth automating in your business?</h2>
            <p className="cta-sub">Tell us what your team spends the most time on. We&apos;ll show you what can be automated — and what it&apos;s worth.</p>
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
