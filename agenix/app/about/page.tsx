import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";

export const metadata: Metadata = {
  title: "About — Agenix",
  description:
    "We're a small team that builds the technology that makes every job easier — stores, AI agents, and workflow automation, end-to-end.",
};

const values = [
  {
    n: "01",
    title: "Speed without shortcuts",
    body: "Two weeks to production isn't a marketing line — it's how we work. Tight scope, fast feedback, and no unnecessary meetings. We move fast because we've done this before.",
  },
  {
    n: "02",
    title: "Fixed price, no surprises",
    body: "You know the cost before we start. We scope carefully, price honestly, and absorb the risk of unexpected complexity. Your budget is your budget.",
  },
  {
    n: "03",
    title: "End-to-end ownership",
    body: "We don't hand off halfway. One team, from the first line of code to production deployment and 30 days of post-launch support. We're accountable for the outcome.",
  },
  {
    n: "04",
    title: "Built for the job, not the pitch",
    body: "We don't oversell AI or automation. We understand the job you need done and build exactly what solves it — nothing more, nothing less.",
  },
];

const stats = [
  { n: "50+",     l: "Businesses delivered"             },
  { n: "2 weeks", l: "Average time to production"       },
  { n: "8",       l: "Industries served"                },
  { n: "99.97%",  l: "Accuracy on automation pipelines" },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        label="About Agenix"
        title={<>We&apos;re the team that<br /><span className="m">builds the tech.</span></>}
        subtitle="A small, focused team building stores, AI agents, and automation that actually work — end-to-end, from idea to production."
      />

      {/* Mission */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start" }}>
            <div>
              <span className="s-label rv">Our Mission</span>
              <h2 className="s-h rv d1">
                Take the hard work out of running a business.
              </h2>
            </div>
            <div>
              <p className="rv d2" style={{ fontSize: ".9rem", color: "var(--t2)", lineHeight: 1.78, marginBottom: 16 }}>
                Most businesses spend enormous amounts of time on work that doesn't need a human — answering the same questions, chasing the same leads, entering the same data. That time is wasted, and it adds up fast.
              </p>
              <p className="rv d3" style={{ fontSize: ".9rem", color: "var(--t2)", lineHeight: 1.78 }}>
                We exist to fix that. Whether it&apos;s a store that sells itself, an agent that handles support around the clock, or a workflow that closes the books in hours instead of days — we build the technology that takes that weight off your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "64px 0", background: "var(--bggrey)" }}>
        <div className="w">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`rv d${i + 1}`}
                style={{ background: "var(--bg1)", border: "1px solid var(--bd)", borderRadius: 12, padding: "22px 20px", textAlign: "center" }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-.035em", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: ".72rem", color: "var(--t3)", marginTop: 6, lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">How We Operate</span>
          <h2 className="s-h rv d1">The principles behind how we work</h2>
          <div className="pillars" style={{ marginTop: 36 }}>
            {values.map((v, i) => (
              <div key={v.n} className={`pillar rv d${(i % 4) + 1}`}>
                <div className="pillar-n">{v.n}</div>
                <div className="pillar-title">{v.title}</div>
                <p className="pillar-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section style={{ padding: "80px 0" }}>
        <div className="w">
          <span className="s-label rv">What We Build</span>
          <h2 className="s-h rv d1">Three things we&apos;re great at</h2>
          <p className="s-sub rv d2">Every engagement sits within one of these three areas — or spans all of them.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 36 }}>
            {[
              { title: "E-Commerce Stores", href: "/services/stores", desc: "Shopify, WooCommerce, and fully custom storefronts — built to sell and scale." },
              { title: "AI Agents",         href: "/services/agents", desc: "Purpose-built agents for your store, your business, and your personal workflow." },
              { title: "Workflow Automation", href: "/services/automation", desc: "End-to-end automation that removes the manual from your operations." },
            ].map((s, i) => (
              <Link
                key={s.title}
                href={s.href}
                className={`pillar rv d${i + 1}`}
                style={{ display: "block" }}
              >
                <div className="pillar-title" style={{ marginBottom: 10 }}>{s.title}</div>
                <p className="pillar-body">{s.desc}</p>
                <div style={{ marginTop: 16, fontSize: ".78rem", color: "var(--t3)" }}>Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-glow" aria-hidden="true" />
        <div className="w">
          <div className="cta-inner rv">
            <h2 className="cta-h">Ready to start building?</h2>
            <p className="cta-sub">
              Tell us what you need. We&apos;ll come back with a clear plan and a fixed price — no obligation.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="hbtn hbtn-p">Start a Project →</Link>
              <Link href="/case-studies" className="hbtn hbtn-g">See Our Results</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
