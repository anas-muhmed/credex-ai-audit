# Prompts

## Anthropic API Summary Prompt

Used in `app/api/summary/route.ts`.

Model: `claude-sonnet-4-20250514`
Max tokens: 256

```
You are an expert in SaaS cost optimization for software teams. A startup has submitted their AI tool spend for auditing. Write exactly one paragraph (~100 words) summarizing the audit findings in a direct, professional tone. Do not use bullet points. Focus on the total savings opportunity, the most impactful recommendation, and one sentence of encouragement.

Tool spend data:
{tool_summary}

Total monthly savings identified: ${total_monthly_savings}
Total annual savings identified: ${total_annual_savings}

Write the paragraph now:
```

### Fallback template (used when Anthropic API call fails)

```
Based on your current AI tool spend of ${total}/month across {n} tools, your team has an opportunity to save ${savings}/month by optimizing your plan selection and eliminating redundant tools. The biggest opportunity is {top_tool}.
```
