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
    <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-8 text-center">

      {/* Main savings number */}
      <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">
        Monthly savings identified
      </p>
      <p className="text-6xl font-bold text-white mb-1">
        ${totalMonthlySavings.toLocaleString()}
      </p>
      <p className="text-lg text-gray-400">
        ${totalAnnualSavings.toLocaleString()} / year
      </p>

      {/* High savings CTA */}
      {isHighSavings && (
        <div className="mt-8 rounded-xl bg-blue-600 px-6 py-5">
          <p className="text-white font-semibold text-lg">
            Get these savings guaranteed
          </p>
          <p className="text-blue-200 text-sm mt-1 mb-4">
            A Credex advisor will audit your stack and implement the savings for you.
          </p>
          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-white text-blue-700 font-semibold px-6 py-2 text-sm hover:bg-blue-50 transition-colors"
          >
            Book a Credex consultation →
          </a>
        </div>
      )}

      {/* Spending well message */}
      {!hasAnySavings && (
        <div className="mt-8 rounded-xl bg-green-900/40 border border-green-700 px-6 py-5">
          <p className="text-green-400 font-semibold text-lg">
            You&apos;re spending well
          </p>
          <p className="text-green-300/70 text-sm mt-1">
            Sign up to get notified when better options apply to your stack.
          </p>
        </div>
      )}

      {/* Low but non-zero savings */}
      {hasAnySavings && !isHighSavings && totalMonthlySavings < 100 && (
        <div className="mt-8 rounded-xl bg-yellow-900/30 border border-yellow-700/50 px-6 py-4">
          <p className="text-yellow-300 text-sm">
            Small savings found. Sign up to get notified when bigger opportunities apply to your stack.
          </p>
        </div>
      )}
    </div>
  )
}
