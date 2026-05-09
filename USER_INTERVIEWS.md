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

## Key insights across both interviews

1. **Auto-debit kills awareness.** Neither user actively monitors their AI subscriptions. Spend accumulates invisibly until someone looks at the bank statement.

2. **Trust is earned by specificity.** Vague recommendations ("this is expensive") are dismissed. Specific reasoning tied to their actual seat count and use case is what they described as credible.

3. **FOMO is the root cause, not the tools.** Cancelling one subscription doesn't solve the problem — the next Twitter thread will create a new one. The audit helps with the rational decision but not the behavioral one.

4. **Email after value, never before.** Both users independently described leaving tools that asked for email upfront. This validated the design without prompting.

## What surprised me most

The forgotten auto-renewal insight from Dharaneesh was entirely outside the design scope going in. The tool was built assuming users know what they're paying for. The real picture is messier — subscriptions that aren't actively used but keep renewing because cancellation requires effort. A future version should prompt: "anything you subscribed to and forgot about?" as an explicit input category.
