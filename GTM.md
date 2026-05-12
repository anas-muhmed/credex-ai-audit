# Go-To-Market

## Ideal Customer Profile

**Primary:** Founder or engineering manager at a 2–10 person software startup.

- Paying for 3+ AI tools simultaneously
- $200–$1,500/month in AI tool spend
- No dedicated IT or procurement function — subscriptions are managed informally, often on personal cards
- Discovered tools through Twitter/X recommendations or word of mouth, not through evaluation

This profile came directly from user research. Sinan (Interview 1) fit it exactly: Cursor Business for the team, ChatGPT Plus personally, Claude Pro from a Twitter recommendation he barely used. He described the decision process as "auto-debit and vibes." Dharaneesh (Interview 2) had a forgotten auto-renewal on a tool he had used exactly once.

**Where they are online:**
- r/startups, r/SaaS, r/entrepreneur, r/SideProject
- Indie Hackers community and forums
- Twitter/X: following accounts like @levelsio, @paulg, @naval, @benediktdeicke
- Slack communities: Online Geniuses, Demand Curve, Lenny's community
- Hacker News — daily readers, not just occasional visitors

**Secondary:** Freelance developer with inconsistent workload (Amshen, Interview 3). Subscribes during deadline pressure, forgets to cancel. Different problem from the primary ICP — the tool partially addresses this segment but was not designed for it.

---

## Why this audience, why now

AI tool spend for software teams roughly doubled between 2024 and 2025 as the number of credible coding assistants went from 2 to 8+. Founders who adopted Cursor in 2023 now also have GitHub Copilot on the company plan, Claude Pro personally, and ChatGPT for writing. No single tool won — the category fragmented. That fragmentation created the overspend problem this tool solves.

---

## Distribution Channels

**Channel 1 — Hacker News (Show HN)**
The ICP reads HN daily. A Show HN post for a free tool that finds real money in a problem developers recognise ("I built a tool to audit your AI tool spend") performs on authenticity. One well-received post drives 2,000–8,000 qualified visits. The shareable URL feature means a single user can generate 5–10 additional visits from their own network. Timing: Tuesday–Thursday, 9–11am ET.

**Channel 2 — Twitter/X**
This is where the problem originates — founders subscribe to tools because of Twitter threads. The same channel is where they share the audit results. The OG tag on the results page (`I found $X/month in AI tool savings`) is designed specifically for Twitter sharing. No paid spend needed — one founder sharing their results is worth more than any ad.

**Channel 3 — Credex existing customers**
The lowest CAC channel. Credex already has relationships with the exact ICP. Sending the audit tool to existing clients costs nothing, produces warm leads immediately, and generates social proof from recognisable company names. This is the channel to activate first before any public distribution.

**The unfair advantage:** Credex already owns the relationship with the exact ICP. No other tool launching this product can email a warm list of startups already spending on AI credits and say "here is a free tool to find more savings." That list is Credex's moat — and it costs nothing to activate.

**Channel 4 — Reddit (r/startups, r/entrepreneur, r/SideProject)**
Combined 6M+ members. Posts framed around real findings ("We were paying for Cursor Business and GitHub Copilot at the same time — here's what the audit found") outperform product announcements. The tool's conversational results page screenshots make for compelling posts without requiring long writeups.

**Channel 5 — Indie Hackers**
Smaller but highly targeted. Indie Hackers members are solo founders and small teams paying for their own tools — exact ICP. A product launch post with real unit economics and user interview insights fits the culture of the community and generates credible organic distribution.

---

## First 100 Users — Week-by-Week Plan

**Week 1: Warm network**
Send the tool directly to Credex's existing clients and to personal networks. Target: 20–30 audits. Goal is not volume — it is getting real savings numbers from real companies to use as social proof in public launches.

**Week 2: Hacker News Show HN**
Post with a genuine headline — something like: "Show HN: Free tool to audit your AI tool spend and find redundancies." The live Vercel URL, the shareable results, and the no-signup flow are all features that HN rewards. Target: 50+ audits in 48 hours.

**Week 3: Twitter thread**
One founder who found significant savings shares their results with a screenshot of the results page. The OG tag does the heavy lifting. A retweet from a recognisable founder in the AI/dev tools space would be high leverage. Target: 20–40 audits from a single thread.

**Week 4: Reddit + Indie Hackers**
Post authentic findings — real savings identified across early audits, anonymised. Frame it as a build log + product launch, not an ad. Target: 20–30 additional audits.

**If week 1 works — specific numbers:**
- 30+ audits from the warm Credex network
- 2+ high-savings results shared publicly on Twitter by founders
- 1 Hacker News Show HN post with 50+ upvotes
- 3+ consultation bookings from `isHighSavings` leads

---

## Pricing Strategy

The audit tool is permanently free. Credex charges for the consulting engagement downstream. This is intentional — a paywall before showing results kills the top-of-funnel (confirmed by all three user interviews independently). The free tool earns trust; the consultation converts that trust into revenue.

If the tool ever moves to a SaaS model, the natural pricing tier would be:
- Free: single audit, public URL
- Paid ($29–49/month): audit history, team sharing, pricing data auto-refresh

But this is speculative. The current model is lead generation, and that model has strong unit economics at the scale being targeted.

---

## What could kill this

**Vendors change pricing frequently.** The audit engine runs on hardcoded pricing data. If Cursor changes their Business plan price, the recommendations become wrong without a manual update. At scale this needs an automated pricing data pipeline or a crowdsourced correction mechanism.

**Trust is fragile.** One wrong recommendation shared publicly — "the tool told me to cancel GitHub Copilot but that was wrong for our team" — could undermine conversion. The recommendation reasoning needs to be specific and defensible, not generic. The current design addresses this, but it is the biggest ongoing risk.
