const testimonials = [
  {
    quote:
      "Our SDRs used to spend most of their day sorting through leads. Now they only talk to people who are ready. Pipeline tripled in a quarter and we didn't add a single person to the team.",
    initials: "JR",
    name: "James Rothwell",
    role: "CEO, Meridian SaaS",
  },
  {
    quote:
      "We were sceptical about adding a support agent to our store. But CSAT went from 3.8 to 4.9 and support costs dropped 70%. Customers don't care if it's AI — they care about getting a fast, accurate answer.",
    initials: "AS",
    name: "Ananya Shah",
    role: "Head of CX, Nexus Retail",
  },
  {
    quote:
      "We'd spoken to larger agencies who wanted six months to scope the work. Agenix had us live in two weeks with results in the first few days. That's the difference between a consultancy and a team that actually builds things.",
    initials: "DV",
    name: "David Vance",
    role: "CTO, Solara Energy",
  },
];

const delays = ["d1", "d2", "d3"];

export default function Testimonials() {
  return (
    <section id="testi">
      <div className="w">
        <span className="s-label rv">From our clients</span>
        <h2 className="s-h rv d1">In their own words</h2>

        <div className="tst-grid">
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`tc rv ${delays[i]}`}>
              <div className="tc-stars" aria-label="5 stars">★★★★★</div>
              <blockquote>
                <p className="tc-text">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="tc-person">
                <div
                  className="tc-av"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
