import type { AssetName } from '@/components/asset'

// Single source for the five services (home, /services, /services/[slug], footer).
export const services: { slug: string; title: string; short: string; promise: string; description: string; asset: AssetName; deliverables: [string, AssetName][] }[] = [
  { slug: 'web-mobile-apps', title: 'Web & mobile apps', short: 'Digital products people enjoy using.', asset: 'mobile-code', promise: 'Products that make your next big idea real.', description: 'From a focused MVP to a mature customer portal, we design and build software that fits the way your business actually works.', deliverables: [['Marketing websites and web apps', 'browser-text'], ['Admin panels and internal tools', 'cards'], ['Cross-platform mobile experiences', 'devices']] },
  { slug: 'ai-solutions', title: 'AI solutions', short: 'Useful AI, connected to your workflow.', asset: 'robot', promise: 'AI that does more than impress in a demo.', description: 'We connect practical AI to the places your team already works — so it saves time, improves service and keeps learning.', deliverables: [['Chatbots and WhatsApp assistants', 'chat'], ['Document intelligence and extraction', 'docs-check'], ['Custom ML models and AI integrations', 'brain']] },
  { slug: 'data-analytics', title: 'Data & analytics', short: 'Clarity from the data you already have.', asset: 'laptop-chart', promise: 'A clearer picture of what moves your business.', description: 'Turn scattered data into decisions with reliable pipelines, useful dashboards and reporting that arrives when you need it.', deliverables: [['Data pipelines and integrations', 'data-lake'], ['KPI dashboards', 'pie-chart'], ['Reporting automation', 'monitor-pulse']] },
  { slug: 'automation', title: 'Workflow automation', short: 'Fewer repetitive tasks. More momentum.', asset: 'gear', promise: 'Give your team back the hours that matter.', description: 'We map the busywork, connect the right tools and build dependable automations that keep your operation moving.', deliverables: [['Process automation', 'infinity'], ['Tool-to-tool integrations', 'cloud-network'], ['Scheduled jobs and alerts', 'toggle']] },
  { slug: 'backend-cloud', title: 'Backend, APIs & cloud', short: 'A dependable foundation for growth.', asset: 'server', promise: 'The infrastructure your product can grow on.', description: 'Secure APIs, thoughtful data models and cloud deployments that stay fast, maintainable and ready for what comes next.', deliverables: [['REST and GraphQL APIs', 'api-cloud'], ['Databases and data architecture', 'database'], ['Cloud deployment and DevOps', 'cloud-upload']] },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

// Slug-keyed views of the same data, used by the sitemap and the per-service OG image / JSON-LD.
export type ServiceSlug = (typeof services)[number]['slug']
export const serviceSlugs = services.map((s) => s.slug)
export const serviceDetails = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, (typeof services)[number]>
