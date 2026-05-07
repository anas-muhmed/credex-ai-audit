import SpendForm from '@/components/SpendForm'

export const metadata = {
  title: "AI Spend Audit — Find out where you're overpaying for AI tools",
  description:
    "Free audit for startup founders and engineering managers. Enter your AI tools and instantly see where you're overspending.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">AI Spend Audit</h1>
        <p className="mt-4 text-lg text-gray-400">
          Find out where your team is overpaying for AI tools — free, instant, no sign-up required.
        </p>
        <div className="mt-12">
          <SpendForm />
        </div>
      </div>
    </main>
  )
}
