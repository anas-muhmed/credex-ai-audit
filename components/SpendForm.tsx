'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PRICING_DATA } from '@/lib/pricing-data'
import type { ToolInput, ToolName } from '@/types'

const STORAGE_KEY = 'ai-spend-audit-form'

function emptyEntry(): ToolInput {
  return {
    tool: 'cursor',
    plan: 'Pro',
    seats: 1,
    monthlySpend: 20,
    useCase: 'mixed',
  }
}

export default function SpendForm() {
  const router = useRouter()
  const [entries, setEntries] = useState<ToolInput[]>([emptyEntry()])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load saved form data from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch {
        // corrupted data — start fresh
      }
    }
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  function updateEntry(index: number, field: keyof ToolInput, value: string | number) {
    setEntries((prev) => {
      const updated = [...prev]
      if (field === 'tool') {
        const firstPlan = PRICING_DATA.find((t) => t.toolName === value)?.plans[0]
        updated[index] = {
          tool: value as ToolName,
          plan: firstPlan?.name ?? '',
          seats: 1,
          monthlySpend: firstPlan?.pricePerSeat ?? 0,
        }
      } else {
        updated[index] = { ...updated[index], [field]: value }
      }
      return updated
    })
  }

  function addEntry() {
    setEntries((prev) => [...prev, emptyEntry()])
  }

  function removeEntry(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolInputs: entries }),
      })

      if (!res.ok) throw new Error('Audit failed')

      const data = await res.json()
      localStorage.removeItem(STORAGE_KEY)
      router.push(`/results/${data.slug}`)
    } catch {
      setError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {entries.map((entry, index) => {
        const toolPricing = PRICING_DATA.find((t) => t.toolName === entry.tool)
        const plans = toolPricing?.plans ?? []
        const selectedPlan = plans.find((p) => p.name === entry.plan)

        return (
          <div key={index} className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Tool {index + 1}</span>
              {entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Tool selector */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">AI Tool</label>
              <select
                value={entry.tool}
                onChange={(e) => updateEntry(index, 'tool', e.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRICING_DATA.map((t) => (
                  <option key={t.toolName} value={t.toolName}>
                    {t.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan selector */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Plan</label>
              <select
                value={entry.plan}
                onChange={(e) => updateEntry(index, 'plan', e.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {plans.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                    {p.pricePerSeat !== null ? ` — $${p.pricePerSeat}/seat/mo` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Seats — hide for API Direct plans */}
            {!selectedPlan?.isApiDirect && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Number of seats</label>
                <input
                  type="number"
                  min={1}
                  value={entry.seats}
                  onChange={(e) => updateEntry(index, 'seats', parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Use case */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary use case</label>
              <select
                value={entry.useCase}
                onChange={(e) => updateEntry(index, 'useCase', e.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            {/* Monthly spend */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Monthly spend (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  value={entry.monthlySpend}
                  onChange={(e) => updateEntry(index, 'monthlySpend', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* Add another tool */}
      {entries.length < 8 && (
        <button
          type="button"
          onClick={addEntry}
          className="w-full rounded-xl border border-dashed border-gray-700 py-4 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors"
        >
          <span className="block">+ Add another tool</span>
          <span className="block text-xs text-gray-600 mt-1">Include tools you subscribed to but rarely use</span>
        </button>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-sm font-semibold text-white transition-colors"
      >
        {isSubmitting ? 'Analyzing...' : 'Run my audit →'}
      </button>
    </form>
  )
}
