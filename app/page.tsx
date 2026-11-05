import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Asset, type AssetName } from '@/components/asset'
import { ProductCard } from '@/components/product-visual'
import { Hero } from '@/components/hero'
import { JsonLd } from '@/components/json-ld'
import { Button, CTA, SectionHeading, SiteShell } from '@/components/site'
import { projects } from '@/lib/projects'
import { services } from '@/lib/services'
import { TECH_LOGO } from '@/lib/tech'
import { createPageMetadata, siteUrl } from '@/lib/metadata'

export const metadata = {
  ...createPageMetadata({
    title: 'Visqora Technologies | Vision at the core',
    description: 'Visqora Technologies builds AI-powered solutions, intelligent automation systems and modern web applications for businesses.',
    path: '/',
  }),
  title: { absolute: 'Visqora Technologies | Vision at the core' },
}

const identityJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Visqora Technologies',
      legalName: 'Visqora Technologies',
      url: `${siteUrl}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/visqora-emblem.png`,
        width: 474,
        height: 527,
      },
      description: 'Visqora Technologies builds AI-powered business solutions, automation systems and modern web applications.',
      email: 'visqora@gmail.com',
      slogan: 'Vision at the core.',
      address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
      sameAs: ['https://linkedin.com/company/visqora-technologies', 'https://github.com/Visqora'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Visqora Technologies',
      alternateName: 'visqora.app',
      url: `${siteUrl}/`,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  ],
}

const problems: [string, AssetName][] = [
  ['My team wastes hours on manual, repetitive work.', 'wrench'],
  ['We have data everywhere but no clear picture.', 'folder'],
  ['Our customers expect instant answers we cannot give.', 'headset'],
  ['We need a product built, but do not have a tech team.', 'developer'],
]

const steps: [string, string, string, AssetName][] = [
  ['01', 'Discover', 'We learn the workflow, the people and the outcome that matters.', 'lightbulb'],
  ['02', 'Design', 'We make the solution tangible before we make it expensive.', 'pen-tool'],
  ['03', 'Build', 'We ship in focused increments and keep you in the loop.', 'cubes'],
  ['04', 'Launch & support', 'We make the handover smooth and stay around to improve it.', 'rocket'],
]

const solutions: [string, AssetName][] = [
  ['AI & machine learning', 'set2/ml-chip'], ['Generative AI', 'sparkles'], ['AI chatbots', 'set2/chat-dots'], ['Voice AI', 'set2/microphone'],
  ['Document AI', 'set2/pdf'], ['CRM', 'set2/crm'], ['ERP', 'set2/erp'], ['Sales funnels', 'set2/funnel'],
  ['E-commerce', 'set2/cart'], ['Payments & billing', 'set2/credit-card'], ['Online stores & POS', 'set2/storefront'], ['Logistics & delivery', 'set2/delivery-truck'],
  ['Inventory management', 'set2/package'], ['Websites', 'set2/website'], ['Mobile apps', 'set2/mobile-apps'], ['Dashboards & BI', 'set2/search-analytics'],
  ['Project & HR tools', 'set2/kanban'], ['Booking & scheduling', 'set2/calendar'], ['APIs & integrations', 'set2/plug'], ['Cloud & DevOps', 'set2/cloud-gear'],
]

const features: [string, [string, AssetName][]][] = [
  ['AI & automation', [['Neural networks', 'set2/neural-net'], ['Multilingual AI', 'set2/translate'], ['Speech-to-text', 'set2/soundwave'], ['AI support agents', 'set2/support-agent'], ['Live chat', 'set2/chat-bubbles'], ['Workflow sync', 'set2/sync'], ['Custom scripts', 'set2/code-gear']]],
  ['Business operations', [['Leads & contacts', 'set2/contact-card'], ['Approvals', 'set2/org-chart'], ['Reports', 'set2/report'], ['Tasks & checklists', 'set2/clipboard-check'], ['Goals & KPIs', 'set2/target'], ['Alerts', 'set2/bell'], ['Location tracking', 'set2/map-pin']]],
  ['Marketing & growth', [['Email campaigns', 'set2/email'], ['Announcements', 'set2/megaphone'], ['Growth analytics', 'set2/growth-chart'], ['Loyalty & rewards', 'set2/badge-check'], ['Customer portals', 'set2/users']]],
  ['Design & UX', [['Wireframes', 'set2/design-edit'], ['UX research', 'set2/ux'], ['UI design', 'set2/ui'], ['Brand systems', 'set2/palette'], ['Design systems', 'set2/stack-sparkle'], ['Video & media', 'set2/video-camera'], ['Admin settings', 'set2/sliders']]],
  ['Security & access', [['Encryption', 'set2/shield-lock'], ['Biometric login', 'set2/fingerprint'], ['SSO & API keys', 'set2/key'], ['Privacy controls', 'set2/user-shield'], ['Roles & permissions', 'set2/hierarchy']]],
  ['Files & integrations', [['Docs', 'set2/document'], ['Excel', 'set2/excel'], ['PowerPoint', 'set2/powerpoint'], ['Word', 'set2/word'], ['Plugins', 'set2/puzzle'], ['Webhooks', 'set2/share-nodes'], ['Version control', 'set2/git'], ['Admin panels', 'set2/browser'], ['Microservices', 'set2/stack'], ['Packaged releases', 'set2/box'], ['Performance tuning', 'set2/speedometer']]],
]

