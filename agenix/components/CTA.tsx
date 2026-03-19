export default function CTA() {
  return (
    <section id="cta">
      <div className="cta-glow" aria-hidden="true" />
      <div className="w">
        <div className="cta-inner rv">
          <h2 className="cta-h">
            Tell us what you need.<br />
            <span className="m">We&apos;ll build it.</span>
          </h2>
          <p className="cta-sub">
            Whether it&apos;s a store, an agent, a workflow, or all three — we work from
            idea to production. One team, end-to-end.
          </p>
          <div className="cta-btns">
            <a href="#contact" className="hbtn hbtn-p">Start a Project →</a>
            <a href="#results" className="hbtn hbtn-g">See Results</a>
          </div>

          <div className="hero-stats" style={{ marginTop: 36 }}>
            <div className="hstat">
              <div className="hstat-n">2 weeks</div>
              <div className="hstat-l">From discovery<br />to first delivery</div>
            </div>
            <div className="hstat">
              <div className="hstat-n">50+</div>
              <div className="hstat-l">Businesses<br />delivered</div>
            </div>
            <div className="hstat">
              <div className="hstat-n">All sectors</div>
              <div className="hstat-l">Retail, healthcare,<br />finance, legal & more</div>
            </div>
            <div className="hstat">
              <div className="hstat-n">End-to-end</div>
              <div className="hstat-l">Frontend to<br />production deployment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
