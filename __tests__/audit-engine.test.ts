import { describe, it, expect } from 'vitest'
import { runAudit } from '../lib/audit-engine'
import type { ToolInput } from '../types'

describe('runAudit', () => {
  it('recommends downgrade for 2-seat Business plan', () => {
    const inputs: ToolInput[] = [
      { tool: 'cursor', plan: 'Business', seats: 2, monthlySpend: 80, useCase: 'coding' },
    ]
    const result = runAudit(inputs)
    const toolResult = result.toolResults[0]

    expect(toolResult.isOptimal).toBe(false)
    expect(toolResult.monthlySavings).toBeGreaterThan(0)
    expect(toolResult.recommendation).toContain('Pro')
  })

  it('flags Cursor Pro + GitHub Copilot as redundant', () => {
    const inputs: ToolInput[] = [
      { tool: 'cursor', plan: 'Pro', seats: 3, monthlySpend: 60, useCase: 'coding' },
      { tool: 'github-copilot', plan: 'Individual', seats: 3, monthlySpend: 30, useCase: 'coding' },
    ]
    const result = runAudit(inputs)
    const dropped = result.toolResults.find((r) => r.monthlySavings > 0)

    expect(dropped).toBeDefined()
    expect(dropped!.recommendedAction).toMatch(/redundant/i)
  })

  it('returns isOptimal true and savings 0 for already-optimal plan', () => {
    const inputs: ToolInput[] = [
      { tool: 'cursor', plan: 'Pro', seats: 5, monthlySpend: 100, useCase: 'coding' },
    ]
    const result = runAudit(inputs)
    const toolResult = result.toolResults[0]

    expect(toolResult.isOptimal).toBe(true)
    expect(toolResult.monthlySavings).toBe(0)
    expect(toolResult.annualSavings).toBe(0)
  })

  it('calculates total savings correctly across multiple tools', () => {
    const inputs: ToolInput[] = [
      { tool: 'cursor', plan: 'Business', seats: 2, monthlySpend: 80, useCase: 'mixed' },
      { tool: 'windsurf', plan: 'Team', seats: 2, monthlySpend: 70, useCase: 'mixed' },
    ]
    const result = runAudit(inputs)

    const expectedMonthly = result.toolResults.reduce((s, r) => s + r.monthlySavings, 0)
    expect(result.totalMonthlySavings).toBe(expectedMonthly)
    expect(result.totalAnnualSavings).toBe(expectedMonthly * 12)
  })

  it('sets isHighSavings true when savings exceed $500, false when below', () => {
    const highInputs: ToolInput[] = [
      { tool: 'cursor', plan: 'Business', seats: 2, monthlySpend: 80, useCase: 'mixed' },
      { tool: 'github-copilot', plan: 'Enterprise', seats: 15, monthlySpend: 585, useCase: 'coding' },
    ]
    const highResult = runAudit(highInputs)
    expect(highResult.isHighSavings).toBe(highResult.totalMonthlySavings > 500)

    const lowInputs: ToolInput[] = [
      { tool: 'cursor', plan: 'Pro', seats: 5, monthlySpend: 100, useCase: 'mixed' },
    ]
    const lowResult = runAudit(lowInputs)
    expect(lowResult.isHighSavings).toBe(false)
    expect(lowResult.totalMonthlySavings).toBe(0)
  })
})
