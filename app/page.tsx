import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BarChart3, Bot, GitBranch, Radar, Server, ShieldCheck, Smartphone, Workflow } from 'lucide-react'
import { Hero } from '@/components/hero'
import { CTA, SectionHeading, SiteShell } from '@/components/site'
import { projects } from '@/lib/projects'

const services = [
  { slug: 'web-mobile-apps', title: 'Web & mobile apps', short: 'Digital products people enjoy using.', icon: Smartphone },
  { slug: 'ai-solutions', title: 'AI solutions', short: 'Useful AI, connected to your workflow.', icon: Bot },
  { slug: 'data-analytics', title: 'Data & analytics', short: 'Clarity from the data you already have.', icon: BarChart3 },
  { slug: 'automation', title: 'Workflow automation', short: 'Fewer repetitive tasks. More momentum.', icon: Workflow },
  { slug: 'backend-cloud', title: 'Backend, APIs & cloud', short: 'A dependable foundation for growth.', icon: Server },
]

const problems = [
  'My team wastes hours on manual, repetitive work.',
  'We have data everywhere but no clear picture.',
  'Our customers expect instant answers we cannot give.',
  'We need a product built, but do not have a tech team.',
]

function ProductVisual({ product }: { product: (typeof projects)[number] }) {
  if (product.accent === 'orange') {
    return <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#10151d] p-6"><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#ff6b2c_1px,transparent_1px),linear-gradient(90deg,#ff6b2c_1px,transparent_1px)] [background-size:32px_32px]" /><div className="relative w-full max-w-md border border-white/10 bg-[#151c26] p-5 shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="font-mono text-xs text-white/45">agent-run / trace-084</span><span className="flex items-center gap-1.5 text-xs font-bold text-[#ff7040]"><Radar className="h-3.5 w-3.5" /> Cause found</span></div><div className="mt-5 flex items-center gap-2">{[0, 1, 2, 3, 4].map((step) => <div key={step} className={`h-3 flex-1 ${step === 2 ? 'bg-[#ff7040]' : 'bg-white/15'}`} />)}</div><p className="mt-6 text-sm font-semibold text-white">Retrieval selected archived policy</p><p className="mt-2 text-xs text-white/45">Verified with counterfactual replay</p></div></div>
  }

  return <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#eafafe] p-6"><div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-[#18b8d8]/25" /><div className="absolute bottom-4 right-8 h-36 w-36 rounded-full border border-[#3049c9]/15" /><div className="relative w-full max-w-md border border-[#c8e6ec] bg-white p-5 shadow-[0_22px_55px_rgba(24,90,120,.14)]"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-[#10234f]"><ShieldCheck className="h-4 w-4 text-[#18aaca]" /> Dependency scan</span><span className="text-xs font-semibold text-[#168963]">Complete</span></div><div className="mt-5 grid grid-cols-3 gap-3"><div className="border-l-2 border-[#18b8d8] pl-3"><strong className="block text-xl text-[#10234f]">118</strong><span className="text-[11px] text-[#69758a]">packages</span></div><div className="border-l-2 border-[#f3b73f] pl-3"><strong className="block text-xl text-[#10234f]">4</strong><span className="text-[11px] text-[#69758a]">findings</span></div><div className="border-l-2 border-[#3049c9] pl-3"><strong className="block text-xl text-[#10234f]">9</strong><span className="text-[11px] text-[#69758a]">rules</span></div></div><div className="mt-5 flex items-center gap-2 text-xs text-[#69758a]"><GitBranch className="h-3.5 w-3.5 text-[#3049c9]" /> Exact dependency paths included</div></div></div>
}

