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

<!-- Add one entry per day -->
