interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section style={{ padding: "72px 0 64px", textAlign: "center" }}>
      <div className="w">
        <span className="s-label rv">{label}</span>
        <h1
          className="rv d1"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            letterSpacing: "-.04em",
            lineHeight: 1.08,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="rv d2"
            style={{
              fontSize: "1rem",
              color: "var(--t2)",
              lineHeight: 1.72,
              maxWidth: 520,
              margin: "18px auto 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
