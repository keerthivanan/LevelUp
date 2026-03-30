"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay lets the new page DOM render before we observe
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -28px 0px" }
      );
      document.querySelectorAll(".rv:not(.in)").forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]); // re-run on every page navigation
}
