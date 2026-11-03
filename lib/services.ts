export const serviceDetails = {
  'web-mobile-apps': {
    title: 'Web & mobile apps',
    promise: 'Products that make your next big idea real.',
    description: 'From a focused MVP to a mature customer portal, we design and build software that fits the way your business actually works.',
    deliverables: ['Marketing websites and web apps', 'Admin panels and internal tools', 'Cross-platform mobile experiences'],
  },
  'ai-solutions': {
    title: 'AI solutions',
    promise: 'AI that does more than impress in a demo.',
    description: 'We connect practical AI to the places your team already works — so it saves time, improves service and keeps learning.',
    deliverables: ['Chatbots and WhatsApp assistants', 'Document intelligence and extraction', 'Custom ML models and AI integrations'],
  },
  'data-analytics': {
    title: 'Data & analytics',
    promise: 'A clearer picture of what moves your business.',
    description: 'Turn scattered data into decisions with reliable pipelines, useful dashboards and reporting that arrives when you need it.',
    deliverables: ['Data pipelines and integrations', 'KPI dashboards', 'Reporting automation'],
  },
  automation: {
    title: 'Workflow automation',
    promise: 'Give your team back the hours that matter.',
    description: 'We map the busywork, connect the right tools and build dependable automations that keep your operation moving.',
    deliverables: ['Process automation', 'Tool-to-tool integrations', 'Scheduled jobs and alerts'],
  },
  'backend-cloud': {
    title: 'Backend, APIs & cloud',
    promise: 'The infrastructure your product can grow on.',
    description: 'Secure APIs, thoughtful data models and cloud deployments that stay fast, maintainable and ready for what comes next.',
    deliverables: ['REST and GraphQL APIs', 'Databases and data architecture', 'Cloud deployment and DevOps'],
  },
} as const

export type ServiceSlug = keyof typeof serviceDetails

export const serviceSlugs = Object.keys(serviceDetails) as ServiceSlug[]

export function getService(slug: string) {
  return serviceDetails[slug as ServiceSlug]
}
