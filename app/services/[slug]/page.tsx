import { notFound } from 'next/navigation'
import { SiteShell, CTA, CheckList } from '@/components/site'
import { PageHero } from '@/app/pages'
import { ArrowRight, Bot, Smartphone, BarChart3, Workflow, Server } from 'lucide-react'

const serviceData = {
  'web-mobile-apps': { title: 'Web & mobile apps', promise: 'Products that make your next big idea real.', description: 'From a focused MVP to a mature customer portal, we design and build software that fits the way your business actually works.', icon: Smartphone, deliverables: ['Marketing websites and web apps', 'Admin panels and internal tools', 'Cross-platform mobile experiences'] },
  'ai-solutions': { title: 'AI solutions', promise: 'AI that does more than impress in a demo.', description: 'We connect practical AI to the places your team already works — so it saves time, improves service and keeps learning.', icon: Bot, deliverables: ['Chatbots and WhatsApp assistants', 'Document intelligence and extraction', 'Custom ML models and AI integrations'] },
  'data-analytics': { title: 'Data & analytics', promise: 'A clearer picture of what moves your business.', description: 'Turn scattered data into decisions with reliable pipelines, useful dashboards and reporting that arrives when you need it.', icon: BarChart3, deliverables: ['Data pipelines and integrations', 'KPI dashboards', 'Reporting automation'] },
  automation: { title: 'Workflow automation', promise: 'Give your team back the hours that matter.', description: 'We map the busywork, connect the right tools and build dependable automations that keep your operation moving.', icon: Workflow, deliverables: ['Process automation', 'Tool-to-tool integrations', 'Scheduled jobs and alerts'] },
  'backend-cloud': { title: 'Backend, APIs & cloud', promise: 'The infrastructure your product can grow on.', description: 'Secure APIs, thoughtful data models and cloud deployments that stay fast, maintainable and ready for what comes next.', icon: Server, deliverables: ['REST and GraphQL APIs', 'Databases and data architecture', 'Cloud deployment and DevOps'] },
} as const

export function generateStaticParams() { return Object.keys(serviceData).map(slug => ({ slug })) }

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceData[slug as keyof typeof serviceData]
  if (!service) notFound()
  const Icon = service.icon
  return <SiteShell><PageHero eyebrow="Service" title={service.promise} text={service.description} /><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]"><div><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#edf9fc] text-[#13b8e0]"><Icon className="h-10 w-10" /></div><h2 className="mt-10 text-3xl font-extrabold">What&apos;s included</h2><div className="mt-7"><CheckList items={[...service.deliverables]} /></div></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#3b58ec]">A practical path forward</p><h2 className="mt-4 text-3xl font-extrabold">Built around your people, not a template.</h2><div className="mt-10 grid gap-5 sm:grid-cols-2">{['A focused discovery session','A clear, testable first release','Weekly progress you can see','A foundation ready to grow'].map((x, i) => <div key={x} className="rounded-2xl border border-[#e4e9f2] p-5"><span className="text-sm font-bold text-[#13b8e0]">0{i + 1}</span><p className="mt-4 font-bold">{x}</p></div>)}</div><a href="/contact" className="mt-8 inline-block rounded-full bg-[#3b58ec] px-6 py-3.5 font-bold text-white">Discuss your project <ArrowRight className="ml-2 inline h-4 w-4" /></a></div></div></main><CTA title="Could this help your team?" text="Bring us the workflow, question or idea. We&apos;ll help you find the right first step." /></SiteShell>
}
