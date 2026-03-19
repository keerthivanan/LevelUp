import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Contact    from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Agenix",
  description:
    "Start a project with Agenix. Tell us what you need — we'll come back with a clear plan and a fixed price within one business day.",
};

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "Within one business day, always. If you send us a message in the morning, you'll have a response the same day.",
  },
  {
    q: "What happens after I send the form?",
    a: "We'll review your message, ask any clarifying questions, and come back with a rough scope and indicative price — at no cost and no obligation.",
  },
  {
    q: "Do you work with businesses outside the UK?",
    a: "Yes — we work worldwide. We have clients across Europe, North America, and Asia. Everything is done remotely and asynchronously where needed.",
  },
  {
    q: "How much does a project typically cost?",
    a: "It varies by scope. A Shopify store typically starts from £3,000–£8,000. An AI agent from £2,500–£6,000. Custom builds and enterprise work are scoped individually. We'll give you a fixed price before we start anything.",
  },
  {
    q: "Can I get an NDA before we talk?",
    a: "Yes, absolutely. Just mention it in the form and we'll send one over before the discovery call.",
  },
];

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero
        label="Contact"
        title={<>Let&apos;s talk about<br /><span className="m">your project.</span></>}
        subtitle="Tell us what you're trying to build. We'll come back with a clear plan and a fixed price — no obligation."
      />

      {/* Main contact section */}
      <Contact />

      {/* FAQ */}
      <section style={{ padding: "80px 0", background: "var(--bggrey)" }}>
        <div className="w" style={{ maxWidth: 680 }}>
          <span className="s-label rv">FAQ</span>
          <h2 className="s-h rv d1">Before you send</h2>
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
    </PageLayout>
  );
}
