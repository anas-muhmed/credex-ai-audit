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

<!-- Add one entry per day -->