const capabilities: [string, AssetName][] = [['AI', 'ai-chip'], ['Automation', 'gear'], ['Web apps', 'browser-layout'], ['Mobile', 'devices'], ['Data', 'pie-chart'], ['Cloud', 'cloud-image'], ['APIs', 'antenna']]

const logos = (names: string[]) => names.map((t): [string, string, AssetName] => [t, '', TECH_LOGO[t]])
const stack: [string, string, AssetName][][] = [
  [...logos(['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Solidity']), ['Machine learning', 'AI models', 'chip']],
  [...logos(['Docker', 'Kubernetes', 'GitHub', 'Git', 'Figma', 'VS Code']), ['Microservices', 'Architecture', 'cube'], ['Code review', 'Every PR', 'git-diamond'], ['Cloud storage', 'Infra', 'cloud-download']],
]

// Two rows of logo pills drifting in opposite directions, edges faded. Two copies per row so the -50% loop is seamless.
function TechStack() {
  const all = stack.flat().map(([name]) => name).join(', ')
  return <section aria-label={`Tech stack: ${all}`} className="overflow-hidden border-t-2 border-[#0b1437] bg-white py-20">
    <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Tech stack" title="Proven tools, *picked for the job.*" text="Modern, well-supported technology your team can hire for and grow with — no exotic lock-in." /></div>
    <div className="mt-12 space-y-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">{stack.map((row, r) =>
      <div key={r} data-marquee={r ? 52 : 44} {...(r ? { 'data-marquee-reverse': '' } : {})} className="flex w-max py-2">{[0, 1].map((copy) => <div key={copy} aria-hidden className="flex shrink-0 gap-5 pr-5">{row.map(([name, note, icon]) =>
        <span key={name} className="glow inline-flex items-center gap-3 rounded-2xl border-2 border-[#0b1437] bg-white py-2.5 pl-2.5 pr-5 shadow-[4px_4px_0_#0b1437]"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#edf9fc]"><Asset name={icon} className="h-9 w-9" /></span><span><b className="block font-heading text-lg font-extrabold leading-tight tracking-[-.03em] text-[#0b1437]">{name}</b>{note && <span className="text-xs font-semibold text-[#5b6478]">{note}</span>}</span></span>)}</div>)}</div>)}</div>
  </section>
}

// Two copies side by side; GSAP slides the track -50% on loop so the seam never shows. Static without JS or with reduced motion.
function Marquee({ items, className, iconClass, speed }: { items: [string, AssetName][]; className: string; iconClass: string; speed: number }) {
  return <section aria-label={items.map(([label]) => label).join(', ')} className={`overflow-hidden ${className}`}><div data-marquee={speed} className="flex w-max">{[0, 1].map((copy) => <div key={copy} aria-hidden className="flex shrink-0 items-center">{items.map(([label, icon]) => <span key={label} className="flex items-center gap-3 pr-10"><span className={`grid shrink-0 place-items-center rounded-full border-2 border-[#0b1437] bg-white ${iconClass}`}><Asset name={icon} className="h-[70%] w-[70%]" /></span>{label}</span>)}</div>)}</div></section>
}

export default function Home() {
  return <><JsonLd data={identityJsonLd} /><SiteShell><main>
    <Hero />
    <Marquee speed={26} items={capabilities} iconClass="h-11 w-11 sm:h-14 sm:w-14" className="border-y-2 border-[#0b1437] bg-[#13b8e0] py-4 font-heading text-2xl font-extrabold uppercase tracking-[-.03em] text-[#0b1437] sm:text-4xl" />

    <section aria-labelledby="about-visqora" className="border-b-2 border-[#0b1437] bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:px-8"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-[#3b58ec]">About Visqora Technologies</p><h2 id="about-visqora" className="max-w-4xl text-3xl font-extrabold leading-[1.05] tracking-[-.045em] text-[#0b1437] sm:text-5xl">AI solutions, web development and automation <span className="font-accent text-[#3b58ec]">built around your business.</span></h2></div><div><p className="text-lg leading-8 text-[#5b6478]">Visqora Technologies turns operational challenges into practical software, intelligent workflows and digital products teams can rely on.</p><div className="mt-7 flex flex-wrap gap-4"><Button href="/about" variant="secondary">About Visqora Technologies</Button><Button href="https://linkedin.com/company/visqora-technologies" external variant="secondary">LinkedIn</Button></div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading eyebrow="Sound familiar?" title="The hard part is not always *the technology.*" text="It is knowing what to change, where to start and who can own the outcome. That is where we come in." /><div data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{problems.map(([problem, icon], index) => <div key={problem} className="card group flex min-h-64 flex-col rounded-3xl p-6"><div className="flex items-start justify-between"><span className="font-heading text-5xl font-extrabold tracking-[-.06em] text-[#13b8e0]">0{index + 1}</span><Asset name={icon} className="h-16 w-16 transition duration-500 group-hover:-rotate-6 group-hover:scale-110" /></div><p className="mt-auto pt-8 font-heading text-lg font-bold leading-7 text-[#0b1437]">{problem}</p></div>)}</div></section>

    <section className="bg-[#fff]"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading eyebrow="What we do" title="Technology that *moves the work* forward." text="Start with one problem. Leave with a solution your team can actually use." /><div data-stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <Link href={`/services/${service.slug}`} key={service.slug} className={`card group rounded-3xl p-7 ${index === 0 ? 'lg:col-span-2' : ''}`}><div className="flex items-start justify-between"><span className="grid h-20 w-20 place-items-center rounded-2xl border-2 border-[#0b1437] bg-[#edf9fc] transition duration-300 group-hover:-rotate-6 group-hover:bg-[#13b8e0]"><Asset name={service.asset} className="h-[4.25rem] w-[4.25rem]" /></span><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0b1437]/15 text-[#0b1437] transition duration-300 group-hover:-rotate-45 group-hover:border-[#0b1437] group-hover:bg-[#0b1437] group-hover:text-white"><ArrowUpRight className="h-4 w-4" /></span></div><h3 className="mt-10 text-2xl font-extrabold tracking-[-.04em] text-[#0b1437]">{service.title}</h3><p className="mt-2 max-w-sm leading-7 text-[#5b6478]">{service.short}</p><div className="mt-5 flex gap-2">{service.deliverables.map(([label, icon]) => <span key={label} title={label} className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff]"><Asset name={icon} alt={label} className="h-7 w-7" /></span>)}</div></Link>)}</div></div></section>

    <section data-glow className="glow-section relative overflow-hidden bg-[#0b1437]"><div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-[.35] mix-blend-overlay" /><div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading light eyebrow="How we work" title="Clear steps. *No black boxes.*" text="You stay close to the work, with honest updates and a team that owns the details." /><div aria-hidden className="mt-14 hidden h-px bg-white/10 lg:motion-safe:block"><div data-hscroll-bar className="h-full origin-left bg-[#13b8e0]" /></div><div data-hscroll className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6 lg:motion-safe:flex">{steps.map(([number, title, description, icon]) => <div key={number} className="glow border-t border-white/20 pt-6 lg:motion-safe:w-[min(420px,34vw)] lg:motion-safe:shrink-0 lg:rounded-3xl lg:border lg:border-white/10 lg:bg-white/[.03] lg:p-8 lg:backdrop-blur"><div className="flex items-start justify-between"><span className="font-heading text-5xl font-extrabold tracking-[-.06em] text-[#13b8e0] lg:text-7xl">{number}</span><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-[4px_4px_0_#13b8e0] lg:h-20 lg:w-20"><Asset name={icon} className="h-12 w-12 lg:h-14 lg:w-14" /></span></div><h3 className="mt-5 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{description}</p></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading eyebrow="Visqora Technologies products" title="Products made to be *useful.*" text="Explore the products our team is actively designing, engineering and validating." /></div><div data-stagger className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((product) => <ProductCard key={product.slug} product={product} heading="h3" />)}</div></section>

    <section className="bg-[#fff]"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading eyebrow="What we build" title="Software for *every part* of the business." text="AI, ML, CRM, ERP, chatbots, web and mobile — built around how your team actually works." /><div data-stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">{solutions.map(([label, icon]) => <div key={label} className="card group flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#fff] transition duration-300 group-hover:-rotate-6 group-hover:bg-[#edf9fc] sm:h-16 sm:w-16"><Asset name={icon} className="h-11 w-11 sm:h-12 sm:w-12" /></span><span className="font-heading text-sm font-extrabold leading-tight tracking-[-.02em] text-[#0b1437] sm:text-base">{label}</span></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionHeading eyebrow="Built-in capabilities" title="Every feature your *business software* needs." text="The building blocks we wire into CRMs, ERPs, chatbots, stores and apps — so you get one system, not a pile of tools." /><div data-stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([group, items]) => <div key={group} className="card rounded-3xl p-6"><h3 className="font-heading text-xl font-extrabold tracking-[-.04em] text-[#0b1437]">{group}</h3><ul className="mt-5 flex flex-wrap gap-2">{items.map(([label, icon]) => <li key={label} className="inline-flex items-center gap-2 rounded-full border-2 border-[#0b1437]/10 bg-white py-1 pl-1 pr-3 text-sm font-semibold text-[#0b1437] transition hover:-translate-y-0.5 hover:border-[#0b1437]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff]"><Asset name={icon} className="h-7 w-7" /></span>{label}</li>)}</ul></div>)}</div></section>

    <TechStack />
    <CTA />
  </main></SiteShell></>
}
