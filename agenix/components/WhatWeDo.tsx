export default function WhatWeDo() {
  return (
    <section id="what">
      <div className="w">
        <span className="s-label rv">What We Do</span>
        <h2 className="s-h rv d1">Three things we&apos;re great at</h2>
        <p className="s-sub rv d2">
          We build stores, we build agents, and we automate workflows — end-to-end,
          from first line of code to production deployment.
        </p>

        <div className="pillars">
          <div className="pillar rv d1">
            <div className="pillar-n">01</div>
            <div className="pillar-title">E-Commerce Stores</div>
            <p className="pillar-body">
              We build online stores from scratch — Shopify, WooCommerce, or fully
              custom — designed to sell, handle large catalogues, and scale without
              breaking.
            </p>
            <ul className="pillar-list" aria-label="E-Commerce capabilities">
              <li className="pillar-item">Shopify & WooCommerce development</li>
              <li className="pillar-item">Custom storefronts, any size catalogue</li>
              <li className="pillar-item">10,000–20,000+ product management</li>
              <li className="pillar-item">Payment, shipping & inventory setup</li>
            </ul>
          </div>

          <div className="pillar rv d2">
            <div className="pillar-n">02</div>
            <div className="pillar-title">AI Agents</div>
            <p className="pillar-body">
              We build AI agents that work like a skilled employee — for your store,
              your business, or your personal workflow. They handle the repetitive,
              so you handle what matters.
            </p>
            <ul className="pillar-list" aria-label="AI Agent capabilities">
              <li className="pillar-item">Store agents (support, orders, inventory)</li>
              <li className="pillar-item">Business agents (sales, HR, finance, legal)</li>
              <li className="pillar-item">Personal assistants (students, teachers, professionals)</li>
              <li className="pillar-item">Real-time, always-on, integrated with your tools</li>
            </ul>
          </div>

          <div className="pillar rv d3">
            <div className="pillar-n">03</div>
            <div className="pillar-title">Workflows & Automation</div>
            <p className="pillar-body">
              We map your operations and automate the steps that don&apos;t need a
              human. Less manual work, fewer errors, and a team that can focus on
              the things that move things forward.
            </p>
            <ul className="pillar-list" aria-label="Automation capabilities">
              <li className="pillar-item">End-to-end workflow design & build</li>
              <li className="pillar-item">Tool integrations across your entire stack</li>
              <li className="pillar-item">Automated reporting & notifications</li>
              <li className="pillar-item">Ongoing optimisation after launch</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
