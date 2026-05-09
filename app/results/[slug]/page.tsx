import type { Metadata } from 'next'
import type { AuditOutput } from '@/types'
import SavingsHero from '@/components/SavingsHero'
import ToolBreakdown from '@/components/ToolBreakdown'

interface PageProps {
  params: { slug: string }
}

// Dummy data — replaced with real Supabase fetch on Day 5
const DUMMY_AUDIT: AuditOutput = {
  totalMonthlySavings: 640,
  totalAnnualSavings: 7680,
  isHighSavings: true,
  toolResults: [
    {
      tool: 'cursor',
      currentPlan: 'Business',
      currentMonthlyCost: 80,
      recommendation: 'Downgrade to Pro',
      recommendedAction: 'Switch from Business to Pro — you only have 2 seats, which does not justify the higher tier.',
      monthlySavings: 40,
      annualSavings: 480,
      reasoning: 'With 2 seats, the Pro plan covers your needs at a lower price.',
      isOptimal: false,
    },
    {
      tool: 'github-copilot',
      currentPlan: 'Business',
      currentMonthlyCost: 38,
      recommendation: 'Drop — redundant with cursor',
      recommendedAction: 'You have both Cursor and GitHub Copilot — these are redundant coding assistants. Drop GitHub Copilot and keep Cursor.',
      monthlySavings: 38,
      annualSavings: 456,
      reasoning: 'Running two AI coding assistants simultaneously provides diminishing returns over a single well-chosen tool.',
      isOptimal: false,
    },
    {
      tool: 'claude',
      currentPlan: 'Team',
      currentMonthlyCost: 90,
      recommendation: 'Downgrade to Pro',
      recommendedAction: 'Switch from Team to Pro — you only have 2 seats, which does not justify the Team plan.',
      monthlySavings: 20,
      annualSavings: 240,
      reasoning: 'With 2 seats, the Pro plan covers your needs at a lower price.',
      isOptimal: false,
    },
    {
      tool: 'windsurf',
      currentPlan: 'Pro',
      currentMonthlyCost: 75,
      recommendation: 'No action needed',
      recommendedAction: 'You are spending well on this tool.',
      monthlySavings: 0,
      annualSavings: 0,
      reasoning: 'Your current plan is appropriate for your team size and usage.',
      isOptimal: true,
    },
  ],
}

const DUMMY_SUMMARY = 'Based on your current AI tool spend of $283/month across 4 tools, your team has a clear opportunity to save $640/month by eliminating a redundant coding assistant and right-sizing two subscriptions to your actual seat count. The biggest win is dropping GitHub Copilot entirely — Cursor already covers everything it does. These are straightforward changes you can make today with no workflow disruption.'

export const metadata: Metadata = {
  title: `I found $${DUMMY_AUDIT.totalMonthlySavings}/month in AI tool savings`,
  description: DUMMY_SUMMARY.split('.')[0],
}

export default function ResultsPage({ params }: PageProps) {
  const audit = DUMMY_AUDIT
  const summary = DUMMY_SUMMARY

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 space-y-8">

        {/* Header */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Audit ID: <span className="font-mono">{params.slug}</span>
          </p>
          <h1 className="text-3xl font-bold">Your AI Spend Audit</h1>
        </div>

        {/* Big savings number + CTA */}
        <SavingsHero
          totalMonthlySavings={audit.totalMonthlySavings}
          totalAnnualSavings={audit.totalAnnualSavings}
          isHighSavings={audit.isHighSavings}
        />

        {/* AI summary paragraph */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
            Audit Summary
          </p>
          <p className="text-gray-300 leading-relaxed">{summary}</p>
        </div>

        {/* Per-tool breakdown */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Tool-by-tool breakdown
          </h2>
          <div className="space-y-4">
            {audit.toolResults.map((result) => (
              <ToolBreakdown key={result.tool} result={result} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600">
          Powered by{' '}
          <a href="https://credex.rocks" className="hover:text-gray-400 transition-colors">
            Credex
          </a>
        </p>
      </div>
    </main>
  )
}
