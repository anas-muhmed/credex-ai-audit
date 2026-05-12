# Prompts

## AI Summary Prompt

Used in `app/api/audit/route.ts` — called once per audit submission after `runAudit()` returns results.

**Model:** `claude-sonnet-4-20250514`
**Max tokens:** 256
**Location in code:** inside `generateSummary()` function, initialized at call time (not module level)

```
You are an expert in SaaS cost optimization for software teams. A startup has submitted their AI tool spend for auditing. Write exactly one paragraph (~100 words) summarizing the audit findings in a direct, professional tone. Do not use bullet points. Focus on the total savings opportunity, the most impactful recommendation, and one sentence of encouragement.

Tool spend data:
- Cursor (Business): $80/mo — Downgrade to Pro, saves $40/mo
- GitHub Copilot (Individual): $19/mo — No action needed, saves $0/mo

Total monthly savings identified: $40
Total annual savings identified: $480

Write the paragraph now:
```

---

## Why each part of the prompt is written this way

**"You are an expert in SaaS cost optimization for software teams"**
Role-priming makes the output more direct and less hedged. Without this, the response tends toward generic financial advice language ("you may want to consider..."). With it, the tone is specific and confident.

**"Write exactly one paragraph (~100 words)"**
Left unspecified, Claude defaults to bullet points when given structured data like a list of tools. The results page already has a `ToolBreakdown` component rendering per-tool cards — bullet points in the summary would be redundant and visually broken. One paragraph forces a narrative form that complements the structured UI below it.

**"Do not use bullet points"**
Explicit constraint repeated because the input data is a bullet list. Without this, the model frequently mirrors the input format in the output. The redundancy is intentional — it overrides the structural pull of the data shape.

**"direct, professional tone"**
User interview feedback (Sinan, Interview 1): any urgency framing — "you are wasting $5000 a year" — was described as an immediate red flag. "Professional" prevents alarm language. "Direct" prevents the over-polite hedging that makes AI output feel generic.

**"Focus on the total savings opportunity, the most impactful recommendation, and one sentence of encouragement"**
Three explicit focus areas prevent the model from spending words on things already shown elsewhere in the UI (the individual tool cards, the SavingsHero total). The encouragement constraint came from noticing early drafts ended on a neutral or slightly negative note — one closing sentence of encouragement significantly improved how the summary felt to read.

**"Write the paragraph now:"**
Trailing colon as a completion cue. This pattern reduces the chance of the model adding preamble like "Here is the summary:" before the actual content — keeping the API response clean for direct insertion into the UI.

**Max tokens: 256**
~100 words × ~1.3 tokens/word = ~130 tokens for the paragraph. 256 gives enough headroom for variation without risk of mid-sentence truncation. Setting it higher (e.g. 512) produced noticeably longer output despite the ~100 word instruction — the lower cap enforces the constraint mechanically.

---

## Fallback template (used when Anthropic API call fails)

```
Based on your current AI tool spend of $X/month across N tools, your team has an opportunity to save $Y/month by optimizing your plan selection and eliminating redundant tools. The biggest opportunity is {top tool}.
```

The fallback is generated from the same `AuditOutput` data that populates the UI — it is never a static string. If the Anthropic call fails, the user still gets a meaningful (if less tailored) summary rather than an error message. The top tool is sorted by `monthlySavings` descending so the most impactful recommendation is always named.
