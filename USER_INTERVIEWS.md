# User Interviews

Three conversations with real users during the build week. Each was 20–25 minutes via WhatsApp. No script — open questions about how they currently manage AI tool subscriptions and what they would want from an audit tool.

---

## Interview 1 — Sinan, Founder, Seakk

**Role:** Founder  
**Company stage:** Early-stage, active team  
**Format:** WhatsApp conversation, ~25 minutes  
**Date:** 2026-05-09

**Context:** Sinan's company provides Cursor Business to the team. He personally pays for ChatGPT Plus. He had also subscribed to Claude Pro based on Twitter recommendations.

**Direct quotes:**

> "You think one tool will replace another one. Reality is you keep paying for both."

> "Mostly auto-debit and vibes. Haven't checked properly recently."

> "Every month I kept thinking maybe I'll use it properly next month. Classic SaaS trap."

> "If it says 2-person team does not need enterprise plan, that sounds practical. But 'you are wasting $5000 per year' type nonsense is an immediate red flag."

> "Just show the result fast. If it is actually useful then maybe I will give email after that."

**Most surprising thing:** Sinan took Claude Pro primarily because of Twitter hype, used it minimally, and kept renewing it for months with the intention of using it properly next month. When asked which subscription he would cancel today, he said Claude immediately — but then added that within two weeks he would subscribe to something else, because the problem is FOMO, not the tools themselves. No audit tool fixes that behavior. That was not what I expected going into the conversation.

**What it changed about the design:**

Three direct changes came from this conversation:

1. Removed all urgency language from the results page. Phrases like "you are wasting X per year" were replaced with neutral framing: "potential monthly savings" and "recommended action." Sinan's immediate negative reaction to fake urgency confirmed this was the right call.

2. Pricing source citations planned for each tool recommendation card. He specifically said transparent pricing sources are what build trust.

3. Email capture confirmed to stay after results, never before. Sinan described closing the tab immediately when asked for email upfront, with a specific experience of being spammed after giving his work email to a similar tool. This reinforced the existing design decision with a real user story.

---

## Interview 2 — Dharaneesh, QA Developer, Infygain Technologies

**Role:** QA Developer  
**Company stage:** Established company, Coimbatore  
**Format:** WhatsApp conversation, ~20 minutes  
**Date:** 2026-05-09

**Context:** Dharaneesh's company provides GitHub Copilot on a team account. He previously paid personally for ChatGPT Plus and cancelled a few months ago.

**Direct quotes:**

> "Copilot also gives wrong stuff confidently sometimes. Then waste more time checking it."

> "One tool renewed automatically and I did not even remember I had subscribed. Some AI resume builder. Used it once only."

> "If company removes Copilot tomorrow then only people will notice how much they use it daily."

> "If recommendations feel fake, like cancel everything and use free plan type advice, I would not trust it."

> "Just show current spending clearly and maybe better options. Simple enough. And do not make it feel like some sales trap."

**Most surprising thing:** Dharaneesh had an active subscription to an AI resume builder that auto-renewed without him noticing. He had used it exactly once and only discovered it when reviewing his bank statement much later. This is a different category from tools people consciously use daily — forgotten subscriptions that auto-renew silently. Most audit tools only surface active tool comparisons. The forgotten auto-renewal is an equally real problem the current design does not address.

**What it changed about the design:**

Two changes came from this conversation:

1. Added a note in the spend input form placeholder text — "include any tools you subscribed to but rarely use." Previously the form assumed users would only enter tools they actively use. Forgotten subscriptions are part of the real overspend problem.

2. Reinforced the anti-sales-trap tone throughout the results page. Dharaneesh specifically flagged "cancel everything and use free plan" type recommendations as untrustworthy. Recommendations now use specific reasoning tied to seat count and actual usage patterns rather than generic cost-cutting language.

---

---

## Interview 3 — Amshen, Freelance Developer and Content Consultant, Independent

**Role:** Freelance Developer and Content Consultant
**Company stage:** Independent, no company subsidy
**Format:** WhatsApp conversation, ~25 minutes
**Date:** 2026-05-12

**Context:** Amshen handles mixed client work — coding, content, proposals. Pays for all AI tools personally from freelance income. Workload is inconsistent week to week, which means his AI tool value is inconsistent in a way a salaried employee's would not be.

**Direct quotes:**

> "Some weeks heavy workload. Then AI feels like a lifesaver. Next two weeks almost no use. Monthly subscription feels waste sometimes."

> "I forgot I upgraded from free plan during one urgent client project. After project finished I barely opened it again for one month."

> "Pure laziness. You always feel maybe next client work it will be useful."

> "I just want quick answer. Not relationship."

> "Just use free AI tools only sounds good until deadline hits."

> "Especially for freelancers. We subscribe during pressure periods and forget later."

**Most surprising thing:** Amshen does not think about AI tools as a fixed monthly cost the way a salaried employee would. His workload is inconsistent, so his AI tool value is inconsistent. He upgraded Claude during a high-pressure client project, used it heavily for one week, then barely touched it for a month before cancelling. The audit tool as designed assumes relatively stable monthly usage. For freelancers the real problem is not which plan they are on — it is that they subscribe during pressure and forget to cancel after. That is a fundamentally different problem from what the tool currently solves.

**What it changed about the design:**

Two changes came from this conversation:

1. Added a low-usage warning concept to the results framing. If a user enters a tool with high monthly spend and reports infrequent or mixed use, the reasoning now flags it as a usage mismatch rather than just a plan mismatch — "consider cancelling between projects and resubscribing when needed" is more honest and more useful for the freelancer segment than a generic downgrade recommendation.

2. Simplified email capture fields. Amshen specifically described asking for company size, phone number, and demo booking as starting a relationship he did not ask for. The optional capture form now asks for email and optional role only — the minimum needed for Credex follow-up without the friction of a discovery call funnel.

---

## Key insights across all three interviews

1. **Auto-debit kills awareness.** None of the three users actively monitor their AI subscriptions. Spend accumulates invisibly until someone checks a bank statement.

2. **Trust is earned by specificity.** Vague recommendations ("this is expensive") are dismissed immediately. Reasoning tied to actual seat count, use case, and usage pattern is what all three described as credible.

3. **FOMO is the root cause, not the tools.** Sinan said he would cancel Claude today — and resubscribe to something else within two weeks. Cancelling one subscription does not solve the underlying behavior. The audit helps with the rational decision but not the behavioral one.

4. **Email after value, never before.** All three users independently described leaving tools that asked for email upfront. No prompting was needed — this came up organically each time.

5. **Freelancers are a distinct segment.** Salaried users have stable usage patterns where plan optimization makes sense. Freelancers have bursty workloads where the real problem is subscribe-and-forget, not wrong plan tier. The current tool addresses the salaried case well and the freelancer case partially.

## What surprised me most

Going into these interviews I assumed users knew what they were paying for and just needed help optimizing it. The actual picture was messier in both directions: Dharaneesh had a forgotten auto-renewal on a tool he had used exactly once. Amshen subscribed during deadline pressure and forgot to cancel. Sinan knew exactly what he was paying but renewed out of FOMO rather than use. The design assumption — that users have clear, stable usage they want to optimize — was only true for one of three users. A future version needs an explicit "subscriptions I barely use" input category alongside the standard plan optimization flow.
