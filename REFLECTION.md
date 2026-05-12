# Reflection

---

## What I built

A full-stack web tool that lets startup founders audit their AI tool spending and find savings — deployed, working, and shareable via a unique URL. The stack: Next.js 14 App Router, TypeScript strict mode, Tailwind CSS, Supabase (Postgres), Anthropic API, Resend, Vercel. Built across 7 days with one focused task per day.

The six features from the spec are all present: spend input form with localStorage persistence, audit engine with 4 rules, results page with per-tool breakdown, AI-generated summary paragraph via Anthropic, email lead capture with rate limiting and honeypot, and a shareable slug URL. GitHub Actions CI runs ESLint, TypeScript type checking, and 5 Vitest tests on every push to main.

Three real user interviews shaped specific product decisions — not just confirmed assumptions, but changed things. The form hint text ("include tools you subscribed to but rarely use") came from Dharaneesh. The anti-urgency tone on the results page came from Sinan. The simplified email capture came from Amshen.

---

## What I learned

**Next.js initializes module-level code at build time, not runtime.** This cost me an hour on Day 5. The Anthropic client was initialized at the top of the API route file — `const client = new Anthropic(...)` — and it read `process.env.ANTHROPIC_API_KEY` during the build, before environment variables were injected. Moving the client initialization inside the function body fixed it immediately. This is not obvious from the Next.js documentation. I would not have understood it without hitting it in production.

**Pure functions are the right default for business logic.** Writing `runAudit()` as a pure function — no database calls, no API calls, just inputs and outputs — meant all 5 tests were written without mocking anything. I kept the logic separate from the infrastructure by design on Day 3. The payoff came on Day 6 when CI had to run the tests: they passed without any setup. If the audit logic had been inside the API route, testing it would have required a test database, stubbed API calls, and significantly more effort.

**User interviews surface problems you did not know existed.** I went into every interview expecting to validate the core assumption: "founders overspend on AI tools and want help optimizing." All three interviews confirmed that. But each one also surfaced a problem I had not considered. Sinan's FOMO insight — that cancelling one subscription does not fix the behavior — is a limitation the tool cannot solve. Dharaneesh's forgotten subscription — a tool he used once and forgot about — is a different category from the active-tool optimization the product was designed for. Amshen's bursty usage pattern — subscribe during a deadline, cancel after — is a freelancer problem the tool partially addresses but was not built for. Good interviews give you things you were not looking for.

---

## What I would do differently

**Not switch to OpenAI on Day 5.** I switched the summary API from Anthropic to OpenAI gpt-4o-mini because I had existing API credits. A friend correctly flagged this as a critical mistake — Credex is an Anthropic-aligned company. I had to run `git reset HEAD~2` to undo two commits and rewrite the API routes. That cost two hours and introduced unnecessary risk the night before CI was set up. The lesson: read the brief more carefully before making infrastructure decisions. The brief mentioned Anthropic API explicitly.

**Set up CI on Day 1, not Day 6.** CI caught a TypeScript error in `SpendForm.tsx` that had been there since Day 2 — a missing `useCase` field when switching tools. The browser was silently ignoring it; the TypeScript compiler was not. If CI had been running from Day 1, the error would have been caught immediately on the commit that introduced it. Instead it sat for 4 days.

**Run Lighthouse on Day 4 when the results page UI was first built.** The accessibility score on the form page was 83 because form labels were not linked to their inputs via `htmlFor`/`id`. This is a basic HTML pattern. Finding it on Day 7 instead of Day 4 meant fixing it under time pressure rather than getting it right the first time.

---

## Hardest part

Debugging the Anthropic "Missing credentials" error on Day 5. The error message gave no indication that the problem was initialization timing — it just said the API key was missing. I had confirmed the key was correctly set in `.env.local`. I checked the environment variable name, the key format, the `.env.local` file location. All correct. The actual problem — module-level code running at build time before environment variables are available — required understanding how Next.js compiles and runs server code, which is not obvious from the error message. 

