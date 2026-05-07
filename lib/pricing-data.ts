import type { ToolPricing } from '@/types'

export const PRICING_DATA: ToolPricing[] = [
  {
    toolName: 'cursor',
    displayName: 'Cursor',
    plans: [
      { name: 'Hobby', pricePerSeat: 0, isCustom: false, isApiDirect: false },
      { name: 'Pro', pricePerSeat: 20, isCustom: false, isApiDirect: false },
      { name: 'Business', pricePerSeat: 40, isCustom: false, isApiDirect: false },
      { name: 'Enterprise', pricePerSeat: null, isCustom: true, isApiDirect: false },
    ],
  },
  {
    toolName: 'github-copilot',
    displayName: 'GitHub Copilot',
    plans: [
      { name: 'Individual', pricePerSeat: 10, isCustom: false, isApiDirect: false },
      { name: 'Business', pricePerSeat: 19, isCustom: false, isApiDirect: false },
      { name: 'Enterprise', pricePerSeat: 39, isCustom: false, isApiDirect: false },
    ],
  },
  {
    toolName: 'claude',
    displayName: 'Claude (Anthropic)',
    plans: [
      { name: 'Free', pricePerSeat: 0, isCustom: false, isApiDirect: false },
      { name: 'Pro', pricePerSeat: 20, isCustom: false, isApiDirect: false },
      { name: 'Max', pricePerSeat: 100, isCustom: false, isApiDirect: false },
      { name: 'Team', pricePerSeat: 30, isCustom: false, isApiDirect: false },
      { name: 'Enterprise', pricePerSeat: null, isCustom: true, isApiDirect: false },
      { name: 'API Direct', pricePerSeat: null, isCustom: false, isApiDirect: true },
    ],
  },
  {
    toolName: 'chatgpt',
    displayName: 'ChatGPT (OpenAI)',
    plans: [
      { name: 'Free', pricePerSeat: 0, isCustom: false, isApiDirect: false },
      { name: 'Plus', pricePerSeat: 20, isCustom: false, isApiDirect: false },
      { name: 'Team', pricePerSeat: 30, isCustom: false, isApiDirect: false },
      { name: 'Enterprise', pricePerSeat: null, isCustom: true, isApiDirect: false },
      { name: 'API Direct', pricePerSeat: null, isCustom: false, isApiDirect: true },
    ],
  },
  {
    toolName: 'anthropic-api',
    displayName: 'Anthropic API Direct',
    plans: [
      { name: 'API Direct', pricePerSeat: null, isCustom: false, isApiDirect: true },
    ],
  },
  {
    toolName: 'openai-api',
    displayName: 'OpenAI API Direct',
    plans: [
      { name: 'API Direct', pricePerSeat: null, isCustom: false, isApiDirect: true },
    ],
  },
  {
    toolName: 'gemini',
    displayName: 'Gemini (Google)',
    plans: [
      { name: 'Free', pricePerSeat: 0, isCustom: false, isApiDirect: false },
      { name: 'Pro', pricePerSeat: 20, isCustom: false, isApiDirect: false },
      { name: 'Ultra', pricePerSeat: null, isCustom: true, isApiDirect: false },
      { name: 'API Direct', pricePerSeat: null, isCustom: false, isApiDirect: true },
    ],
  },
  {
    toolName: 'windsurf',
    displayName: 'Windsurf',
    plans: [
      { name: 'Free', pricePerSeat: 0, isCustom: false, isApiDirect: false },
      { name: 'Pro', pricePerSeat: 15, isCustom: false, isApiDirect: false },
      { name: 'Team', pricePerSeat: 35, isCustom: false, isApiDirect: false },
    ],
  },
]

export function getPricingForTool(toolName: string): ToolPricing | undefined {
  return PRICING_DATA.find((t) => t.toolName === toolName)
}

export function getPlanPrice(toolName: string, planName: string): number | null {
  const tool = getPricingForTool(toolName)
  if (!tool) return null
  const plan = tool.plans.find((p) => p.name === planName)
  return plan?.pricePerSeat ?? null
}
