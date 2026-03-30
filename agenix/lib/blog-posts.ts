export interface BlogPost {
  slug: string;
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: string; // markdown-style paragraphs separated by \n\n
}

export const posts: BlogPost[] = [
  {
    slug: "lead-qualification-agents",
    cat: "AI Agents",
    title: "How a Lead Qualification Agent Tripled a SaaS Company's Pipeline",
    excerpt:
      "What happens when you replace a 48-hour response time with a 42-second one — and how we built the agent that did it.",
    date: "12 Feb 2025",
    readTime: "6 min read",
    body: `When Meridian SaaS came to us, they had a conversion problem. Not a traffic problem — they were getting 300–400 inbound leads a month from paid search and content. The problem was response time. Their SDR team was small, working UK hours, and the average first response to a new lead was 47 hours.

Research from Harvard Business Review puts the optimal response window at under five minutes. After an hour, odds of qualifying a lead drop by 60 times. At 47 hours, Meridian was essentially handing warm leads to their competitors.

**What we built**

The agent runs on a webhook triggered by any new form submission — Typeform, HubSpot forms, or direct API. Within seconds of a lead coming in, it does three things in parallel:

First, it enriches the lead. Using the email domain, it pulls company data — headcount, industry, tech stack, funding stage, LinkedIn presence. This gives the agent the context it needs to have an intelligent conversation rather than a generic one.

Second, it scores the lead against Meridian's ICP. Their ideal customer was a Series A–C SaaS company with 20–200 employees and at least one revenue operations role. The agent cross-references enrichment data against these criteria and assigns a priority score.

Third, it sends the opening message. Not a canned "thanks for your interest" email — a personalised outreach that references what we know about the company and asks a single qualifying question relevant to their context.

**The numbers**

Response time went from 47 hours to 42 seconds. Not 42 minutes — 42 seconds. The agent doesn't sleep, doesn't take lunches, and doesn't have a backlog.

Pipeline grew by 340% in the first quarter. This wasn't because more leads came in — it was because fewer leads went cold before a human ever touched them. The SDR team went from spending time chasing unqualified leads to spending time on conversations the agent had already warmed up.

Cost per qualified opportunity dropped by 58%. The agent costs a fixed amount per month regardless of lead volume. As volume scaled, the cost per lead kept falling.

**What the agent doesn't do**

It doesn't close deals. It doesn't handle objections beyond a certain complexity. When a conversation reaches a natural handoff point — a prospect asking for pricing, a demo request, or a question outside the agent's scope — it routes cleanly to the right SDR with a full conversation summary.

The handoff is the part most teams get wrong. They either hand off too early (wasting SDR time) or too late (losing the prospect's momentum). We spent two weeks tuning the handoff logic specifically for Meridian's process.

**Key takeaways**

Speed is the most underrated part of lead conversion. An agent that responds in seconds isn't a gimmick — it's a structural advantage. The question isn't whether you should automate first response. It's whether you can afford not to.`,
  },
  {
    slug: "shopify-vs-custom",
    cat: "E-Commerce",
    title: "Shopify vs Custom Storefront: When to Upgrade and When Not To",
    excerpt:
      "Most businesses don't need a custom storefront. Here's the framework we use to decide — and the signals that tell us when they do.",
    date: "29 Jan 2025",
    readTime: "8 min read",
    body: `We get asked this question constantly. A business is doing well on Shopify, starting to feel the limits of the platform, and wants to know whether it's time to go custom. The honest answer — which we tell every client upfront — is that most of the time, the answer is no.

Shopify is exceptional. It handles payments, hosting, CDN, security, and a catalogue of apps that covers 95% of what e-commerce businesses need. The platform is built by people who think about e-commerce at a scale most businesses will never reach. Choosing to leave it is a real trade-off, not a natural upgrade path.

**When Shopify is the right answer**

If your catalogue is under 50,000 SKUs, your checkout flow is relatively standard, and your traffic peaks don't regularly exceed 10,000 concurrent users — Shopify handles this without breaking a sweat.

The same applies if your primary differentiation is product and brand rather than shopping experience. For most DTC brands, the biggest ROI comes from better creative, better retention, and better margins — not a custom storefront.

Shopify Plus, in particular, closes a lot of the gaps that used to push businesses toward custom builds. Script Editor, custom checkout branding, B2B features, and multi-store management cover a lot of ground.

**The signals that point to custom**

There are four situations where we recommend considering a custom storefront:

*Complex buying journeys.* If your customers need to configure products, compare specifications across dozens of variables, or go through a multi-step quoting process before checkout, Shopify's standard product pages start to feel like a constraint. We've built custom storefronts for industrial suppliers and professional equipment brands where the buying journey simply can't be compressed into Shopify's model.

*Performance at scale.* Shopify's CDN is fast, but for businesses with extremely high traffic and strong technical SEO requirements, a custom build on Next.js with fine-grained control over rendering strategy can deliver meaningful gains. Core Web Vitals matter for paid and organic alike.

*Deep ERP or B2B integration.* If your business requires real-time inventory sync with SAP or Oracle, complex B2B pricing tiers by account, or PunchOut catalogue integration — custom is often cleaner than trying to bend Shopify's API to fit.

*Unique UX requirements.* Some brands need experiences that don't exist in Shopify's component model — immersive product visualisations, AR try-ons, highly dynamic personalisation at the session level. These are legitimate reasons to go custom.

**The cost of going custom**

A custom storefront is not a one-time project — it's an ongoing infrastructure commitment. You're taking on hosting, security, platform maintenance, and feature development that Shopify handles for you. The initial build cost is higher, the ongoing cost is higher, and the complexity is higher.

For the right businesses, this is absolutely worth it. For most businesses, it isn't.

Our recommendation: exhaust Shopify's capabilities first. If you're genuinely hitting walls that affect your business metrics, that's when we have the conversation about what a custom build would actually solve.`,
  },
  {
    slug: "invoice-automation",
    cat: "Automation",
    title: "From 5 Days to 4 Hours: Inside a Month-End Close Automation",
    excerpt:
      "A walkthrough of how we automated 2,000 invoices a month — including the architecture, the edge cases, and what 99.97% accuracy actually means.",
    date: "14 Jan 2025",
    readTime: "10 min read",
    body: `Stratum Finance's month-end close was a five-day ordeal. Their finance team of three was processing around 2,000 supplier invoices a month — a mix of PDFs, scanned documents, and email attachments — reconciling them against purchase orders, flagging discrepancies, and posting approved invoices to their ERP.

It wasn't that the team was slow. It's that the work was genuinely time-consuming when done manually. Every invoice had to be opened, read, matched to a PO, checked for discrepancies in amount, line items, and VAT treatment, and then either approved or flagged for review.

**The architecture**

The automation runs in four stages.

*Ingestion.* Invoices arrive through three channels — email attachments, a supplier portal upload form, and a shared drive that legacy suppliers still use. A watcher service monitors all three and routes new documents into a normalised queue.

*Extraction.* Each document goes through a document AI pipeline that extracts structured data — supplier name, invoice number, date, line items, VAT amounts, totals, and bank details. This is the step where most automation projects fail. Real-world invoices are messy: some are structured PDFs, some are scanned at odd angles, some have handwritten amendments. The extraction model was trained on three months of Stratum's historical invoices before deployment.

*Matching and validation.* Extracted data is cross-referenced against open POs in Stratum's ERP. The system checks five things: supplier identity, invoice number (duplicate detection), line item match, total amount within tolerance, and VAT calculation. Invoices that pass all five are auto-approved. Invoices that fail any check are flagged with the specific reason and routed to a human reviewer.

*Posting.* Approved invoices are posted directly to the ERP via API, with full audit trail. The finance team gets a daily summary email rather than processing each invoice individually.

**What 99.97% accuracy means**

In a month of 2,000 invoices, 99.97% accuracy means roughly 0.6 errors — less than one per month. In practice, over the first three months of operation, the system had two errors, both in month one. Both were caught by the ERP's own validation before posting.

The more meaningful number is the false positive rate on the flagging system. Early in deployment, the system was flagging around 8% of invoices for human review — mostly due to slight formatting variations in supplier names and edge cases in VAT treatment. After tuning, the flag rate dropped to 1.4%, which means 97 minutes of manual review per month rather than five days.

**The edge cases**

Edge cases are where automation projects either earn their value or fall apart. The three hardest ones we encountered:

Credit notes. Supplier credit notes look similar to invoices but need to be handled differently. Early versions of the model confused these more than acceptable. We added a specific classification step before extraction.

Multi-currency invoices. Stratum works with European suppliers, so EUR and USD invoices need currency conversion and tolerance checks against the exchange rate on the invoice date. This added a FX lookup step that runs before matching.

Partial deliveries. Sometimes a PO is partially fulfilled and the invoice only covers the delivered portion. The matching logic needed to handle open POs with partial amounts rather than requiring exact matches.

**The outcome**

Month-end close went from five days to four hours. The finance team now uses the time previously spent on invoice processing for actual financial analysis. Two team members who were primarily doing manual processing work were redeployed to higher-value tasks.`,
  },
  {
    slug: "ai-agents-vs-chatbots",
    cat: "AI Agents",
    title: "AI Agents vs Chatbots: What's the Actual Difference?",
    excerpt:
      "The word 'chatbot' has become a catch-all that covers everything from a FAQ widget to a fully autonomous business agent. Here's how to tell them apart.",
    date: "8 Jan 2025",
    readTime: "5 min read",
    body: `The terminology problem in AI is real. "Chatbot" gets applied to everything from a decision-tree FAQ widget on a checkout page to a system that autonomously qualifies leads, books meetings, updates a CRM, and drafts personalised follow-up emails. These are not the same thing. Understanding the difference matters when you're deciding what to build.

**What a chatbot is**

A traditional chatbot is a rules-based or retrieval-based system. It responds to inputs based on a defined set of patterns, intents, or pre-written answers. The more sophisticated versions use intent classification — they can recognise that "I want to return something" and "can I send this back?" mean the same thing — but they're still working from a fixed knowledge base and a fixed set of possible responses.

Chatbots are good at a narrow range of tasks: answering FAQs, guiding users through structured flows, capturing contact details. They're predictable, relatively cheap to build, and easy to audit. They're also brittle — they fail when a user's input doesn't match an expected pattern, and they have no ability to take action in the world.

**What an agent is**

An AI agent — in the way we use the term — is a system that can perceive context, reason about it, and take actions. The key word is actions. An agent doesn't just answer questions. It can call APIs, update databases, send emails, query external systems, and make decisions based on the results.

An agent handling a customer support query might: look up the customer's order history, check the current status with a courier API, determine whether a refund is within policy, issue the refund via the payment platform, update the CRM, and send a confirmation — all within a single conversation, without human involvement.

That's a fundamentally different class of capability. It's not answering questions. It's doing work.

**The spectrum in practice**

There's a spectrum between these two poles. A lot of "AI customer support" products sit somewhere in the middle — they use large language models for natural conversation but are constrained to a narrow action set. That's fine for many use cases. Not every customer interaction needs a fully autonomous agent.

The question to ask when evaluating what you need is: how much of this work currently requires a human to take action in external systems? If the answer is "all of it" — the conversation is just information, and a human does everything else — you need an agent. If the answer is "none of it" — the user just needs information — a well-configured chatbot might be sufficient.

**Why this matters for buying decisions**

The market is full of "AI agent" products that are, in practice, sophisticated chatbots with a nice UI. Before committing to any solution, ask two questions: what systems can it write to, not just read from? And what happens when it encounters a case it hasn't seen before?

The answers tell you whether you're looking at a retrieval system dressed up in agent language, or something that can actually take work off your team's plate.`,
  },
  {
    slug: "woocommerce-large-catalogue",
    cat: "E-Commerce",
    title: "Managing 20,000 SKUs on WooCommerce Without Losing Your Mind",
    excerpt:
      "The plugins, the architecture decisions, and the import pipeline we use to keep large-catalogue WooCommerce stores running fast and accurate.",
    date: "18 Dec 2024",
    readTime: "7 min read",
    body: `WooCommerce scales further than most people expect — but it requires a different approach than a 200-SKU store. We've built and maintained catalogues in the 15,000–50,000 SKU range on WooCommerce, and the problems are consistent enough to write a playbook.

**The performance problem**

WooCommerce's default setup stores product data across multiple WordPress tables with a post-meta architecture that becomes genuinely slow at scale. A product query that's imperceptible on a 500-product store can take seconds on a 20,000-product one.

The first thing we do on any large-catalogue build is audit query performance. The usual culprits: unindexed meta queries used for filtering, no object caching layer, and product category queries that JOIN across multiple tables without limits.

Solutions in order of impact: Redis object caching (via WP Redis or similar) eliminates the majority of redundant database reads. Elasticsearch-based search (Jetpack Search or a self-hosted instance) replaces WooCommerce's default search, which doesn't scale. For filtering, we use custom taxonomy tables rather than meta queries wherever possible.

**The import pipeline**

At 20,000 SKUs, product data doesn't come from a person typing into WordPress admin. It comes from a supplier feed, a PIM, or an ERP. Building a reliable import pipeline is where most large-catalogue projects either succeed or become a maintenance burden.

We standardise on a three-stage pipeline: extract (pull data from source in its native format), transform (normalise to a consistent schema, handle duplicates, validate required fields, map supplier categories to site categories), and load (upsert to WooCommerce via WP CLI or the REST API, with error logging and retry logic).

The critical detail in the load stage: use WP CLI for bulk operations, not the admin UI. wp wc product create in batch mode is orders of magnitude faster than any UI-based approach and doesn't time out.

**Variation management**

Products with many variations (colour × size × material, for example) create exponential SKU counts quickly. A product with 5 colours, 8 sizes, and 3 materials is 120 variations. At scale, this creates performance and UX problems.

Our approach: limit stored variations to combinations that actually exist in inventory. Don't auto-generate all permutations. Build a configuration UI that shows only valid combinations based on real stock data. This reduces the variation table size by 60–80% in most catalogues.

**Inventory sync**

At this scale, inventory is usually managed in an ERP or warehouse system, not WooCommerce. Real-time sync via webhook is the right architecture — stock changes in the ERP trigger an API call that updates WooCommerce within seconds. Batch sync (hourly or daily) is a fallback, not a primary strategy. Overselling due to stale stock data is a real cost.

**The honest caveat**

WooCommerce at this scale requires ongoing maintenance. Database optimisation, plugin compatibility management, and import pipeline monitoring are regular tasks. If you don't have a development team or agency handling this, the operational overhead will outweigh the platform flexibility benefits. At that point, Shopify Plus with a PIM integration is often a better answer.`,
  },
  {
    slug: "automation-roi",
    cat: "Automation",
    title: "How to Calculate the ROI of Business Automation (With Real Numbers)",
    excerpt:
      "A practical framework for working out whether a workflow automation is worth building — and how to present the business case internally.",
    date: "5 Dec 2024",
    readTime: "9 min read",
    body: `Every automation project starts with the same question: is this worth building? The answer requires actual numbers, not assumptions. Here's the framework we use — with the real figures from recent client projects.

**Step 1: Time cost of the current process**

Start by measuring the current state accurately. The three inputs you need:

Hours per week spent on the process (broken down by who does it). Minutes per transaction × transactions per week usually gets you here. Be honest about total time including rework, exceptions handling, and checking for errors.

Fully-loaded hourly cost of the people doing the work. Salary is not fully-loaded cost. Include employer NI contributions, benefits, office space allocation, and management overhead. For UK businesses, a £35,000 salary typically has a fully-loaded cost of £48,000–£52,000.

Error rate and cost of errors. What percentage of transactions have errors? What does fixing an error cost in time and, where applicable, in financial terms (refunds, penalties, reputational damage)?

Example from a real project: A finance team was spending 22 hours per week on invoice reconciliation. Fully-loaded hourly cost: £26. Weekly cost: £572. Annual cost: £29,744. Error rate was 3.2%, with average correction time of 45 minutes. Annual error correction cost: £4,160. Total annual cost of current process: £33,904.

**Step 2: Build cost**

This is what we charge for the automation, including discovery, build, testing, and any third-party API or infrastructure costs. Get a fixed-price quote, not a time-and-materials estimate. T&M automation projects reliably overrun.

For the invoice reconciliation project: £18,000 build cost, £3,600/year ongoing maintenance and hosting.

**Step 3: Post-automation cost**

After automation, some human time remains — reviewing exceptions, handling edge cases, monitoring the system. Be conservative about how much time you'll save. We typically model 80% time reduction as a realistic outcome, not 100%.

Post-automation finance team time on this process: 2.5 hours per week (exception handling and oversight). Annual cost: £3,380. Error rate post-automation: 0.03% (caught by ERP validation before posting). Annual error cost: effectively £0.

**Step 4: Payback period**

Annual saving = (Pre-automation cost) − (Post-automation cost + Ongoing maintenance)
Annual saving = £33,904 − (£3,380 + £3,600) = £26,924

Payback period = Build cost ÷ Annual saving = £18,000 ÷ £26,924 = 8 months

Year 1 net benefit: £26,924 − £18,000 = £8,924
Year 2 net benefit: £26,924
Year 3 net benefit: £26,924
3-year total net benefit: £62,772

**The cases where automation doesn't make sense**

Automation is worth building when: the process is high-volume and repetitive, the rules are consistent enough to encode, and the time cost of the current process exceeds the build cost within 18 months.

It's usually not worth building when: volume is low (fewer than 50 transactions per week), the process changes frequently, or the exceptions are so complex that human judgment is genuinely required most of the time.

The 18-month payback threshold is our working rule of thumb. If the numbers don't support a payback within 18 months, the business case is weak. Below 12 months is compelling. Below 6 months is a priority.

**Presenting the business case internally**

Two things that help: show the three-year number, not just year one. Automation has a step-cost structure — the build cost is upfront, but the savings compound. And show the non-financial benefits separately: reduced errors, faster cycle times, staff redeployment to higher-value work. These matter to leadership even when they're hard to quantify precisely.`,
  },
];

export const catColors: Record<string, string> = {
  "AI Agents":  "rgba(99,102,241,.15)",
  "E-Commerce": "rgba(16,185,129,.12)",
  "Automation": "rgba(245,158,11,.12)",
};

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
