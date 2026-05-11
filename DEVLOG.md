# DEVLOG

## Day 1 — 2026-05-06

**Hours worked:** 3

**What I did:** Initialized Next.js 14 project with TypeScript and Tailwind.
Installed dependencies (Supabase, Resend, Anthropic SDK, nanoid, Vitest).
Created .env.example with all required variable names.
Scaffolded folder structure and created all 12 placeholder markdown files.

**What I learned:** How Next.js 14 App Router structures a project — the `/app` directory replaces the old `/pages` directory, and each folder with a `page.tsx` becomes a route. Also learned that `create-next-app` auto-initializes a git repo, so you don't need to run `git init` manually.

**Blockers / what I'm stuck on:** None today. Setup went smoothly. The CRLF line-ending warnings on Windows are cosmetic and don't affect the build.

**Plan for tomorrow:** Build `SpendForm.tsx` with all 8 tools (Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, Windsurf). Each tool needs a plan selector, seat count input, and monthly spend field. Add localStorage persistence so the form survives a page refresh. Also write `lib/pricing-data.ts` with hardcoded pricing for all plans.

---

## Day 2 — 2026-05-07

**Hours worked:** 3

**What I did:** Built `lib/pricing-data.ts` with hardcoded pricing for all 8 AI tools and their plans. Built `components/SpendForm.tsx` — a multi-tool input form with tool selector, plan dropdown, seat count, use case selector, and monthly spend field. Added localStorage persistence so form data survives a page refresh. Updated `types/index.ts` with correct interfaces including `useCase` field on `ToolInput`. Filled `PRICING_DATA.md` with source URLs for every vendor.

**What I learned:** The difference between `useEffect` with an empty dependency array (runs once on load) vs one with a dependency (runs every time that value changes). Using two `useEffect` hooks together is how you sync React state with localStorage — one to restore on load, one to save on every change.

**Blockers / what I'm stuck on:** None. TypeScript naming mismatch between `AuditResult` and `AuditOutput` caught early — fixed before Day 3 audit engine imports these types.

**Plan for tomorrow:** Build `lib/audit-engine.ts` — pure TypeScript logic implementing all 4 audit rules. Write all 5 Vitest tests in `__tests__/audit-engine.test.ts` and get them passing.

---

## Day 3 — 2026-05-08

**Hours worked:** 3

**What I did:** Built `lib/audit-engine.ts` — pure TypeScript logic implementing all 4 audit rules: plan fit by seat count, redundancy detection between Cursor and GitHub Copilot, overpay vs API flag (only triggers for coding/data use cases), and the already-optimal fallback. Updated type names from Day 2 (`AuditResult` → per-tool result, `AuditOutput` → total output). Wrote 5 Vitest tests in `__tests__/audit-engine.test.ts` covering all rules. All 5 pass.

**What I learned:** Pure functions are easy to test because they have no side effects — same input always gives same output. The `useCase` field from Day 2 is what makes Rule 3 intelligent — without it the API flag would fire for everyone on Claude Pro, even writers who don't benefit from API Direct.

**Blockers / what I'm stuck on:** None. Tests passed first run after fixing missing `useCase` field in test inputs.

**Plan for tomorrow:** Build the results page — `SavingsHero.tsx` (big savings number at top), `ToolBreakdown.tsx` (per-tool recommendation cards), and `app/results/[slug]/page.tsx` using hardcoded dummy audit data to build and validate the UI. No database connection yet — that comes Day 5.

---

## Day 4 — 2026-05-09

**Hours worked:** 3

**What I did:** Built `components/SavingsHero.tsx` — displays total monthly and annual savings in large text with three conditional states: Credex consultation CTA for savings above $500, a "spending well" message for zero savings, and a low-savings notice for amounts under $100. Built `components/ToolBreakdown.tsx` — per-tool recommendation card with color-coded borders (yellow for savings found, green for optimal), savings badge, recommended action, and reasoning. Wired up `app/results/[slug]/page.tsx` using hardcoded dummy data to render both components. Page is fully functional and screenshot-ready.

