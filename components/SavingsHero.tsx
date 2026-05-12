interface SavingsHeroProps {
  totalMonthlySavings: number
  totalAnnualSavings: number
  isHighSavings: boolean
}

export default function SavingsHero({
  totalMonthlySavings,
  totalAnnualSavings,
  isHighSavings,
}: SavingsHeroProps) {
  const hasAnySavings = totalMonthlySavings > 0

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-900/30 p-8 md:p-12 text-center">

      {/* Label */}
      <p className="text-xs font-semibold text-blue-400/70 uppercase tracking-widest mb-3">
        Monthly savings identified
      </p>

      {/* Main savings number — minimum 72px */}
      <p className="text-7xl font-bold text-white mb-2 tabular-nums leading-none">
        ${totalMonthlySavings.toLocaleString()}
      </p>

      {/* Annual savings */}
      <p className="text-lg text-slate-400 mt-2">
        <span className="text-white font-semibold text-xl">
          ${totalAnnualSavings.toLocaleString()}
        </span>
        {' '}/ year
      </p>

      {/* High savings CTA */}
      {isHighSavings && (
        <div className="mt-8 rounded-xl bg-blue-600/10 border border-blue-500/20 px-6 py-5">
          <p className="text-white font-semibold text-lg">
            Get these savings guaranteed
          </p>
          <p className="text-blue-300/70 text-sm mt-1 mb-5">
            A Credex advisor will audit your stack and implement the savings for you.
          </p>
          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 text-base transition-colors"
          >
            Book a Credex consultation
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      {/* Spending well message */}
      {!hasAnySavings && (
        <div className="mt-8 rounded-xl bg-green-900/30 border border-green-700/40 px-6 py-5">
          <p className="text-green-400 font-semibold text-lg">
            You&apos;re spending well
          </p>
          <p className="text-green-300/60 text-sm mt-1">
            Sign up to get notified when better options apply to your stack.
          </p>
        </div>
      )}

      {/* Low but non-zero savings */}
      {hasAnySavings && !isHighSavings && totalMonthlySavings < 100 && (
        <div className="mt-8 rounded-xl bg-yellow-900/20 border border-yellow-700/30 px-6 py-4">
          <p className="text-yellow-300/80 text-sm">
            Small savings found. Sign up to get notified when bigger opportunities apply to your stack.
          </p>
        </div>
      )}
    </div>
  )
}
