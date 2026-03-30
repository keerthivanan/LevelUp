import Link  from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="w">
        <div className="ft-grid">
          <div>
            <div className="ft-logo-r">
              <Image
                src="/dizilo.png"
                alt="Dizilo"
                width={100}
                height={36}
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>
            <p className="ft-tag">
              Stores, agents, and automation — for every business, every sector,
              from idea to production.
            </p>
          </div>

          <div className="ft-col" role="navigation" aria-label="Services">
            <h5>Services</h5>
            <ul>
              <li><Link href="/services/stores">E-Commerce Stores</Link></li>
              <li><Link href="/services/agents">AI Agents</Link></li>
              <li><Link href="/services/automation">Workflow Automation</Link></li>
              <li><Link href="/services/agents#personal">Personal Assistants</Link></li>
            </ul>
          </div>

          <div className="ft-col" role="navigation" aria-label="Company">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="ft-col" role="navigation" aria-label="Legal">
            <h5>Legal</h5>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/contact">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="ft-btm">
          <span className="ft-copy">© {year} Dizilo Ltd. All rights reserved.</span>
          <span className="ft-copy">London, UK</span>
        </div>
      </div>
    </footer>
  );
}
