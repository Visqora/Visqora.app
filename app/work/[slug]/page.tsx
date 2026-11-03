import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button, CheckList, CTA, SiteShell } from '@/components/site'
import { getProject, projects } from '@/lib/projects'
import { Asset } from '@/components/asset'
import { TECH_LOGO } from '@/lib/tech'
import { createPageMetadata, siteUrl } from '@/lib/metadata'
import { JsonLd, breadcrumbsJsonLd } from '@/components/json-ld'

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return createPageMetadata({ title: project.title, description: project.summary, path: `/work/${slug}` })
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.summary,
        url: `${siteUrl}/work/${slug}`,
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
        creator: { '@type': 'Organization', name: 'Visqora Technologies', url: siteUrl },
      },
      breadcrumbsJsonLd([
        { name: 'Home', url: siteUrl },
        { name: 'Work', url: `${siteUrl}/work` },
        { name: project.title, url: `${siteUrl}/work/${slug}` },
      ]),
    ],
  }

  return <SiteShell>
    <JsonLd data={jsonLd} />
    <section className="relative -mt-[76px] overflow-hidden bg-[#0b1437] px-5 pb-20 pt-[calc(76px+4rem)] text-white sm:pb-28 sm:pt-[calc(76px+6rem)]">
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(19,184,224,.22),transparent_70%),radial-gradient(40%_50%_at_5%_100%,rgba(59,88,236,.25),transparent_70%)]" />
      <div className="page-in relative mx-auto max-w-7xl lg:px-8">
        <Link href="/work" className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-white/70 transition hover:border-[#13b8e0] hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> All work</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[.22em] text-[#13b8e0]">{project.label}</p>
        <h1 className="mt-4 text-[clamp(48px,8vw,112px)] font-extrabold leading-[.95] tracking-[-.06em]">{project.title}</h1>
        <p className="mt-7 max-w-3xl text-xl leading-8 text-white/65">{project.summary}</p>
        {project.liveUrl && <div className="mt-9"><Button href={project.liveUrl} external variant="light">Open live product</Button></div>}
      </div>
    </section>
    <main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid items-start gap-16 lg:grid-cols-[.7fr_1.3fr]">
      <aside className="lg:sticky lg:top-28"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#3b58ec]">Technology</p><div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#0b1437] bg-white py-1 pl-2 pr-3 text-xs font-bold text-[#0b1437] shadow-[2px_2px_0_#0b1437]">{TECH_LOGO[tag] && <Asset name={TECH_LOGO[tag]} className="h-5 w-5" />}{tag}</span>)}</div></aside>
      <div className="space-y-14">
        {[['01', 'The problem', project.problem], ['02', 'Our approach', project.solution]].map(([n, title, body]) => <div key={n} className="grid gap-4 sm:grid-cols-[64px_1fr]"><span className="font-heading text-4xl font-extrabold tracking-[-.06em] text-[#13b8e0]">{n}</span><div><h2 className="text-3xl font-extrabold tracking-[-.045em]">{title}</h2><p className="mt-5 text-lg leading-8 text-[#5b6478]">{body}</p></div></div>)}
        <div className="glow rounded-3xl border-2 border-[#0b1437] bg-[#fff] p-8 shadow-[6px_6px_0_#0b1437]"><h3 className="text-xl font-extrabold">What it <span className="font-accent text-[#3b58ec]">enables</span></h3><div className="mt-6"><CheckList items={project.outcomes} /></div></div>
      </div>
    </div></main>
    <CTA title="Have a product problem worth solving?" text="Tell us what your team needs to make clearer, safer or faster." />
  </SiteShell>
}
