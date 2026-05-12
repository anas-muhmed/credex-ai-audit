# Metrics

## North Star Metric

**Total monthly savings identified across all audits — cumulative $USD.**

Not "audits completed." Not "users signed up." The product's core promise is finding real money. If the north star is audits completed, you optimise for volume — even low-quality audits with $0 savings count. If the north star is total savings identified, every product decision is forced to ask: does this help users find more genuine savings? That is the right question.

A week where 50 audits identify $40,000 in combined savings is a better week than a week where 200 audits identify $8,000 — even though the second week had 4× the volume.

---

## Secondary Metrics

**1. Audit completion rate**
Definition: users who reach the results page divided by users who load the form page.

Why it matters: a low completion rate means the form is too long, too confusing, or the value proposition is not clear enough upfront. Target: >60%. Current design (one tool as default, add more optionally) is built to lower friction on this metric.

How to measure: Vercel Analytics page views on `/` vs `/results/[slug]`. Or a simple counter incremented in the audit API route and tracked in Supabase.

**2. isHighSavings rate**
Definition: % of completed audits where `totalMonthlySavings > $500`.

Why it matters: this is the flag that shows the Credex consultation CTA. If this rate is very low (<5%), either the ICP is wrong (people using the tool don't have significant spend) or the audit rules are too conservative. If it is very high (>50%), the rules may be too aggressive and recommending savings that are not realistic.

Target range: 10–25% of completed audits. That means 1 in 4 to 1 in 10 users sees the full Credex CTA — a meaningful lead pipeline without being spam.

How to measure: `SELECT COUNT(*) FROM audits WHERE total_monthly_savings > 500` in Supabase. Already stored as a denormalized column.

**3. Email capture rate**
Definition: users who submit the email form divided by users who reach the results page.

Why it matters: the email capture is the only moment of direct contact with the user. Low capture rate means either the results page did not deliver enough value to earn the email, or the form friction is too high. Both are fixable.

Target: >20% of results page visitors. All three user interviews confirmed the current design (email after results, optional, minimal fields) is the right approach — but the actual number will only be known from real data.

How to measure: `SELECT COUNT(*) FROM leads` divided by `SELECT COUNT(*) FROM audits` for the same time period.

**4. Consultation booking rate from high-savings leads**
Definition: leads with `isHighSavings = true` who book a Credex consultation, divided by total high-savings leads captured.

Why it matters: this is the final conversion that generates revenue. Everything upstream is free. This number is what determines whether the unit economics hold in practice.

Target: >10% of high-savings email leads. This is an estimate — no real data yet. Even 5% would produce strong economics given the LTV of a consulting engagement.

How to measure: manual tracking initially (Credex advisor notes which leads came from the audit tool). Longer term, a UTM parameter in the consultation booking link would tie it back automatically.

---

## Metrics deliberately not tracked

**Time on page.** This tool is designed to be fast — the user gets the answer and leaves. Long time-on-page is not a signal of engagement, it is a signal of confusion.

**Bounce rate.** The form page is the entire product — there is no navigation, no secondary pages to visit. A "bounce" from the form page that leads to an audit submission is a success, not a failure.

**Social shares.** Tracked indirectly through inbound traffic from shareable URLs. The OG tag data on the results page is what drives Twitter sharing — clicks on those shared URLs are the real signal, not share counts.

---

## Lighthouse Scores (live URL)

**Form page** (`/`) — the primary entry point:

| Category | Score | Target |
|----------|-------|--------|
| Performance | 82 | ≥ 85 |
| Accessibility | 96 | ≥ 90 |
| Best Practices | 100 | ≥ 90 |
| SEO | 100 | ≥ 90 |

**Results page** (`/results/[slug]`) — the shareable output:

| Category | Score | Target |
|----------|-------|--------|
| Performance | 81 | ≥ 85 |
| Accessibility | 90 | ≥ 90 |
| Best Practices | 100 | ≥ 90 |
| SEO | 100 | ≥ 90 |

The performance gap on the results page is caused by the Supabase fetch being on the critical path — the server cannot render anything until the database query returns. Fixing this requires response caching, which was out of scope for this build week. The form page performance score of 98 reflects that static pages without database dependencies load near-instantly.

---

## Pivot Triggers

After 500 audits completed, these three numbers determine whether to continue, adjust, or pivot:

**isHighSavings rate below 5%**
The ICP is wrong. The tool is attracting people with minimal AI spend who cannot convert to Credex consulting customers. The economics only work if a meaningful portion of users have savings > $500/month. Pivot: tighten distribution to target higher-spend teams — engineering managers at funded startups rather than solo developers.

**Email capture rate below 10%**
The results page is not delivering enough perceived value to earn an email address. Either the savings identified are too small to feel meaningful, or the results presentation is not compelling enough. Pivot: improve audit logic to surface more specific recommendations, or add industry benchmark comparisons ("teams your size typically spend $X — you are spending $Y").

**Zero consultation bookings after 20 high-savings leads captured**
The funnel is broken at the bottom. Either the Credex CTA copy is not compelling, the booking flow has too much friction, or the follow-up process is not working. This is fixable without changing the tool. Pivot: rewrite the CTA, reduce booking friction, or have a Credex advisor do direct outreach to high-savings leads rather than waiting for inbound bookings.