export default function Home() {
  return <SiteShell><main>
    <Hero />

    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading eyebrow="Sound familiar?" title="The hard part is not always the technology." text="It is knowing what to change, where to start and who can own the outcome. That is where we come in." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{problems.map((problem, index) => <div key={problem} className="group rounded-3xl border border-[#e4e9f2] bg-white p-6 transition hover:-translate-y-1 hover:border-[#13b8e0] hover:shadow-[0_18px_45px_rgba(11,20,55,.08)]"><span className="font-heading text-4xl font-extrabold text-[#dbe4f3] group-hover:text-[#13b8e0]">0{index + 1}</span><p className="mt-8 font-heading text-lg font-bold leading-7 text-[#0b1437]">{problem}</p></div>)}</div></section>

    <section className="bg-[#f7f9fc]"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading eyebrow="What we do" title="Technology that moves the work forward." text="Start with one problem. Leave with a solution your team can actually use." /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => { const Icon = service.icon; return <Link href={`/services/${service.slug}`} key={service.slug} className={`group rounded-3xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(11,20,55,.09)] ${index === 0 ? 'lg:col-span-2' : ''}`}><div className="flex items-start justify-between"><span className="rounded-2xl bg-[#edf9fc] p-3 text-[#13b8e0]"><Icon className="h-6 w-6" /></span><ArrowUpRight className="h-5 w-5 text-[#9aa5ba] transition group-hover:text-[#3b58ec]" /></div><h3 className="mt-12 text-2xl font-bold text-[#0b1437]">{service.title}</h3><p className="mt-2 max-w-sm leading-7 text-[#5b6478]">{service.short}</p></Link> })}</div></div></section>

    <section className="bg-[#0b1437]"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading light eyebrow="How we work" title="Clear steps. No black boxes." text="You stay close to the work, with honest updates and a team that owns the details." /><div className="mt-14 grid gap-8 md:grid-cols-4">{[['01', 'Discover', 'We learn the workflow, the people and the outcome that matters.'], ['02', 'Design', 'We make the solution tangible before we make it expensive.'], ['03', 'Build', 'We ship in focused increments and keep you in the loop.'], ['04', 'Launch & support', 'We make the handover smooth and stay around to improve it.']].map(([number, title, description]) => <div key={number} className="border-t border-white/20 pt-6"><span className="text-sm font-bold text-[#13b8e0]">{number}</span><h3 className="mt-5 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{description}</p></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading eyebrow="Visqora products" title="Built in the open. Made to be useful." text="Explore the products our team is actively designing, engineering and validating." /><Link href="https://github.com/orgs/Visqora/repositories" target="_blank" rel="noreferrer" className="font-bold text-[#3b58ec]">View on GitHub <ArrowUpRight className="ml-1 inline h-4 w-4" /></Link></div><div className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((product) => <article key={product.slug} className="group overflow-hidden rounded-3xl border border-[#e4e9f2] bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(11,20,55,.1)]"><ProductVisual product={product} /><div className="p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#3b58ec]">{product.label}</p><h3 className="mt-3 text-3xl font-bold">{product.title}</h3><p className="mt-3 leading-7 text-[#5b6478]">{product.summary}</p><div className="mt-5 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f0f3f8] px-3 py-1 text-xs font-semibold text-[#5b6478]">{tag}</span>)}</div><div className="mt-7 flex flex-wrap gap-5"><Link href={`/work/${product.slug}`} className="font-bold text-[#3b58ec]">Product story <ArrowRight className="ml-1 inline h-4 w-4" /></Link><Link href={product.githubUrl} target="_blank" rel="noreferrer" className="font-bold text-[#5b6478]">Source code <ArrowUpRight className="ml-1 inline h-4 w-4" /></Link></div></div></article>)}</div></section>

    <section className="border-y border-[#e4e9f2] bg-[#f7f9fc]"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-5 py-9 text-sm font-bold text-[#7e899e] lg:px-8"><span>React</span><span>Next.js</span><span>TypeScript</span><span>Python</span><span>FastAPI</span><span>PostgreSQL</span><span>Machine Learning</span><span>VS Code</span></div></section>
    <CTA />
  </main></SiteShell>
}
