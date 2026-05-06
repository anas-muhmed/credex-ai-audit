# Tests

_To be completed on Day 3 as tests are written._

## Test file

`__tests__/audit-engine.test.ts` — Vitest

## Test cases

1. User with 2 seats on Business plan → correctly recommends downgrade
2. User with Cursor Pro + GitHub Copilot → correctly flags redundancy
3. User already on optimal plan → returns isOptimal true, savings 0
4. Total savings calculation is correct across multiple tools
5. isHighSavings is true when total > $500, false when below

## Running tests

```bash
npm test
```
