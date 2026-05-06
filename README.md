# AI Spend Audit

A free web tool for startup founders and engineering managers to audit their AI tool spending, find redundancies, and get instant savings recommendations.

Built for Credex — [credex.rocks](https://credex.rocks)

## What it does

1. Enter your AI tools (name, plan, number of seats, monthly spend)
2. Get an instant audit: where you're overspending, what to cut, estimated savings
3. Optionally provide your email to receive the report
4. Share your audit via a unique public URL

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres)
- **Email:** Resend
- **AI:** Anthropic API (`claude-sonnet-4-20250514`)
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Environment Variables

```
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_BASE_URL=
```

Never commit these values. Use `.env.local` locally and Vercel environment variables in production.

## Running Tests

```bash
npm test
```

## Security Decisions

**Rate limiting on email capture:** Maximum 5 submissions per IP per hour using an in-memory store. This prevents simple abuse while keeping the implementation dependency-free. For higher-traffic scenarios, this should be moved to Redis or a Supabase table.

**Honeypot field:** The email capture form includes a hidden `website` field. Any submission that fills this field is silently rejected. This stops the majority of simple bots without requiring CAPTCHA friction for real users.

**No auth:** The audit form is intentionally public and anonymous. The only user data collected is an optional email at the results stage.

## Folder Structure

```
/app
  /page.tsx                    → Landing page + form
  /results/[slug]/page.tsx     → Public shareable result page
  /api/audit/route.ts          → Processes form, runs audit, saves to Supabase
  /api/summary/route.ts        → Calls Anthropic API for summary paragraph
  /api/capture/route.ts        → Saves email lead, sends Resend confirmation

/lib
  /audit-engine.ts             → Pure audit logic (no API calls)
  /pricing-data.ts             → Hardcoded tool pricing
  /supabase.ts                 → Supabase client
  /resend.ts                   → Resend client

/components
  /SpendForm.tsx               → Multi-tool input form
  /AuditResults.tsx            → Results display
  /SavingsHero.tsx             → Total savings callout
  /EmailCapture.tsx            → Optional email form
  /ToolBreakdown.tsx           → Per-tool recommendation card

/types
  /index.ts                    → All TypeScript types

/__tests__
  /audit-engine.test.ts        → Vitest tests for audit logic
```
