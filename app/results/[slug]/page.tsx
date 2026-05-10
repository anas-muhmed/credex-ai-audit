import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { AuditOutput } from '@/types'
import { supabase } from '@/lib/supabase'
import SavingsHero from '@/components/SavingsHero'
import ToolBreakdown from '@/components/ToolBreakdown'
import EmailCapture from '@/components/EmailCapture'

interface PageProps {
  params: { slug: string }
}

interface AuditRow {
  id: string
  slug: string
  audit_results: AuditOutput
  ai_summary: string | null
  total_monthly_savings: number
  total_annual_savings: number
}

async function getAudit(slug: string): Promise<AuditRow | null> {
  const { data, error } = await supabase
    .from('audits')
    .select('id, slug, audit_results, ai_summary, total_monthly_savings, total_annual_savings')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as AuditRow
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const audit = await getAudit(params.slug)
  if (!audit) return { title: 'Audit not found' }

  const savings = audit.total_monthly_savings
  const firstSentence = audit.ai_summary?.split('.')[0] ?? ''
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ai-spend-audit.vercel.app'

  return {
    title: `I found $${savings}/month in AI tool savings | AI Spend Audit`,
    description: firstSentence,
    openGraph: {
      title: `I found $${savings}/month in AI tool savings`,
      description: firstSentence,
      url: `${baseUrl}/results/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `I found $${savings}/month in AI tool savings`,
      description: firstSentence,
    },
  }
}

export default async function ResultsPage({ params }: PageProps) {
  const audit = await getAudit(params.slug)
  if (!audit) notFound()

  const auditResult = audit.audit_results
  const summary = audit.ai_summary ?? ''

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
          totalMonthlySavings={auditResult.totalMonthlySavings}
          totalAnnualSavings={auditResult.totalAnnualSavings}
          isHighSavings={auditResult.isHighSavings}
        />

        {/* AI summary paragraph */}
        {summary && (
          <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
              Audit Summary
            </p>
            <p className="text-gray-300 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Per-tool breakdown */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Tool-by-tool breakdown
          </h2>
          <div className="space-y-4">
            {auditResult.toolResults.map((result) => (
              <ToolBreakdown key={result.tool} result={result} />
            ))}
          </div>
        </div>

        {/* Email capture */}
        <EmailCapture auditId={audit.id} slug={params.slug} />

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
