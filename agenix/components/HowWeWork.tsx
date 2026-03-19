export default function HowWeWork() {
  return (
    <section id="how">
      <div className="w">
        <span className="s-label rv">How We Work</span>
        <h2 className="s-h rv d1">From idea to production in 2 weeks</h2>
        <p className="s-sub rv d2">
          A straightforward process that gets you live fast — without surprises on
          either end.
        </p>

        <div className="steps rv d2">
          <div className="step">
            <div className="step-n">01</div>
            <div className="step-title">Discovery</div>
            <p className="step-body">
              We understand your business, your workflow, and the exact outcome you
              need. No assumptions, no templates — everything starts here.
            </p>
            <span className="step-time">Day 1–3</span>
          </div>
          <div className="step">
            <div className="step-n">02</div>
            <div className="step-title">Scope & Plan</div>
            <p className="step-body">
              A clear spec, a fixed price, and a realistic timeline. You know exactly
              what you&apos;re getting before we write a single line of code.
            </p>
            <span className="step-time">Day 3–5</span>
          </div>
          <div className="step">
            <div className="step-n">03</div>
            <div className="step-title">Build</div>
            <p className="step-body">
              We build fast. You see progress daily. Feedback is incorporated as we
              go — not saved for the end when it&apos;s too late.
            </p>
            <span className="step-time">Day 5–12</span>
          </div>
          <div className="step">
            <div className="step-n">04</div>
            <div className="step-title">Deploy & Support</div>
            <p className="step-body">
              Production deployment, thorough testing, and 30 days of post-launch
              support included. We don&apos;t disappear after handover.
            </p>
            <span className="step-time">Day 12–14</span>
          </div>
        </div>
      </div>
    </section>
  );
}
