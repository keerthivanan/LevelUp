import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — Agenix",
  description: "How Agenix collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Who we are",
    body: `Agenix Ltd is a technology company based in London, United Kingdom. We build e-commerce stores, AI agents, and workflow automations for businesses. Our registered address is available on request. You can contact us at hello@agenix.co or +44 20 7946 0392.`,
  },
  {
    title: "What information we collect",
    body: `We collect information you provide directly to us — including name, email address, company name, phone number, and any project details you include in contact forms or enquiries. We may also collect information about how you use our website through analytics tools, including pages visited, time on site, and referral source. We do not collect sensitive personal data.`,
  },
  {
    title: "How we use your information",
    body: `We use the information you provide to respond to your enquiries, scope and deliver projects, and communicate about work in progress. We may use your contact information to send occasional updates about our services, which you can opt out of at any time. We do not sell your data to third parties.`,
  },
  {
    title: "Legal basis for processing",
    body: `We process your personal data on the basis of legitimate interests (responding to enquiries, delivering services), contractual necessity (where you are a client), and consent (where you have opted in to communications). You can withdraw consent at any time by contacting us.`,
  },
  {
    title: "Cookies & analytics",
    body: `Our website uses minimal analytics to understand how visitors use the site. We use privacy-respecting analytics that do not require consent under applicable law. We do not use advertising cookies or third-party tracking pixels. You can disable cookies in your browser settings.`,
  },
  {
    title: "Third-party services",
    body: `We use Formspree to process contact form submissions. Data submitted via the contact form is transmitted to Formspree's servers and subject to their privacy policy. We may also use tools such as Google Analytics, Notion, and project management software in the delivery of client work. These tools have their own privacy policies.`,
  },
  {
    title: "Data retention",
    body: `We retain enquiry data for 24 months from the date of last contact. Client project data is retained for the duration of the engagement plus 5 years for legal and accounting purposes. You can request deletion of your data at any time by contacting us.`,
  },
  {
    title: "Your rights",
    body: `Under UK GDPR and the Data Protection Act 2018, you have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to or restrict processing; and data portability. To exercise any of these rights, email hello@agenix.co. We will respond within 30 days.`,
  },
  {
    title: "Data security",
    body: `We take reasonable technical and organisational measures to protect your data from unauthorised access, loss, or disclosure. Our team accesses client data only on a need-to-know basis and under confidentiality agreements. We can sign an NDA on request before any project discussion.`,
  },
  {
    title: "Changes to this policy",
    body: `We may update this policy from time to time. The current version will always be available at this URL. Material changes will be communicated to active clients by email.`,
  },
  {
    title: "Contact",
    body: `For any privacy-related questions or requests, contact us at hello@agenix.co or write to Agenix Ltd, London, United Kingdom.`,
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout>
      <PageHero
        label="Legal"
        title="Privacy Policy"
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
