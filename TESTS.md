# Tests

## Test file

`__tests__/audit-engine.test.ts` — Vitest 4.x

Run with:
```bash
npm test
```

All 5 tests pass. CI runs them on every push to `main` via GitHub Actions (`npm test` in `.github/workflows/ci.yml`).

---

## Why only the audit engine is tested

The audit engine (`lib/audit-engine.ts`) is a pure function — same input always produces the same output, no database calls, no API calls, no side effects. That makes it the only layer in this project worth unit testing. The other layers (API routes, React components, Supabase reads/writes) depend on external services or the DOM — testing them with mocks would give false confidence, not real confidence. Integration testing those layers against a real Supabase test database would be the right next step, but was out of scope for this build week.

---

## Test cases and what each one actually checks

**Test 1 — Downgrade recommendation for small team on Business plan**
```
cursor, Business plan, 2 seats, $80/mo
```
Verifies Rule 1: a team of 2 on a Business-tier plan should be recommended to downgrade to Pro. Checks that `isOptimal` is false, `monthlySavings` is greater than zero, and the recommendation string contains "Pro". The seat threshold (≤2) and the downgrade map (`Business → Pro` for Cursor) are both exercised.

**Test 2 — Redundancy detection for Cursor Pro + GitHub Copilot**
```
cursor, Pro, 3 seats + github-copilot, Individual, 3 seats
```
Verifies Rule 2: running both a Cursor paid plan and GitHub Copilot simultaneously triggers the redundancy flag. Checks that at least one tool result has a positive `monthlySavings` and that `recommendedAction` contains the word "redundant". The engine drops the cheaper tool and keeps the more expensive one — this test confirms that logic fires correctly.

**Test 3 — Already-optimal plan returns correct zero state**
```
cursor, Pro, 5 seats, $100/mo
```
Verifies Rule 4 (the fallback): a team of 5 on Cursor Pro is an appropriate plan. No downgrade applies, no redundancy, no API flag. Checks that `isOptimal` is true and both `monthlySavings` and `annualSavings` are exactly 0. This test catches the case where the engine accidentally fires a rule it should not.

**Test 4 — Total savings calculation across multiple tools**
```
cursor, Business, 2 seats + windsurf, Team, 2 seats
```
Verifies that `totalMonthlySavings` is the correct sum of all per-tool `monthlySavings` values, and that `totalAnnualSavings` is exactly `totalMonthlySavings × 12`. Both tools trigger Rule 1, so there are real non-zero savings to add up. This test catches any arithmetic errors in the aggregation step.

**Test 5 — isHighSavings threshold**
Two sub-cases in one test:
- High case: cursor Business 2 seats + github-copilot Enterprise 15 seats → total savings should exceed $500 → `isHighSavings` true
- Low case: cursor Pro 5 seats → savings $0 → `isHighSavings` false

Verifies the threshold used to show the Credex consultation CTA on the results page. The `SavingsHero` component renders a different UI for `isHighSavings: true` — this test ensures the flag is set correctly so the CTA appears only when savings are genuinely significant.

---

## What is deliberately not tested

- **API routes** (`/api/audit`, `/api/capture`): depend on Supabase and Anthropic. Mocking them would test the mock, not the code. Not tested here.
- **React components**: `SpendForm`, `SavingsHero`, `ToolBreakdown`, `EmailCapture` — UI behavior is validated manually on the deployed URL. Component unit tests with mocked props would not catch the real integration issues (localStorage persistence, form reset on tool switch) that showed up during manual testing.
- **Rule 3 (API Direct flag)**: the rule fires for `claude Pro` or `chatgpt Plus` with `useCase: coding` or `data`. No dedicated test exists for this rule. It was validated manually but should be covered in a future test pass.
- **Redundancy drop direction**: the engine drops the cheaper tool and keeps the more expensive one. Test 2 confirms redundancy fires but does not explicitly assert which tool is dropped. A more precise test would verify the drop direction.
