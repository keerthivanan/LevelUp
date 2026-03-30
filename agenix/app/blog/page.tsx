import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PageHero   from "@/components/PageHero";
import Link       from "next/link";
import { posts, catColors } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Agenix",
  description: "Insights on AI agents, e-commerce, and workflow automation from the Agenix team.",
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
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`pillar rv d${(i % 3) + 1}`}
                style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}
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
              </Link>
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
