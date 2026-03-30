import type { Metadata } from "next";
import { notFound }     from "next/navigation";
import Link             from "next/link";
import PageLayout       from "@/components/PageLayout";
import { posts, catColors, getPost } from "@/lib/blog-posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Agenix Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const catColor = catColors[post.cat] ?? "rgba(255,255,255,.05)";

  const paragraphs = post.body
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageLayout>
      {/* Article header */}
      <section style={{ padding: "80px 0 48px" }}>
        <div className="w" style={{ maxWidth: 720 }}>
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: ".75rem",
              color: "var(--t3)",
              marginBottom: 32,
              transition: "color .15s",
            }}
          >
            ← Back to Blog
          </Link>

          {/* Category + meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontSize: ".62rem", fontWeight: 600, letterSpacing: ".06em",
                textTransform: "uppercase", padding: "3px 10px", borderRadius: 100,
                background: catColor, border: "1px solid var(--bd)", color: "var(--t3)",
              }}
            >
              {post.cat}
            </span>
            <span style={{ fontSize: ".65rem", color: "var(--t3)" }}>{post.date}</span>
            <span style={{ fontSize: ".65rem", color: "var(--t3)" }}>·</span>
            <span style={{ fontSize: ".65rem", color: "var(--t3)" }}>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "-.04em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--t2)",
              lineHeight: 1.7,
              borderLeft: "2px solid rgba(255,255,255,0.12)",
              paddingLeft: 20,
              marginBottom: 8,
            }}
          >
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w" style={{ maxWidth: 720 }}>
        <div style={{ height: 1, background: "var(--bd)", marginBottom: 48 }} />
      </div>

      {/* Article body */}
      <section style={{ paddingBottom: 80 }}>
        <div className="w" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {paragraphs.map((para, i) => {
              // Bold headings: lines starting with **text**
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h2
                    key={i}
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      letterSpacing: "-.02em",
                      marginTop: 16,
                      color: "var(--t1)",
                    }}
                  >
                    {para.slice(2, -2)}
                  </h2>
                );
              }

              // Inline bold + italic parsing
              const rendered = renderInline(para);

              return (
                <p
                  key={i}
                  style={{
                    fontSize: ".9375rem",
                    color: "var(--t2)",
                    lineHeight: 1.8,
                  }}
                  dangerouslySetInnerHTML={{ __html: rendered }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-glow" aria-hidden="true" />
        <div className="w">
          <div className="cta-inner">
            <h2 className="cta-h" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>
              Want to build something like this?
            </h2>
            <p className="cta-sub">
              We work from idea to production — stores, agents, and automation for businesses of all sizes.
            </p>
            <div className="cta-btns">
              <Link href="/contact" className="hbtn hbtn-p">Start a Project →</Link>
              <Link href="/blog"    className="hbtn hbtn-g">More Articles</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

/** Convert **bold** and *italic* to HTML — no external deps needed */
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
