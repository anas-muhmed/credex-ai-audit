import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import type { CaptureApiRequest, CaptureApiResponse } from '@/types'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5
const ipSubmissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const submissions = (ipSubmissions.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  )
  if (submissions.length >= RATE_LIMIT_MAX) return true
  ipSubmissions.set(ip, [...submissions, now])
  return false
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const body: CaptureApiRequest & { website?: string } = await request.json()

    // Honeypot check — silently reject bots that fill the hidden field
    if (body.website) {
      return NextResponse.json({ success: true } satisfies CaptureApiResponse)
    }

    const { auditId, slug, email, companyName, role, teamSize } = body

    if (!email || !auditId || !slug) {
      return NextResponse.json({ error: 'email, auditId, and slug are required' }, { status: 400 })
    }

    const { data: auditData, error: auditError } = await supabase
      .from('audits')
      .select('total_monthly_savings')
      .eq('id', auditId)
      .single()

    if (auditError) {
      console.error('Audit fetch error:', auditError)
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    const { error: leadError } = await supabase.from('leads').insert({
      audit_id: auditId,
      email,
      company_name: companyName ?? null,
      role: role ?? null,
      team_size: teamSize ?? null,
    })

    if (leadError) {
      console.error('Lead insert error:', leadError)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ai-spend-audit.vercel.app'
    const auditUrl = `${baseUrl}/results/${slug}`
    const savings = auditData.total_monthly_savings as number

    await resend.emails.send({
      from: 'AI Spend Audit <onboarding@resend.dev>',
      to: email,
      subject: 'Your AI Spend Audit Results',
      html: `
        <h2>Your AI Spend Audit Results</h2>
        <p>We found <strong>$${savings}/month</strong> in potential savings for your team.</p>
        <p><a href="${auditUrl}">View your full audit report →</a></p>
        <p>If your savings are above $500/month, a Credex advisor will reach out within 2 business days.</p>
        <hr />
        <p style="color:#888;font-size:12px;">AI Spend Audit by <a href="https://credex.rocks">Credex</a></p>
      `,
    })

    return NextResponse.json({ success: true } satisfies CaptureApiResponse)
  } catch (err) {
    console.error('Capture API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
