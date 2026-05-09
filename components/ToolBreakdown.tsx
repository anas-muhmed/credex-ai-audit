import type { AuditResult } from '@/types'

const TOOL_DISPLAY_NAMES: Record<string, string> = {
  cursor: 'Cursor',
  'github-copilot': 'GitHub Copilot',
  claude: 'Claude (Anthropic)',
  chatgpt: 'ChatGPT (OpenAI)',
  'anthropic-api': 'Anthropic API Direct',
  'openai-api': 'OpenAI API Direct',
  gemini: 'Gemini (Google)',
  windsurf: 'Windsurf',
}

interface ToolBreakdownProps {
  result: AuditResult
}

export default function ToolBreakdown({ result }: ToolBreakdownProps) {
  const displayName = TOOL_DISPLAY_NAMES[result.tool] ?? result.tool
  const hasSavings = result.monthlySavings > 0

  return (
    <div className={`rounded-xl border p-6 ${
      result.isOptimal
        ? 'border-green-800 bg-green-900/10'
        : hasSavings
        ? 'border-yellow-700 bg-yellow-900/10'
        : 'border-gray-700 bg-gray-900'
    }`}>

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-white text-lg">{displayName}</h3>
          <p className="text-sm text-gray-400 mt-0.5">
            Current plan: <span className="text-gray-300">{result.currentPlan}</span>
            {' · '}
            <span className="text-gray-300">${result.currentMonthlyCost}/mo</span>
          </p>
        </div>

        {/* Savings badge */}
        {hasSavings ? (
          <div className="shrink-0 rounded-lg bg-yellow-500/20 border border-yellow-600/40 px-3 py-1.5 text-center">
            <p className="text-yellow-300 font-bold text-lg leading-none">
              ${result.monthlySavings}
            </p>
            <p className="text-yellow-400/70 text-xs mt-0.5">saved/mo</p>
          </div>
        ) : (
          <div className="shrink-0 rounded-lg bg-green-500/20 border border-green-600/40 px-3 py-1.5 text-center">
            <p className="text-green-400 font-bold text-sm leading-none">✓ Optimal</p>
          </div>
        )}
      </div>

      {/* Recommendation */}
      <div className="rounded-lg bg-gray-800/60 px-4 py-3 mb-3">
        <p className="text-sm font-medium text-gray-200">
          {result.recommendedAction}
        </p>
      </div>

      {/* Reasoning */}
      <p className="text-xs text-gray-500">{result.reasoning}</p>

      {/* Annual savings callout */}
      {hasSavings && (
        <p className="mt-3 text-xs text-yellow-400/80">
          That&apos;s ${result.annualSavings.toLocaleString()} saved over 12 months.
        </p>
      )}
    </div>
  )
}
