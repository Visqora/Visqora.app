'use client'

import Link from 'next/link'
import { SiteShell, SectionHeading, CTA, Button, accent } from '@/components/site'
import { Asset, type AssetName } from '@/components/asset'
import { services } from '@/lib/services'
import { ContactForm } from '@/components/contact-form'
import { ArrowUpRight } from 'lucide-react'

// Shared inner-page hero: extends under the glass navbar, sticker eyebrow, oversized headline with *accent* words, a small brand orb.
export function PageHero({ eyebrow, title, text, asset, children }: { eyebrow: string; title: string; text: string; asset?: AssetName; children?: React.ReactNode }) {
  return <section className="relative -mt-[76px] overflow-hidden bg-[#fff] px-5 pb-20 pt-[calc(76px+4rem)] sm:pb-28 sm:pt-[calc(76px+6rem)]">
    <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(11,20,55,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,20,55,.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,#000_20%,transparent_75%)]" />
    <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-[.12] mix-blend-multiply" />
    <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[560px] w-[560px] rounded-full border-[48px] border-[#3b58ec]/[.06]" />
    {asset
      ? <div aria-hidden className="pointer-events-none absolute right-[8%] top-[34%] hidden rotate-6 lg:block"><div className="animate-float grid h-44 w-44 place-items-center rounded-[2.5rem] border-2 border-[#0b1437] bg-white shadow-[8px_8px_0_#0b1437]"><Asset name={asset} className="h-32 w-32" /></div></div>
      : <div aria-hidden className="animate-float pointer-events-none absolute right-[9%] top-[38%] hidden h-36 w-36 lg:block"><div className="orb-shell"><i className="orb-spark" /><i className="orb-spark orb-spark-b" /><div className="orb-core" /></div></div>}
    <div className="page-in relative mx-auto max-w-7xl lg:px-8">
      <p className="inline-flex items-center gap-2 rounded-full border-2 border-[#0b1437] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#0b1437] shadow-[3px_3px_0_#0b1437]"><span className="h-2 w-2 rounded-full bg-[#13b8e0]" />{eyebrow}</p>
      <h1 className="mt-8 max-w-4xl text-[clamp(40px,6.6vw,92px)] font-extrabold leading-[.98] tracking-[-.055em] text-[#0b1437]">{accent(title)}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5b6478]">{text}</p>
      {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
    </div>
  </section>
}

export function ServicesPage() {
  return <SiteShell>
    <PageHero eyebrow="What we do" title="Technology that works the way *your business does.*" text="Practical software, AI and automation for teams ready to move from a recurring problem to a reliable solution."><Button href="/contact">Book a free consultation</Button></PageHero>
    <section data-stagger className="mx-auto max-w-7xl space-y-6 px-5 py-20 lg:px-8">{services.map((s, i) => {
      return <Link href={`/services/${s.slug}`} key={s.slug} className="card group grid items-center gap-8 rounded-[2rem] p-6 md:grid-cols-[.8fr_1fr] md:p-10">
        <div className={`${i % 2 ? 'md:order-2' : ''} relative flex min-h-56 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#0b1437] bg-gradient-to-br from-[#eefbfc] to-[#dbe7ff]`}>
          <span aria-hidden className="absolute -bottom-6 -right-2 font-heading text-[150px] font-extrabold leading-none tracking-[-.08em] text-[#3b58ec]/10">0{i + 1}</span>
          <span className="relative grid h-32 w-32 place-items-center rounded-3xl border-2 border-[#0b1437] bg-white shadow-[5px_5px_0_#0b1437] transition duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-[#edf9fc]"><Asset name={s.asset} className="h-24 w-24" /></span>
        </div>
        <div className={i % 2 ? 'md:order-1' : ''}>
          <p className="font-mono text-xs font-bold text-[#13b8e0]">0{i + 1} / 0{services.length}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#0b1437] sm:text-4xl">{s.title}</h2>
          <p className="mt-4 text-lg leading-8 text-[#5b6478]">{s.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{s.deliverables.map(([d, icon]) => <span key={d} className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#0b1437]/10 py-1 pl-1 pr-3 text-xs font-bold text-[#5b6478]"><Asset name={icon} className="h-6 w-6" />{d}</span>)}</div>
          <span className="mt-7 inline-flex items-center gap-3 font-bold text-[#0b1437]">Explore service <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#0b1437] transition duration-300 group-hover:-rotate-45 group-hover:bg-[#0b1437] group-hover:text-white"><ArrowUpRight className="h-4 w-4" /></span></span>
        </div>
      </Link>
    })}</section>
    <CTA />
  </SiteShell>
}

const VALUES: [string, string, AssetName][] = [['Clarity', 'Say what matters, simply.', 'diamond'], ['Ownership', 'Stay accountable for the whole outcome.', 'shield-check'], ['Craft', 'Sweat the details people feel.', 'screwdriver'], ['Speed', 'Learn quickly, ship thoughtfully.', 'lightning']]

export function AboutPage() {
  return <SiteShell>
    <PageHero eyebrow="About Visqora" title="See the real problem first. *Then build around it.*" text="Visqora Technologies helps growing businesses solve real problems with thoughtful technology." />
    <section className="mx-auto grid max-w-7xl items-start gap-16 px-5 py-24 lg:grid-cols-2 lg:px-8">
      <div className="lg:sticky lg:top-28"><SectionHeading eyebrow="Why we exist" title="Good technology should make work *feel lighter.*" text="Businesses deserve a partner who understands the workflow before reaching for a tool. We stay close to the people doing the work, own the outcome end to end and make every decision easy to understand." /></div>
      <div className="glow relative overflow-hidden rounded-[2rem] border-2 border-[#0b1437] bg-[#0b1437] p-8 text-white shadow-[8px_8px_0_#13b8e0] sm:p-12">
        <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#13b8e0]">Our mission</p>
          <p className="mt-7 font-heading text-3xl font-extrabold leading-tight tracking-[-.04em] sm:text-4xl">Make useful technology accessible to <span className="font-accent text-[#13b8e0]">every ambitious business.</span></p>
          <div data-stagger className="mt-10 grid gap-4 sm:grid-cols-2">{VALUES.map(([t, d, icon], i) => <div key={t} className="card card-dark group rounded-2xl p-5"><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#13b8e0]">0{i + 1}</span><span className="grid h-12 w-12 place-items-center rounded-xl bg-white transition duration-300 group-hover:-rotate-6"><Asset name={icon} className="h-9 w-9" /></span></div><h3 className="mt-3 text-lg font-extrabold">{t}</h3><p className="mt-1 text-sm leading-6 text-white/60">{d}</p></div>)}</div>
        </div>
      </div>
    </section>
    <CTA title={'Work with us'} text="Bring us the problem you’ve been putting off." />
  </SiteShell>
}

export function ContactPage() {
  const channel = 'card group flex items-center gap-4 rounded-2xl p-5'
  const icon = 'grid h-14 w-14 shrink-0 place-items-center rounded-xl border-2 border-[#0b1437] bg-[#edf9fc] transition duration-300 group-hover:-rotate-6 group-hover:bg-[#13b8e0]'
  const arrow = 'ml-auto h-5 w-5 text-[#0b1437]/40 transition duration-300 group-hover:rotate-45 group-hover:text-[#0b1437]'
  return <SiteShell>
    <PageHero eyebrow="Start a conversation" asset="cursor" title="Let’s talk about *your problem.*" text="Tell us what’s getting in the way. We reply within 24 hours." />
    <section className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
      <ContactForm />
      <div className="lg:sticky lg:top-28 lg:pl-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#3b58ec]">Prefer direct?</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-[-.045em]">Pick the channel that <span className="font-accent text-[#3b58ec]">feels easiest.</span></h2>
        <div className="mt-8 space-y-4">
          <a href="mailto:visqora@gmail.com" className={channel}><span className={icon}><Asset name="chat" className="h-10 w-10" /></span><span><b className="block">Email us</b><span className="text-sm text-[#5b6478]">visqora@gmail.com</span></span><ArrowUpRight className={arrow} /></a>
          <a href="https://linkedin.com/company/visqora-technologies" target="_blank" rel="noreferrer" className={channel}><span className={icon}><Asset name="team" className="h-10 w-10" /></span><span><b className="block">LinkedIn</b><span className="text-sm text-[#5b6478]">Follow Visqora Technologies</span></span><ArrowUpRight className={arrow} /></a>
        </div>
        <div className="glow relative mt-10 overflow-hidden rounded-3xl border-2 border-[#0b1437] bg-[#0b1437] p-7 text-white shadow-[6px_6px_0_#13b8e0]">
          <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
          <div className="relative"><span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-[4px_4px_0_#13b8e0]"><Asset name="headset" className="h-12 w-12" /></span><p className="text-lg font-extrabold">Book a 30-minute consultation</p><p className="mt-2 text-sm leading-6 text-white/60">A no-pressure conversation about where technology can help.</p><Button href="mailto:visqora@gmail.com?subject=30-minute%20consultation" external variant="light" className="mt-6">Request a time</Button></div>
        </div>
      </div>
    </section>
  </SiteShell>
}
