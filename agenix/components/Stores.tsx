export default function Stores() {
  return (
    <section id="stores">
      <div className="w">
        <span className="s-label rv">E-Commerce Stores</span>
        <h2 className="s-h rv d1">We build stores that work</h2>
        <p className="s-sub rv d2">
          Shopify, WooCommerce, or fully custom — built to sell, designed to scale,
          and ready for catalogues of any size.
        </p>

        <div className="store-grid">
          <div className="store-card rv d1">
            <div className="store-card-top">
              <div className="store-platform">Shopify</div>
              <div className="store-tag">Most Popular</div>
            </div>
            <div className="store-title">Shopify Store Development</div>
            <p className="store-body">
              Custom Shopify stores built for speed, conversions, and large
              catalogues. Theme development, app integrations, payment setup, and
              everything in between.
            </p>
            <ul className="store-feats" aria-label="Shopify features">
              <li className="store-feat">Custom theme design & development</li>
              <li className="store-feat">Product import & bulk management (10,000–20,000+)</li>
              <li className="store-feat">Payment gateway & shipping configuration</li>
              <li className="store-feat">SEO, analytics & performance optimisation</li>
            </ul>
          </div>

          <div className="store-card rv d2">
            <div className="store-card-top">
              <div className="store-platform">WooCommerce</div>
              <div className="store-tag">Full Control</div>
            </div>
            <div className="store-title">WooCommerce Development</div>
            <p className="store-body">
              Built on WordPress, fully customisable, and owned by you completely.
              Ideal for businesses that need flexibility without the monthly platform
              fees.
            </p>
            <ul className="store-feats" aria-label="WooCommerce features">
              <li className="store-feat">Custom plugin development & integration</li>
              <li className="store-feat">Multi-currency, multi-language support</li>
              <li className="store-feat">Subscription & membership features</li>
              <li className="store-feat">Hosting setup & production deployment</li>
            </ul>
          </div>

          <div className="store-card wide rv d1">
            <div className="store-card-top">
              <div className="store-platform">Custom Storefront</div>
              <div className="store-tag">Enterprise</div>
            </div>
            <div className="store-title">Fully Custom E-Commerce Platforms</div>
            <p className="store-body">
              For businesses that have outgrown off-the-shelf platforms — or need
              something specific that doesn&apos;t exist yet. Built from the ground up,
              frontend to production, with AI agents baked in from day one.
            </p>
            <ul className="store-feats row" aria-label="Custom storefront features">
              <li className="store-feat">Bespoke frontend & backend architecture</li>
              <li className="store-feat">AI-powered product search & recommendations</li>
              <li className="store-feat">Real-time inventory & order management</li>
              <li className="store-feat">Built-in customer support agent</li>
              <li className="store-feat">Scalable infrastructure, production-ready</li>
              <li className="store-feat">Any catalogue size — no limits</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
