import { notFound } from 'next/navigation'
import { SiteShell, CTA, CheckList } from '@/components/site'
import { PageHero } from '@/app/pages'
import { ArrowRight, Bot, Smartphone, BarChart3, Workflow, Server } from 'lucide-react'
import { createPageMetadata, siteUrl } from '@/lib/metadata'
import { serviceDetails, serviceSlugs, getService, type ServiceSlug } from '@/lib/services'
import { JsonLd, breadcrumbsJsonLd } from '@/components/json-ld'

const serviceIcons: Record<ServiceSlug, typeof Smartphone> = {
  'web-mobile-apps': Smartphone,
  'ai-solutions': Bot,
  'data-analytics': BarChart3,
  automation: Workflow,
  'backend-cloud': Server,
}

export function generateStaticParams() { return serviceSlugs.map(slug => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return createPageMetadata({ title: service.title, description: service.description, path: `/services/${slug}` })
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()
  const Icon = serviceIcons[slug as ServiceSlug]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description: service.description,
        url: `${siteUrl}/services/${slug}`,
        provider: { '@type': 'Organization', name: 'Visqora Technologies', url: siteUrl },
      },
      breadcrumbsJsonLd([
        { name: 'Home', url: siteUrl },
        { name: 'Services', url: `${siteUrl}/services` },
        { name: service.title, url: `${siteUrl}/services/${slug}` },
      ]),
    ],
  }
  return <SiteShell><JsonLd data={jsonLd} /><PageHero eyebrow="Service" title={service.promise} text={service.description} /><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]"><div><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#edf9fc] text-[#13b8e0]"><Icon className="h-10 w-10" /></div><h2 className="mt-10 text-3xl font-extrabold">What&apos;s included</h2><div className="mt-7"><CheckList items={[...service.deliverables]} /></div></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#3b58ec]">A practical path forward</p><h2 className="mt-4 text-3xl font-extrabold">Built around your people, not a template.</h2><div className="mt-10 grid gap-5 sm:grid-cols-2">{['A focused discovery session','A clear, testable first release','Weekly progress you can see','A foundation ready to grow'].map((x, i) => <div key={x} className="rounded-2xl border border-[#e4e9f2] p-5"><span className="text-sm font-bold text-[#13b8e0]">0{i + 1}</span><p className="mt-4 font-bold">{x}</p></div>)}</div><a href="/contact" className="mt-8 inline-block rounded-full bg-[#3b58ec] px-6 py-3.5 font-bold text-white">Discuss your project <ArrowRight className="ml-2 inline h-4 w-4" /></a></div></div></main><CTA title="Could this help your team?" text="Bring us the workflow, question or idea. We&apos;ll help you find the right first step." /></SiteShell>
}