The fix was one line: move the client initialization inside the function body. But finding that fix required understanding the underlying build model. That is the kind of problem where knowing the framework matters more than knowing JavaScript.

---

## Most proud of

The user interviews. All three changed specific decisions in the product — not vaguely influenced the direction, but caused specific lines of code and copy to be different. The form hint text is different because of Dharaneesh. The CTA tone is different because of Sinan. The email capture fields are different because of Amshen. Going into the interviews I expected confirmation. I got confirmation plus three things I had not thought of. That gap — between what you think you know and what users actually tell you — is the most useful thing I took from this week.

The audit engine being a pure function is a close second. It was a deliberate design decision on Day 3 before writing a single line of logic. It made the tests trivial, the debugging simple, and the logic portable. Every time CI ran the tests and they passed in under two seconds, that decision was paying off.

---

## What I would build in week 2

Three things in priority order.

**First: automated pricing data refresh.** The current audit engine runs on hardcoded pricing pulled manually in May 2026. Vendors change prices without warning. A weekly scraper that checks official pricing pages and flags changes would make the tool defensible long term. Without it, the audit recommendations drift from reality over time and trust erodes. This is the biggest technical debt in the current build.

**Second: benchmark mode.** Right now the tool only compares a user against themselves — their current spend versus the optimized version. It does not tell them how their spend compares to similar teams. "Your AI spend per developer is $180/month — teams your size average $95/month" is a more compelling insight than a savings number alone. This requires aggregate data from completed audits, which starts accumulating from day one. By week 2 there would be enough early audits to make a simple benchmark meaningful.

**Third: PDF export.** The results page is designed to be screenshotted and shared. A proper PDF export — formatted, with Credex branding — turns the audit into a document a founder can share with their CFO or board. That extends the tool's reach beyond the person who ran the audit without requiring any additional distribution effort.

---

## How I used AI tools

Claude was my primary tool throughout. I used it for two distinct purposes and kept them separate deliberately.

For planning and decisions I used Claude conversationally — talking through architecture choices, getting feedback on the audit engine rules, reviewing documentation for completeness. This is where AI adds the most value: as a thinking partner that catches gaps you stopped seeing because you have been looking at the same problem for six days.

For code I used Claude Code in VS Code with explicit constraints: one task at a time, specific files to touch, specific files off limits, commit format requirements. Without those constraints AI tools tend to build ahead — scaffolding Day 4 work on Day 2. The daily task boundaries prevented that.

What I did not trust AI with: the audit engine rules themselves. The reasoning behind each recommendation needs to be defensible to a finance-literate person. I wrote the rule logic and used AI only to review it after. The one time the suggestion was wrong: Claude proposed using localStorage for rate limiting on the email capture endpoint. localStorage is client-side — a rate limit stored there is trivially bypassed by any user. I caught it and implemented server-side in-memory rate limiting instead.

---

## Self-rating

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Discipline | 7/10 | Committed on 6 distinct calendar days. Daily DEVLOG entries written same day. Lost points for the OpenAI detour on Day 5 — two hours wasted from not reading the brief carefully enough. |
| Code quality | 7/10 | Strict TypeScript throughout, pure functions for business logic, no `any` types. Lost points for the form label accessibility issue that sat undetected until Day 7 and the module-level initialization bug that CI caught four days late. |
| Design sense | 6/10 | Results page is clean and functional. Savings hierarchy is clear. Mobile layout works. Lighthouse accessibility above 90 after the label fix. Not award-winning but it would not embarrass the product. |
| Problem solving | 8/10 | The Anthropic credentials debugging was the hardest problem of the week — found the root cause without external help. The pure function decision was deliberate architecture that paid off. The OpenAI switch and reversal is the black mark. |
| Entrepreneurial thinking | 7/10 | Three real user interviews that changed specific product decisions. Unit economics modeled with real API cost numbers. GTM plan with specific channels and weekly targets. Lost points for not thinking about pricing data staleness until Day 7. |