**What I learned:** Structuring dummy data to exactly match the TypeScript interface before the database exists forces you to think through the full data shape early — I caught a mismatch between `AuditOutput` and `AuditResult` naming that would have broken Day 5 Supabase wiring. Also learned that conditional rendering with `&&` is cleaner than ternaries when you only have a "show or don't show" case with no else branch.

**Blockers / what I'm stuck on:** None. Dummy data approach worked well — UI is fully built and validated before touching the database.

**Plan for tomorrow:** Connect Supabase — set up the two tables (audits, leads), wire up the API routes to read/write real data, replace dummy data on results page with real Supabase fetch. Also integrate Anthropic API for the summary paragraph and build the email capture flow with Resend.

---

## Day 5 — 2026-05-10

**Hours worked:** 4

**What I did:** Set up Supabase project, created `audits` and `leads` tables via SQL editor. Set up Resend account. Configured all environment variables in `.env.local`. Used Anthropic API (`claude-sonnet-4-20250514`) for AI summary generation. Updated `api/audit/route.ts` to save audits to Supabase and generate AI summary in one request. Updated `app/results/[slug]/page.tsx` to fetch real data from Supabase instead of dummy data. Built `EmailCapture.tsx` with honeypot field, rate limiting, and optional company/role/team size fields. Wired up `api/capture/route.ts` to save leads and send transactional email via Resend. Fixed Resend sender domain to use `onboarding@resend.dev` for development since custom domain is not yet verified. Full end-to-end flow tested and working.

**What I learned:** Next.js initializes module-level code at build time, not runtime — so API clients that read `process.env` must be initialized inside the function body, not at the top of the file. Discovered this when the Anthropic client threw "Missing credentials" even though `.env.local` was correctly configured. Moving the client initialization inside the function fixed it immediately.

**Blockers / what I'm stuck on:** Resend free tier only allows sending to the account owner's email without a verified domain. This is fine for testing but needs a verified domain before production deploy. Will sort on Day 6 when deploying to Vercel.

**Plan for tomorrow:** Shareable URL is already working. Day 6 tasks: GitHub Actions CI setup, deploy to Vercel, add environment variables to Vercel dashboard, verify OG tags work on the deployed URL, fix Resend sender domain.

---

## Day 6 — 2026-05-11

**Hours worked:** 2

**What I did:** Fixed a TypeScript CI error in `SpendForm.tsx` — the `updateEntry` function was missing the `useCase` field when switching tools, which caused `tsc --noEmit` to fail in GitHub Actions. Fixed by adding `useCase: 'mixed'` as the default when resetting a tool entry. CI went green. Deployed to Vercel via the web dashboard, added all 5 environment variables (ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY, NEXT_PUBLIC_BASE_URL), and redeployed. Verified the full end-to-end flow on production — submitted a real audit and landed on a live shareable results page at `credex-ai-audit-one.vercel.app/results/jEYlm6AP`.

**What I learned:** TypeScript's strict mode catches missing required fields even inside conditional branches that look correct at a glance. The CI type check (`tsc --noEmit`) is more valuable than local development because it runs against the full project with no loose settings — it caught a bug that the browser was silently ignoring by falling back to `undefined`. Also learned that Vercel GUI deployment is faster than CLI when you don't have an existing auth token.

**Blockers / what I'm stuck on:** Resend free tier still limits sending to the account owner's email without a verified domain. Works for testing but needs `noreply@credex.rocks` verified before production launch.

**Plan for tomorrow:** Write all documentation files — ARCHITECTURE.md (system diagram), REFLECTION.md (5 questions), GTM.md, ECONOMICS.md, LANDING_COPY.md, METRICS.md, TESTS.md, PROMPTS.md, and README.md with screenshots. Run Lighthouse audit on the deployed URL targeting Performance ≥85 and Accessibility ≥90. Get a 3rd user interview if possible.

---

<!-- Add one entry per day -->
