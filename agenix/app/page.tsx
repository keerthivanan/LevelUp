import Hero         from "@/components/Hero";
import WhatWeDo     from "@/components/WhatWeDo";
import Stores       from "@/components/Stores";
import Agents       from "@/components/Agents";
import Sectors      from "@/components/Sectors";
import HowWeWork    from "@/components/HowWeWork";
import Results      from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import CTA          from "@/components/CTA";
import Contact      from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <Stores />
      <Agents />
      <Sectors />
      <HowWeWork />
      <Results />
      <Testimonials />
      <CTA />
      <Contact />
    </main>
  );
}
