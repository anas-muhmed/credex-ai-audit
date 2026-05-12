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
    <div className={`rounded-xl border border-gray-800 bg-gray-900 p-6 ${
      result.isOptimal
        ? 'border-l-4 border-l-green-500'
        : hasSavings
        ? 'border-l-4 border-l-yellow-500'
        : 'border-l-4 border-l-gray-600'
    }`}>

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-white text-lg">{displayName}</h3>
          {/* Current spend — muted, smaller */}
          <p className="text-xs text-gray-500 mt-0.5">
            {result.currentPlan} · ${result.currentMonthlyCost}/mo
          </p>
        </div>

        {/* Savings badge — pill shaped */}
        {hasSavings ? (
          <div className="shrink-0 rounded-full bg-yellow-500/15 border border-yellow-500/30 px-4 py-1.5 text-center">
            <p className="text-yellow-400 font-bold text-base leading-none whitespace-nowrap">
              −${result.monthlySavings}/mo
            </p>
          </div>
        ) : (
          <div className="shrink-0 rounded-full bg-green-500/15 border border-green-500/30 px-4 py-1.5">
            <p className="text-green-400 font-bold text-sm leading-none">✓ Optimal</p>
          </div>
        )}
      </div>

      {/* Recommendation — white, medium weight */}
      <div className="rounded-lg bg-gray-800/50 px-4 py-3 mb-3">
        <p className="text-sm font-medium text-white">
          {result.recommendedAction}
        </p>
      </div>

      {/* Reasoning — muted gray, italic, smaller */}
      <p className="text-xs text-gray-500 italic">{result.reasoning}</p>

      {/* Annual savings — amber, bold, punchline */}
      {hasSavings && (
        <p className="mt-3 text-sm font-bold text-yellow-400">
          ${result.annualSavings.toLocaleString()} saved over 12 months.
        </p>
      )}
    </div>
  )
}
