export default function Results() {
  return (
    <section id="results">
      <div className="w">
        <span className="s-label rv">Results</span>
        <h2 className="s-h rv d1">What clients achieved</h2>
        <p className="s-sub rv d2">Real numbers from live projects.</p>

        <div className="res-grid">
          {/* Featured case study */}
          <div className="rc big rv">
            <div>
              <div className="rc-cat">B2B SaaS · Sales Agent</div>
              <div className="rc-title">
                Meridian SaaS tripled their pipeline in 90 days — without a single
                new hire
              </div>
              <p className="rc-body">
                Their team was manually sorting through 400+ leads a month with a
                48-hour response time. We built a qualification agent that responds,
                enriches, scores, and routes every lead automatically. The sales team
                now only speaks to people who are ready to buy.
              </p>
              <div className="rc-hr" />
              <div className="rc-co">Meridian SaaS — B2B software company</div>
            </div>
            <div>
              <dl className="rc-nums">
                <div>
                  <dt className="rn-l" style={{ order: 1 }}>Pipeline growth in 90 days</dt>
                  <dd className="rn-v">340%</dd>
                </div>
                <div>
                  <dt className="rn-l" style={{ order: 1 }}>Response time (was 48 hrs)</dt>
                  <dd className="rn-v">42 sec</dd>
                </div>
                <div>
                  <dt className="rn-l" style={{ order: 1 }}>Lead-to-meeting rate (was 12%)</dt>
                  <dd className="rn-v">31%</dd>
                </div>
                <div>
                  <dt className="rn-l" style={{ order: 1 }}>SDR operating cost</dt>
                  <dd className="rn-v">−65%</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rc rv d1">
            <div className="rc-cat">E-Commerce · Store + Agent</div>
            <div className="rc-title">
              Nexus Retail cut support costs 70% after adding a store agent
            </div>
            <p className="rc-body">
              A support agent built into their WooCommerce store handles order
              queries, returns, and complaints across chat and WhatsApp. Customer
              satisfaction went up, costs went down.
            </p>
            <dl className="rc-mini">
              <div>
                <dd className="rn-v sm">−70%</dd>
                <dt className="rn-l">Support cost</dt>
              </div>
              <div>
                <dd className="rn-v sm">4.9/5</dd>
                <dt className="rn-l">CSAT (was 3.8)</dt>
              </div>
            </dl>
            <div className="rc-hr" />
            <div className="rc-co">Nexus Retail · D2C e-commerce</div>
          </div>

          <div className="rc rv d2">
            <div className="rc-cat">Finance · Automation</div>
            <div className="rc-title">
              Stratum Finance closed the month in 4 hours instead of 5 days
            </div>
            <p className="rc-body">
              An invoice processing agent handles 2,000 documents a month at 99.97%
              accuracy. Three people who spent their week on data entry now work on
              things that actually matter.
            </p>
            <dl className="rc-mini">
              <div>
                <dd className="rn-v sm">99.97%</dd>
                <dt className="rn-l">Accuracy</dt>
              </div>
              <div>
                <dd className="rn-v sm">5d → 4h</dd>
                <dt className="rn-l">Month-end close</dt>
              </div>
            </dl>
            <div className="rc-hr" />
            <div className="rc-co">Stratum Finance · Financial services</div>
          </div>
        </div>
      </div>
    </section>
  );
}
