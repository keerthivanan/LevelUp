import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service — Agenix",
  description: "Terms and conditions for working with Agenix.",
};

const sections = [
  {
    title: "Services",
    body: `Agenix Ltd provides technology services including e-commerce store development, AI agent development, and workflow automation. The specific scope of work, deliverables, timeline, and price for each project are agreed in writing before work begins. We do not begin work until the scope and price are confirmed by both parties.`,
  },
  {
    title: "Pricing & payment",
    body: `All projects are fixed-price unless otherwise agreed. A deposit is typically required before work begins, with the balance due on project completion or at agreed milestones. Invoices are due within 14 days of issue. Late payments may result in paused work. All prices are exclusive of VAT where applicable.`,
  },
  {
    title: "Intellectual property",
    body: `Upon full payment, you own the deliverables we build for you — including all source code, designs, and documentation. We retain the right to reference the project in our portfolio and case studies, subject to any confidentiality agreements. We may use open-source components and third-party libraries, which remain subject to their own licences.`,
  },
  {
    title: "Confidentiality",
    body: `We treat all client information as confidential by default. We will sign a mutual NDA on request before any project discussion. Our team operates under internal confidentiality agreements and we do not share client data with third parties except where required for delivery (e.g., cloud infrastructure providers).`,
  },
  {
    title: "Post-launch support",
    body: `All projects include 30 days of post-launch support covering bug fixes and minor adjustments. This does not cover new feature development, scope changes, or issues caused by third-party platform changes. Support is available by email within business hours.`,
  },
  {
    title: "Warranties & liability",
    body: `We build to a professional standard and stand behind our work. We will fix any bugs or failures caused by our code within the support period at no charge. We do not guarantee specific business outcomes (e.g., revenue increases, conversion rates). Our total liability in any matter is limited to the fees paid for the relevant project.`,
  },
  {
    title: "Cancellation",
    body: `Either party may cancel a project with written notice. If you cancel after work has begun, you are liable for the cost of work completed to date. We will provide a fair accounting of work done and any applicable refund of unused deposit amounts.`,
  },
  {
    title: "Governing law",
    body: `These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    title: "Changes to these terms",
    body: `These terms apply to all engagements unless superseded by a signed contract. We may update these terms from time to time. The terms in effect at the time of project agreement apply for that project.`,
  },
  {
    title: "Contact",
    body: `For any questions about these terms, contact hello@agenix.co or write to Agenix Ltd, London, United Kingdom.`,
  },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <PageHero
        label="Legal"
        title="Terms of Service"
        subtitle="Last updated: January 2025"
      />
      <section style={{ padding: "72px 0 80px" }}>
        <div className="w" style={{ maxWidth: 720 }}>
          {sections.map((s, i) => (
            <div
              key={i}
              className={`rv d${(i % 4) + 1}`}
              style={{ paddingBottom: 28, marginBottom: 28 }}
            >
              <h2 style={{ fontSize: ".9375rem", fontWeight: 700, letterSpacing: "-.02em", marginBottom: 10 }}>
                {s.title}
              </h2>
              <p style={{ fontSize: ".85rem", color: "var(--t2)", lineHeight: 1.78 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
