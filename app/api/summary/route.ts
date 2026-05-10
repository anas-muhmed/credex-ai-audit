import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { SummaryApiRequest, SummaryApiResponse } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' })

function buildFallback(body: SummaryApiRequest): string {
  const { toolInputs, auditResult } = body
  const totalSpend = toolInputs.reduce((s, t) => s + t.monthlySpend, 0)
  const topTool = auditResult.toolResults
    .slice()
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0]
  return (
    `Based on your current AI tool spend of $${totalSpend}/month across ${toolInputs.length} tools, ` +
    `your team has an opportunity to save $${auditResult.totalMonthlySavings}/month by optimizing your ` +
    `plan selection and eliminating redundant tools. The biggest opportunity is ${topTool?.tool ?? 'your current stack'}.`
  )
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: SummaryApiRequest | null = null

  try {
    body = await request.json() as SummaryApiRequest
    const { auditResult } = body

    const toolSummary = auditResult.toolResults
      .map(
        (r) =>
          `- ${r.tool} (${r.currentPlan}): $${r.currentMonthlyCost}/mo — ${r.recommendation}, saves $${r.monthlySavings}/mo`
      )
      .join('\n')

    const prompt = `You are an expert in SaaS cost optimization for software teams. A startup has submitted their AI tool spend for auditing. Write exactly one paragraph (~100 words) summarizing the audit findings in a direct, professional tone. Do not use bullet points. Focus on the total savings opportunity, the most impactful recommendation, and one sentence of encouragement.

Tool spend data:
${toolSummary}

Total monthly savings identified: $${auditResult.totalMonthlySavings}
Total annual savings identified: $${auditResult.totalAnnualSavings}

Write the paragraph now:`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    })

    const block = message.content.find((b) => b.type === 'text')
    const summary = block?.type === 'text' ? block.text : buildFallback(body)
    return NextResponse.json({ summary } satisfies SummaryApiResponse)
  } catch (err) {
    console.error('Summary API error:', err)
    return NextResponse.json({
      summary: body ? buildFallback(body) : 'Unable to generate summary at this time.',
    } satisfies SummaryApiResponse)
  }
}
