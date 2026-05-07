export type ToolName =
  | 'cursor'
  | 'github-copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic-api'
  | 'openai-api'
  | 'gemini'
  | 'windsurf'

export interface ToolInput {
  tool: ToolName
  plan: string
  seats: number
  monthlySpend: number
  useCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed'
}

export interface AuditResult {
  tool: string
  currentPlan: string
  currentMonthlyCost: number
  recommendation: string
  recommendedAction: string
  monthlySavings: number
  annualSavings: number
  reasoning: string
  isOptimal: boolean
}

export interface AuditOutput {
  totalMonthlySavings: number
  totalAnnualSavings: number
  isHighSavings: boolean
  toolResults: AuditResult[]
}

export interface AuditRecord {
  id: string
  slug: string
  tool_inputs: ToolInput[]
  audit_results: AuditOutput
  ai_summary: string | null
  total_monthly_savings: number
  total_annual_savings: number
  created_at: string
}

export interface LeadRecord {
  id: string
  audit_id: string
  email: string
  company_name: string | null
  role: string | null
  team_size: string | null
  created_at: string
}

export interface AuditApiRequest {
  toolInputs: ToolInput[]
}

export interface AuditApiResponse {
  slug: string
  auditResult: AuditOutput
}

export interface SummaryApiRequest {
  toolInputs: ToolInput[]
  auditResult: AuditOutput
}

export interface SummaryApiResponse {
  summary: string
}

export interface CaptureApiRequest {
  auditId: string
  slug: string
  email: string
  companyName?: string
  role?: string
  teamSize?: string
}

export interface CaptureApiResponse {
  success: boolean
}

export interface PlanPricing {
  name: string
  pricePerSeat: number | null
  isCustom: boolean
  isApiDirect: boolean
}

export interface ToolPricing {
  toolName: ToolName
  displayName: string
  plans: PlanPricing[]
}
