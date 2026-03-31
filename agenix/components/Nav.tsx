"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "What We Do",  href: "/",           hash: "what"    },
  { label: "Stores",      href: "/services/stores"               },
  { label: "Agents",      href: "/services/agents"               },
  { label: "Sectors",     href: "/",           hash: "sectors" },
  { label: "How We Work", href: "/",           hash: "how"     },
  { label: "Contact",     href: "/contact"                       },
];

function NavLink({
  label, href, hash, onClick,
}: { label: string; href: string; hash?: string; onClick?: () => void }) {
  const pathname = usePathname();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.();
      if (hash && pathname === "/") {
        e.preventDefault();
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (hash && pathname !== "/") {
        // Let Next.js navigate to /#hash — browser handles scroll
      }
    },
    [hash, pathname, onClick]
  );

  const finalHref = hash ? `${href}#${hash}` : href;

  return (
    <Link href={finalHref} className="n-a" onClick={handleClick}>
      {label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggle = useCallback(() => {
    setOpen((o) => {
      document.body.style.overflow = !o ? "hidden" : "";
      return !o;
    });
  }, []);

  return (
    <>
      <nav id="main-nav" style={{ backgroundColor: "#1c1a1c" }}>
        <Link href="/" className="n-logo" aria-label="Dizilo — Home">
          <Image
            src="/dizilo.png"
            alt="Dizilo"
            width={90}
            height={32}
            style={{ objectFit: "contain", objectPosition: "left center" }}
            priority
          />
        </Link>

        <div className="n-links" role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.label} {...l} />
          ))}
        </div>

        <div className="n-right">
          <Link href="/case-studies" className="nb nb-o">See Results</Link>
          <Link href="/book"         className="nb nb-w">Book a Call</Link>
        </div>

        <button
          className="ham"
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobMenu"
        >
          <span className="hl" style={open ? { transform: "rotate(45deg) translate(4px,4px)" } : undefined} />
          <span className="hl" style={open ? { opacity: "0" }                                 : undefined} />
          <span className="hl" style={open ? { transform: "rotate(-45deg) translate(4px,-4px)" } : undefined} />
        </button>
      </nav>

      <div
        id="mobMenu"
        className={`mob${open ? " open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {NAV_LINKS.map((l) => (
          <NavLink key={l.label} {...l} onClick={close} />
        ))}
        <Link href="/case-studies" className="n-a" onClick={close} style={{ padding: "13px 0", borderBottom: "1px solid var(--bd)", display: "block", fontSize: ".9rem", fontWeight: 500 }}>
          See Results
        </Link>
        <div className="mob-cta">
          <Link href="/book" className="nb nb-w" onClick={close}>Book a Call</Link>
        </div>
      </div>
    </>
  );
}
