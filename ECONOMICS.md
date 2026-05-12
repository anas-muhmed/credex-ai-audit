# Economics

## What this tool is

The audit tool is a lead generation funnel for Credex consulting. The product itself is free — no paywall, no subscription. Revenue comes from Credex consulting engagements sold to startups where the audit identifies savings above $500/month. The `isHighSavings` flag in the audit engine is what drives the CTA on the results page.

---

## Cost to run one audit

The only variable cost per audit is the Anthropic API call. Everything else runs on free tiers at current scale.

**Anthropic API — claude-sonnet-4-20250514**

Pricing: $3.00 per million input tokens, $15.00 per million output tokens.

Prompt size breakdown:
- Role instruction + format constraints: ~80 tokens
- Tool summary lines (~3 tools average, ~10 tokens each): ~30 tokens
- Savings totals + closing cue: ~20 tokens
- **Total input: ~130 tokens**

Output:
- One paragraph, ~100 words, ~1.3 tokens/word
- **Total output: ~130 tokens**

Cost per audit:
```
Input:  130 tokens × ($3.00 / 1,000,000)  = $0.000390
Output: 130 tokens × ($15.00 / 1,000,000) = $0.001950
Total per audit: ~$0.0023
```

**Other infrastructure costs at current scale:**

| Service | Plan | Free tier limit | Cost |
|---------|------|----------------|------|
| Vercel | Hobby | 100GB bandwidth, 100K function calls/month | $0 |
| Supabase | Free | 500MB database, 2GB bandwidth | $0 |
| Resend | Free | 3,000 emails/month | $0 |

At 1,000 audits/month: **$2.30 in API costs. Everything else free.**
At 10,000 audits/month: **$23 in API costs.** Supabase free tier holds ~500K audit rows at ~1KB each before hitting storage limits.

---

## Revenue model

The audit tool does not charge users. Credex makes money from consulting engagements.

Funnel:
```
Audit submitted
    → isHighSavings (savings > $500/mo) → CTA shown
        → user books Credex consultation
            → Credex delivers savings implementation
                → consulting fee paid
```

**Estimated consulting engagement value:** $2,000–$5,000 for a mid-market startup (3–8 person team, $500–$2,000/mo AI spend). This is an estimate — Credex's actual pricing is not public.

**Funnel conversion assumptions** (honest estimates, not measured data):
- % of audits that are high-savings (>$500/mo): ~10–20% of startups with meaningful AI spend
- % of high-savings users who click the CTA: ~15%
- % of CTA clicks that convert to a booked consultation: ~25%

Rough conversion: 1 consultation booking per ~130–270 audits submitted.

---

## Unit economics

**CAC via this channel (API cost only):**
```
200 audits × $0.0023 = $0.46
```
This is the marginal CAC assuming the tool drives traffic. It does not include marketing costs to bring users to the tool — that is a separate acquisition cost upstream.

**LTV per consulting client:**
Assuming a one-time engagement at $3,000 (midpoint estimate):
```
LTV = $3,000
CAC (marginal) = $0.46
LTV:CAC ratio = ~6,500:1
```

This ratio looks high because the marginal cost of one more audit is nearly zero — the dominant cost is getting people to use the tool in the first place, not running the audit.

**Payback period:**
At $3,000 per engagement and $0.46 marginal CAC: immediate — the first consultation booking recoups months of API spend. The real payback question is on marketing investment to drive audit traffic, which this analysis cannot quantify without real conversion data.

---

## What this analysis does not capture

- Marketing costs to drive traffic to the audit tool (unknown)
- Credex consultant time per engagement (not public)
- Churn / repeat engagement rate (no data yet)
- Cost of updating pricing data as vendors change plans (manual maintenance overhead)

The economics are compelling at the unit level because the marginal cost per audit is near zero. The real business question is the top-of-funnel cost — how much does it cost to get a startup founder to run an audit in the first place.

---

## Path to $1M ARR in 18 months

```
Revenue target:            $1,000,000
Avg engagement value:      $3,000
Engagements needed:        334

At 1 booking per 200 audits:
Audits needed (total):     66,800
Over 18 months:            ~3,700 audits/month

At 30% of visitors completing an audit:
Monthly visitors needed:   ~12,400
```

**Is 12,400 visitors/month realistic without paid spend?**

Hacker News Show HN posts for genuinely useful dev tools routinely drive 2,000–8,000 visits in 24 hours. One well-timed post gets you a month's quota. Reddit r/startups and r/entrepreneur combined reach 5M+ members — a single post with real savings numbers in the title ("I audited my AI tool stack and found $800/month in waste") performs on authentic utility, not marketing budget. Indie Hackers and Credex's existing customer base provide a warm distribution layer that compounds over time.

The math works — 3,700 audits/month is not a large number. The binding constraint is not the economics. The binding constraint is consistent distribution: 3–4 targeted posts per month across these channels, each driving 1,000–3,000 qualified visitors.

**The unfair advantage:** Credex already has relationships with the exact ICP — startup founders paying for AI tools. Seeding the tool through existing Credex customers costs nothing and produces audits that immediately qualify for the consultation CTA. If even 20% of current Credex clients run an audit in month 1, the funnel is warm before a single piece of content is published.
