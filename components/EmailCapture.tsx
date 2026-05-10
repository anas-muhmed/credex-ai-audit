'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  auditId: string
  slug: string
}

export default function EmailCapture({ auditId, slug }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId, slug, email, companyName, role, teamSize, website }),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-800 bg-green-900/20 px-6 py-5 text-center">
        <p className="text-green-400 font-semibold">Report sent.</p>
        <p className="text-green-300/70 text-sm mt-1">
          Check your inbox for the full audit link.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 px-6 py-6">
      <h2 className="text-lg font-semibold text-white mb-1">Get this report by email</h2>
      <p className="text-sm text-gray-400 mb-5">
        We&apos;ll send you a link to this audit. No spam — one email only.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from real users, bots fill it */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Company name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Inc."
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Your role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Founder / Eng Manager"
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Team size</label>
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select team size</option>
            <option value="1-5">1–5 people</option>
            <option value="6-20">6–20 people</option>
            <option value="21-50">21–50 people</option>
            <option value="51+">51+ people</option>
          </select>
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 text-sm font-semibold text-white transition-colors"
        >
          {status === 'loading' ? 'Sending...' : 'Send me the report →'}
        </button>
      </form>
    </div>
  )
}
