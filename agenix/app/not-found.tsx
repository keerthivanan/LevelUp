import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "#000",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        {/* 404 number */}
        <div
          style={{
            fontSize: "clamp(5rem, 15vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-.06em",
            lineHeight: 1,
            color: "rgba(255,255,255,0.06)",
            marginBottom: 24,
            userSelect: "none",
          }}
        >
          404
        </div>

        {/* Logo mark */}
        <div
          style={{
            width: 40,
            height: 40,
            background: "#fff",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            fontWeight: 800,
            color: "#0a0a0a",
            margin: "0 auto 24px",
          }}
        >
          D
        </div>

        <h1
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
            fontWeight: 700,
            letterSpacing: "-.04em",
            marginBottom: 12,
            color: "#fff",
          }}
        >
          Page not found.
        </h1>

        <p
          style={{
            fontSize: ".9rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Head back home or explore what we build.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "11px 22px",
              borderRadius: 8,
              background: "#fff",
              color: "#0a0a0a",
              fontSize: ".875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to Home →
          </Link>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "11px 22px",
              borderRadius: 8,
              background: "rgba(255,255,255,.06)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.15)",
              fontSize: ".875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View Services
          </Link>
        </div>
      </div>
    </main>
  );
}
