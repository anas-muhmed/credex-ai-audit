import type { ToolInput, AuditResult, AuditOutput } from '@/types'
import { getPlanPrice } from './pricing-data'

const TEAM_BUSINESS_PLANS = ['Business', 'Team', 'Enterprise']
const SMALL_SEAT_THRESHOLD = 2
const API_SENSITIVE_USE_CASES = ['coding', 'data']

function getDowngradePlan(tool: string, currentPlan: string): string | null {
  const downgrades: Record<string, Record<string, string>> = {
    cursor: { Business: 'Pro' },
    'github-copilot': { Business: 'Individual', Enterprise: 'Business' },
    claude: { Team: 'Pro', Max: 'Pro' },
    chatgpt: { Team: 'Plus' },
    windsurf: { Team: 'Pro' },
  }
  return downgrades[tool]?.[currentPlan] ?? null
}

function auditSingleTool(input: ToolInput): AuditResult {
  const { tool, plan, seats, monthlySpend, useCase } = input

  // Rule 1: Plan fit by seat count
  if (seats <= SMALL_SEAT_THRESHOLD && TEAM_BUSINESS_PLANS.includes(plan)) {
    const downgradePlan = getDowngradePlan(tool, plan)
    if (downgradePlan) {
      const currentPrice = getPlanPrice(tool, plan)
      const recommendedPrice = getPlanPrice(tool, downgradePlan)
      if (currentPrice !== null && recommendedPrice !== null) {
        const monthlySavings = (currentPrice - recommendedPrice) * seats
        return {
          tool,
          currentPlan: plan,
          currentMonthlyCost: monthlySpend,
          recommendation: `Downgrade to ${downgradePlan}`,
          recommendedAction: `Switch from ${plan} to ${downgradePlan} — you only have ${seats} seat${seats > 1 ? 's' : ''}, which doesn't justify the higher tier.`,
          monthlySavings,
          annualSavings: monthlySavings * 12,
          reasoning: `With ${seats} seat${seats > 1 ? 's' : ''}, the ${downgradePlan} plan covers your needs at a lower price.`,
          isOptimal: false,
        }
      }
    }
  }

  // Rule 3: Overpay vs API — only flag if use case is coding or data
  if (
    API_SENSITIVE_USE_CASES.includes(useCase) &&
    ((tool === 'claude' && plan === 'Pro') ||
      (tool === 'chatgpt' && plan === 'Plus'))
  ) {
    return {
      tool,
      currentPlan: plan,
      currentMonthlyCost: monthlySpend,
      recommendation: 'Consider API Direct',
      recommendedAction: `Your use case is ${useCase} — API Direct pricing may be cheaper at your usage level than a flat subscription. Worth investigating.`,
      monthlySavings: 0,
      annualSavings: 0,
      reasoning: 'API Direct is more cost-effective than flat subscriptions for programmatic or high-volume usage.',
      isOptimal: false,
    }
  }

  // Rule 4: Already optimal
  return {
    tool,
    currentPlan: plan,
    currentMonthlyCost: monthlySpend,
    recommendation: 'No action needed',
    recommendedAction: 'You are spending well on this tool.',
    monthlySavings: 0,
    annualSavings: 0,
    reasoning: 'Your current plan is appropriate for your team size and usage.',
    isOptimal: true,
  }
}

function detectRedundancy(inputs: ToolInput[]): Map<string, AuditResult> {
  const overrides = new Map<string, AuditResult>()

  const cursorEntry = inputs.find(
    (i) => i.tool === 'cursor' && (i.plan === 'Pro' || i.plan === 'Business')
  )
  const copilotEntry = inputs.find((i) => i.tool === 'github-copilot')

  if (cursorEntry && copilotEntry) {
    const dropTool = copilotEntry.monthlySpend <= cursorEntry.monthlySpend
      ? copilotEntry
      : cursorEntry
    const keepTool = dropTool === copilotEntry ? cursorEntry : copilotEntry

    const dropped: AuditResult = {
      tool: dropTool.tool,
      currentPlan: dropTool.plan,
      currentMonthlyCost: dropTool.monthlySpend,
      recommendation: `Drop — redundant with ${keepTool.tool}`,
      recommendedAction: `You have both Cursor and GitHub Copilot — these are redundant coding assistants. Drop ${dropTool.tool} and keep ${keepTool.tool}.`,
      monthlySavings: dropTool.monthlySpend,
      annualSavings: dropTool.monthlySpend * 12,
      reasoning: 'Running two AI coding assistants simultaneously provides diminishing returns over a single well-chosen tool.',
      isOptimal: false,
    }

    overrides.set(dropTool.tool, dropped)
  }

  return overrides
}

export function runAudit(inputs: ToolInput[]): AuditOutput {
  const redundancyOverrides = detectRedundancy(inputs)

  const toolResults: AuditResult[] = inputs.map((input) => {
    if (redundancyOverrides.has(input.tool)) {
      return redundancyOverrides.get(input.tool)!
    }
    return auditSingleTool(input)
  })

  const totalMonthlySavings = toolResults.reduce(
    (sum, r) => sum + r.monthlySavings,
    0
  )

  return {
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    isHighSavings: totalMonthlySavings > 500,
    toolResults,
  }
}
