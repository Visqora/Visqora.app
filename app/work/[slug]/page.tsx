import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { CheckList, CTA, SiteShell } from '@/components/site'
import { getProject, projects } from '@/lib/projects'
import { createPageMetadata } from '@/lib/metadata'

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

  return <SiteShell><section className="bg-[#0b1437] px-5 py-20 text-white sm:py-28"><div className="mx-auto max-w-7xl lg:px-8"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#13b8e0]">{project.label}</p><h1 className="mt-6 text-5xl font-extrabold sm:text-7xl">{project.title}</h1><p className="mt-7 max-w-3xl text-xl leading-8 text-white/65">{project.summary}</p>{project.liveUrl && <div className="mt-9 flex flex-wrap gap-3"><Link href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white">Open live product <ArrowUpRight className="ml-1 inline h-4 w-4" /></Link></div>}</div></section><main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]"><aside><p className="text-xs font-bold uppercase tracking-[.2em] text-[#3b58ec]">Technology</p><div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f0f3f8] px-3 py-1 text-xs font-semibold text-[#5b6478]">{tag}</span>)}</div></aside><div className="space-y-14"><div><h2 className="text-3xl font-extrabold">The problem</h2><p className="mt-5 text-lg leading-8 text-[#5b6478]">{project.problem}</p></div><div><h2 className="text-3xl font-extrabold">Our approach</h2><p className="mt-5 text-lg leading-8 text-[#5b6478]">{project.solution}</p></div><div className="rounded-3xl bg-[#f7f9fc] p-8"><h3 className="text-xl font-bold">What it enables</h3><div className="mt-6"><CheckList items={project.outcomes} /></div></div></div></div></main><CTA title="Have a product problem worth solving?" text="Tell us what your team needs to make clearer, safer or faster." /></SiteShell>
}
