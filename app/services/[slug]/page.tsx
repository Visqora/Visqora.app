import { notFound } from 'next/navigation'
import { SiteShell, CTA, Button } from '@/components/site'
import { PageHero } from '@/app/pages'
import { Asset, type AssetName } from '@/components/asset'
import { getService, services } from '@/lib/services'
import { createPageMetadata, siteUrl } from '@/lib/metadata'
import { JsonLd, breadcrumbsJsonLd } from '@/components/json-ld'

const path: [string, AssetName][] = [['A focused discovery session', 'team'], ['A clear, testable first release', 'ab-test'], ['Weekly progress you can see', 'bar-growth'], ['A foundation ready to grow', 'sprout']]

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })) }

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
  return <SiteShell>
    <JsonLd data={jsonLd} />
    <PageHero eyebrow={service.title} asset={service.asset} title={service.promise} text={service.description}><Button href="/contact">Discuss your project</Button><Button href="/services" variant="secondary">All services</Button></PageHero>
    <main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid items-start gap-16 lg:grid-cols-[.8fr_1.2fr]">
      <div className="glow rounded-[2rem] border-2 border-[#0b1437] bg-white p-8 shadow-[8px_8px_0_#0b1437] lg:sticky lg:top-28">
        <div className="grid h-24 w-24 place-items-center rounded-3xl border-2 border-[#0b1437] bg-[#edf9fc] shadow-[4px_4px_0_#0b1437]"><Asset name={service.asset} className="h-18 w-18" /></div>
        <h2 className="mt-10 text-3xl font-extrabold tracking-[-.045em]">What&apos;s included</h2>
        <ul className="mt-7 space-y-3">{service.deliverables.map(([item, icon]) => <li key={item} className="flex items-center gap-4 rounded-2xl border-2 border-[#0b1437]/10 bg-white/40 p-3 font-semibold text-[#0b1437]"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white"><Asset name={icon} className="h-9 w-9" /></span>{item}</li>)}</ul>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#3b58ec]">A practical path forward</p>
        <h2 data-split className="mt-4 text-4xl font-extrabold tracking-[-.045em] sm:text-5xl">Built around your people, <span className="font-accent text-[#3b58ec]">not a template.</span></h2>
        <div data-stagger className="mt-10 grid gap-5 sm:grid-cols-2">{path.map(([x, icon], i) => <div key={x} className="card group flex min-h-48 flex-col rounded-2xl p-6"><div className="flex items-start justify-between"><span className="font-heading text-4xl font-extrabold tracking-[-.06em] text-[#13b8e0]">0{i + 1}</span><Asset name={icon} className="h-14 w-14 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" /></div><p className="mt-auto pt-6 text-lg font-extrabold tracking-[-.03em]">{x}</p></div>)}</div>
      </div>
    </div></main>
    <CTA title="Could this help your team?" text="Bring us the workflow, question or idea. We'll help you find the right first step." />
  </SiteShell>
}
