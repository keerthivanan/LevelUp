export default function Agents() {
  return (
    <section id="agents">
      <div className="w">
        <span className="s-label rv">AI Agents</span>
        <h2 className="s-h rv d1">Agents built for real work</h2>
        <p className="s-sub rv d2">
          Not generic chatbots. Purpose-built agents that know your business,
          connect to your tools, and handle the job from start to finish.
        </p>

        <div className="agents-grid">
          <div className="ag rv d1">
            <div className="ag-header">
              <div className="ag-n">01</div>
              <div className="ag-tag">Store</div>
            </div>
            <div className="ag-title">Store Support Agent</div>
            <p className="ag-body">
              Answers customer questions, checks order status, processes returns,
              and handles complaints — across your store chat, email, and WhatsApp.
              24/7, no breaks.
            </p>
            <div className="ag-stat" aria-label="Key metrics">
              <div className="ag-s">
                <div className="ag-sv">78%</div>
                <div className="ag-sl">Queries resolved without human</div>
              </div>
              <div className="ag-s">
                <div className="ag-sv">24/7</div>
                <div className="ag-sl">Always available</div>
              </div>
            </div>
          </div>

          <div className="ag rv d2">
            <div className="ag-header">
              <div className="ag-n">02</div>
              <div className="ag-tag">Store</div>
            </div>
            <div className="ag-title">Sales & Upsell Agent</div>
            <p className="ag-body">
              Recommends the right products, handles abandoned carts, sends
              follow-ups at the right time, and personalises the shopping experience
              for every customer.
            </p>
            <div className="ag-stat" aria-label="Key metrics">
              <div className="ag-s">
                <div className="ag-sv">+34%</div>
                <div className="ag-sl">Average order value</div>
              </div>
              <div className="ag-s">
                <div className="ag-sv">−28%</div>
                <div className="ag-sl">Cart abandonment</div>
              </div>
            </div>
          </div>

          <div className="ag rv d3">
            <div className="ag-header">
              <div className="ag-n">03</div>
              <div className="ag-tag">Business</div>
            </div>
            <div className="ag-title">Lead Qualification Agent</div>
            <p className="ag-body">
              Responds to inbound enquiries in seconds, qualifies against your
              criteria, books meetings or starts follow-up sequences — without your
              team lifting a finger.
            </p>
            <div className="ag-stat" aria-label="Key metrics">
              <div className="ag-s">
                <div className="ag-sv">42 sec</div>
                <div className="ag-sl">Lead response time</div>
              </div>
              <div className="ag-s">
                <div className="ag-sv">340%</div>
                <div className="ag-sl">Pipeline growth</div>
              </div>
            </div>
          </div>

          <div className="ag rv d1">
            <div className="ag-header">
              <div className="ag-n">04</div>
              <div className="ag-tag">Business</div>
            </div>
            <div className="ag-title">Invoice & Finance Agent</div>
            <p className="ag-body">
              Reads invoices, matches purchase orders, flags discrepancies, and
              posts approved entries to your accounting system — automatically, no
              spreadsheets.
            </p>
            <div className="ag-stat" aria-label="Key metrics">
              <div className="ag-s">
                <div className="ag-sv">99.97%</div>
                <div className="ag-sl">Accuracy</div>
              </div>
              <div className="ag-s">
                <div className="ag-sv">8 min</div>
                <div className="ag-sl">Per invoice (was 5 days)</div>
              </div>
            </div>
          </div>

          <div className="ag rv d2">
            <div className="ag-header">
              <div className="ag-n">05</div>
              <div className="ag-tag">Personal</div>
            </div>
            <div className="ag-title">Real-Time Personal Assistant</div>
            <p className="ag-body">
              An AI assistant that knows your context — your work, your schedule,
              your documents. Helps students research, teachers plan lessons, and
              professionals get through the day faster.
            </p>
            <div className="ag-stat" aria-label="Key metrics">
              <div className="ag-s">
                <div className="ag-sv">Any role</div>
                <div className="ag-sl">Student, teacher, professional</div>
              </div>
              <div className="ag-s">
                <div className="ag-sv">Secure</div>
                <div className="ag-sl">Your data stays yours</div>
              </div>
            </div>
          </div>

          <div className="ag dashed rv d3">
            <div className="ag-header">
              <div className="ag-n">06</div>
              <div className="ag-tag">Custom</div>
            </div>
            <div className="ag-title">Any Agent You Need</div>
            <p className="ag-body">
              HR screening, contract review, inventory management, content creation,
              reporting — if there&apos;s a job that repeats, we can build an agent that
              handles it.
            </p>
            <div className="ag-stat" aria-label="Key metrics">
              <div className="ag-s">
                <div className="ag-sv">2 wks</div>
                <div className="ag-sl">Average deployment</div>
              </div>
              <div className="ag-s">
                <div className="ag-sv">Fixed</div>
                <div className="ag-sl">Price</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
