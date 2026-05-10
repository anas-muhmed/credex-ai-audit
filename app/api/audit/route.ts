import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import Anthropic from '@anthropic-ai/sdk'
import { runAudit } from '@/lib/audit-engine'
import { supabase } from '@/lib/supabase'
import type { AuditApiRequest, AuditApiResponse, AuditOutput } from '@/types'

function buildFallbackSummary(auditResult: AuditOutput, toolCount: number, totalSpend: number): string {
  const topTool = auditResult.toolResults
    .slice()
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0]
  return (
    `Based on your current AI tool spend of $${totalSpend}/month across ${toolCount} tools, ` +
    `your team has an opportunity to save $${auditResult.totalMonthlySavings}/month by optimizing your ` +
    `plan selection and eliminating redundant tools. The biggest opportunity is ${topTool?.tool ?? 'your current stack'}.`
  )
}

async function generateSummary(auditResult: AuditOutput, toolCount: number, totalSpend: number): Promise<string> {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' })
    const toolSummary = auditResult.toolResults
      .map((r) => `- ${r.tool} (${r.currentPlan}): $${r.currentMonthlyCost}/mo — ${r.recommendation}, saves $${r.monthlySavings}/mo`)
      .join('\n')

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [{
        role: 'user',
        content: `You are an expert in SaaS cost optimization for software teams. A startup has submitted their AI tool spend for auditing. Write exactly one paragraph (~100 words) summarizing the audit findings in a direct, professional tone. Do not use bullet points. Focus on the total savings opportunity, the most impactful recommendation, and one sentence of encouragement.

Tool spend data:
${toolSummary}

Total monthly savings identified: $${auditResult.totalMonthlySavings}
Total annual savings identified: $${auditResult.totalAnnualSavings}

Write the paragraph now:`,
      }],
    })

    const block = message.content.find((b) => b.type === 'text')
    return block?.type === 'text' ? block.text : buildFallbackSummary(auditResult, toolCount, totalSpend)
  } catch {
    return buildFallbackSummary(auditResult, toolCount, totalSpend)
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: AuditApiRequest = await request.json()
    const { toolInputs } = body

    if (!toolInputs || !Array.isArray(toolInputs) || toolInputs.length === 0) {
      return NextResponse.json({ error: 'toolInputs is required' }, { status: 400 })
    }

    const auditResult = runAudit(toolInputs)
    const slug = nanoid(8)
    const totalSpend = toolInputs.reduce((s, t) => s + t.monthlySpend, 0)
    const aiSummary = await generateSummary(auditResult, toolInputs.length, totalSpend)

    const { error } = await supabase.from('audits').insert({
      slug,
      tool_inputs: toolInputs,
      audit_results: auditResult,
      ai_summary: aiSummary,
      total_monthly_savings: auditResult.totalMonthlySavings,
      total_annual_savings: auditResult.totalAnnualSavings,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 })
    }

    const response: AuditApiResponse = { slug, auditResult }
    return NextResponse.json(response)
  } catch (err) {
    console.error('Audit API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
