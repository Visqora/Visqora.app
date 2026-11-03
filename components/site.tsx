'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Menu, X, Mail, Sparkles, Check } from 'lucide-react'
import { services } from '@/lib/services'
import { Asset, type AssetName } from '@/components/asset'
import { useEffect, useRef, useState } from 'react'
import { Motion } from '@/components/motion'

export { services }

function Mark({ light = false }: { light?: boolean }) { return <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${light ? 'bg-white/10' : 'bg-[#0b1437]'}`}><span className="relative h-5 w-6 rounded-[50%] border-2 border-[#13b8e0] rotate-[-25deg]"><span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#13b8e0]" /></span></span> }

export function Logo({ light = false, priority = false }: { light?: boolean; priority?: boolean }) { return <Link href="/" aria-label="Visqora home" className="flex items-center gap-2.5"><Image src={light ? '/visqora-dark.png' : '/visqora-logo.png'} alt="Visqora — Vision at the Core" width={light ? 2170 : 620} height={light ? 725 : 180} sizes="170px" className="h-10 w-[150px] object-contain object-left sm:w-[170px]" priority={priority} /></Link> }

const NAV = [['Home', '/'], ['Services', '/services'], ['Work', '/work'], ['About', '/about'], ['Contact', '/contact']] as const

// One button language for the whole site: thick navy outline + hard offset shadow that "presses" on hover/click.
const BUTTON = {
  primary: 'border-[#0b1437] bg-[#3b58ec] text-white shadow-[4px_4px_0_#0b1437] hover:shadow-[2px_2px_0_#0b1437]',
  secondary: 'border-[#0b1437] bg-white text-[#0b1437] shadow-[4px_4px_0_#0b1437] hover:shadow-[2px_2px_0_#0b1437]',
  light: 'border-white bg-white text-[#0b1437] shadow-[4px_4px_0_#13b8e0] hover:shadow-[2px_2px_0_#13b8e0]',
}
const CHIP = { primary: 'bg-white text-[#0b1437]', secondary: 'bg-[#0b1437] text-white', light: 'bg-[#3b58ec] text-white' }

export function Button({ href, variant = 'primary', external = false, type = 'button', className = '', children }: { href?: string; variant?: keyof typeof BUTTON; external?: boolean; type?: 'button' | 'submit'; className?: string; children: React.ReactNode }) {
  const Icon = external ? ArrowUpRight : ArrowRight
  const cls = `group inline-flex min-h-12 items-center justify-between gap-3 rounded-full border-2 py-1.5 pl-6 pr-1.5 text-sm font-bold transition-[translate,box-shadow,background-color] duration-200 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-1 active:translate-y-1 active:shadow-none ${BUTTON[variant]} ${className}`
  const inner = <><span>{children}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-45 ${CHIP[variant]}`}><Icon className="h-4 w-4" /></span></>
  if (!href) return <button data-magnetic type={type} className={cls}>{inner}</button>
  if (external || href.startsWith('mailto:')) return <a data-magnetic href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })} className={cls}>{inner}</a>
  return <Link data-magnetic href={href} className={cls}>{inner}</Link>
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const path = usePathname()
  const active = (href: string) => href === '/' ? path === '/' : path.startsWith(href)
  useEffect(() => { const on = () => setScrolled(scrollY > 24); on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on) }, [])

  return <header className="sticky top-0 z-50 h-[76px] pt-2">
    <div className={`relative z-50 mx-auto flex h-[52px] w-[calc(100%-24px)] items-center justify-between rounded-2xl border pl-4 pr-2 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 sm:pl-5 ${scrolled || open ? 'max-w-[980px] border-[#0b1437]/10 bg-white/85 shadow-[0_14px_36px_rgba(11,20,55,.12)]' : 'max-w-[1040px] border-white/70 bg-white/60 shadow-[0_8px_24px_rgba(11,20,55,.06),inset_0_1px_0_rgba(255,255,255,.9)]'}`}>
      <Logo priority />
      <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">{NAV.map(([label, href]) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined} className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${active(href) ? 'bg-[#0b1437] text-white' : 'text-[#0b1437]/70 hover:bg-[#0b1437]/[.06] hover:text-[#0b1437]'}`}>{label}</Link>)}</nav>
      <Link data-magnetic href="/contact" className="hidden items-center gap-1.5 rounded-full border-2 border-[#0b1437] bg-[#3b58ec] px-4 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0_#0b1437] transition-[translate,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_#0b1437] md:inline-flex">Book a call <ArrowRight className="h-3.5 w-3.5" /></Link>
      <button aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" className="grid h-10 w-10 place-items-center rounded-xl border-2 border-[#0b1437] bg-white shadow-[2px_2px_0_#0b1437] md:hidden" onClick={() => setOpen(!open)}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
    </div>
    <div id="mobile-menu" inert={!open} className={`fixed inset-x-0 bottom-0 top-0 z-40 overflow-y-auto bg-[#fff] px-6 pb-10 pt-24 transition-[opacity,translate] duration-500 md:hidden ${open ? 'opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}>
      <nav aria-label="Mobile" className="flex flex-col">{NAV.map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }} className={`flex items-baseline gap-4 border-b-2 border-[#0b1437]/10 py-5 font-heading text-4xl font-extrabold tracking-[-.045em] transition-[opacity,translate] duration-500 ${open ? 'opacity-100' : 'translate-y-6 opacity-0'} ${active(href) ? 'text-[#3b58ec]' : 'text-[#0b1437]'}`}><span className="font-mono text-xs font-bold text-[#0b1437]/40">0{i + 1}</span>{label}</Link>)}</nav>
      <div onClick={() => setOpen(false)}><Button href="/contact" className="mt-8 w-full">Book a free consultation</Button></div>
    </div>
  </header>
}

// Turns *starred* words into the serif-italic accent.
export function accent(text: string, light = false) { return text.split(/\*(.+?)\*/).map((part, i) => i % 2 ? <span key={i} className={`font-accent ${light ? 'text-[#13b8e0]' : 'text-[#3b58ec]'}`}>{part}</span> : part) }

// Adds `in` once the element scrolls into view, which starts its `.rise` / `.line-rise` / `.tilt-in` entrance sequence.
function useInView<T extends HTMLElement>() { const ref = useRef<T>(null); const [inView, setInView] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: .15 }); io.observe(el); return () => io.disconnect() }, []); return [ref, inView] as const }

const delay = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

function GlossyButton({ href, children }: { href: string; children: React.ReactNode }) { return <Link data-magnetic href={href} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(180deg,#111d57_0%,#3b58ec_100%)] px-7 py-4 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.6),inset_0_-1px_0_rgba(19,184,224,.7),0_0_0_1px_rgba(19,184,224,.35),0_14px_44px_rgba(59,88,236,.45)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.7),inset_0_-1px_0_rgba(19,184,224,.9),0_0_0_1px_rgba(19,184,224,.55),0_18px_56px_rgba(19,184,224,.45)]"><span className="pointer-events-none absolute inset-x-4 top-[3px] h-1/2 rounded-full bg-gradient-to-b from-white/30 to-transparent" />{children}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link> }

const handFilter = '[filter:hue-rotate(165deg)_saturate(.85)_drop-shadow(0_20px_30px_rgba(0,0,0,.35))]'

export function Footer() { const [ref, inView] = useInView<HTMLElement>(); const heading = 'rise mb-5 text-xs font-semibold uppercase tracking-[.2em] text-[#13b8e0]'; const link = 'rise mb-3 block text-sm text-white/60 transition hover:text-white'; const social = 'grid h-11 w-11 place-items-center rounded-full border border-[#13b8e0]/35 transition hover:border-[#13b8e0] hover:bg-[#13b8e0]/10'; return <footer ref={ref} className={`relative overflow-hidden bg-[#0b1437] text-white ${inView ? 'in' : ''}`}><div className="relative mx-auto max-w-7xl px-5 lg:px-8"><div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-16 lg:grid-cols-[1.35fr_.8fr_1fr_1fr] lg:gap-10"><div className="rise col-span-2 lg:col-span-1" style={delay(0)}><Logo light /><p className="mt-6 max-w-xs text-sm leading-7 text-white/60">Turning business problems into working technology, from first call to launch.</p><div className="mt-7 flex gap-3"><a aria-label="LinkedIn" href="https://linkedin.com/company/visqora-technologies" target="_blank" rel="noreferrer" className={social}><img src="/linkedin.svg" alt="" className="h-4 w-4 brightness-0 invert" /></a><a aria-label="GitHub" href="https://github.com/Visqora" target="_blank" rel="noreferrer" className={social}><img src="/github.svg" alt="" className="h-4 w-4 brightness-0 invert" /></a></div></div><div><p className={heading} style={delay(.1)}>Company</p>{[['About','/about'],['Our work','/work'],['Contact','/contact'],['Careers','/careers']].map(([t,h], i) => <Link key={h} href={h} className={link} style={delay(.15 + i * .05)}>{t}</Link>)}</div><div><p className={heading} style={delay(.2)}>Services</p>{services.map((s, i) => <Link key={s.slug} href={`/services/${s.slug}`} className={link} style={delay(.25 + i * .05)}>{s.title}</Link>)}</div><div className="col-span-2 sm:col-span-1"><p className={heading} style={delay(.3)}>Let&apos;s talk</p><a className="rise mb-3 flex items-center gap-2 text-sm text-white/70 hover:text-white" style={delay(.35)} href="mailto:visqora@gmail.com"><Mail className="h-4 w-4 text-[#13b8e0]" /> visqora@gmail.com</a><p className="rise flex items-start gap-3 text-sm leading-6 text-white/50" style={delay(.4)}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white"><Asset name="globe" className="h-7 w-7" /></span><span>Mumbai, India<br />Working remotely worldwide</span></p></div></div></div><div className="relative mt-8 h-[clamp(240px,36vw,520px)]"><p aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[28%] select-none text-center font-heading text-[clamp(96px,23vw,360px)] font-thin leading-none tracking-[-.06em] text-[#3b58ec]/30">Visqora</p><Image src="/hand-left.png" alt="" width={582} height={290} className={`rise pointer-events-none absolute left-0 top-[8%] h-auto w-[40%] max-w-[600px] select-none ${handFilter}`} style={delay(.5)} /><Image src="/hand-right.png" alt="" width={558} height={328} className={`rise pointer-events-none absolute right-0 top-0 h-auto w-[38%] max-w-[580px] select-none ${handFilter}`} style={delay(.6)} /><div className="rise absolute left-1/2 top-[30%] w-max -translate-x-1/2 text-center text-xs leading-6 text-white/50" style={delay(.7)}><p>©2026</p><p className="font-heading text-sm font-bold text-white">Visqora Technologies</p><p>Vision at the core.</p><div className="mt-2 flex justify-center gap-4 text-white/40"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link></div></div></div></footer> }

export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) { return <div className="max-w-3xl"><p className={`mb-4 text-xs font-bold uppercase tracking-[.22em] ${light ? 'text-[#13b8e0]' : 'text-[#3b58ec]'}`}>{eyebrow}</p><h2 data-split className={`text-3xl font-extrabold leading-[1.05] tracking-[-.045em] sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-[#0b1437]'}`}>{accent(title, light)}</h2>{text && <p className={`mt-5 text-lg leading-8 ${light ? 'text-white/65' : 'text-[#5b6478]'}`}>{text}</p>}</div> }

export function CTA({ eyebrow = 'Start a project', title = 'Have a problem\nworth solving?', text = 'Tell us what is slowing your team down. We map it, design it and ship it to the web, mobile or wherever your work happens. The first consultation is free.' }) { const [ref, inView] = useInView<HTMLElement>(); return <section ref={ref} className={`relative overflow-hidden bg-[#0b1437] text-white ${inView ? 'in' : ''}`}><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,#0b1437),radial-gradient(55%_65%_at_82%_18%,rgba(19,184,224,.2),transparent_70%),radial-gradient(40%_50%_at_10%_75%,rgba(59,88,236,.18),transparent_70%)]" /><div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pt-24 lg:grid-cols-[1fr_1.15fr] lg:gap-0 lg:px-8 lg:pt-28"><div className="relative z-10 pb-4 lg:pb-24"><div aria-hidden className="pointer-events-none absolute bottom-24 right-0 hidden gap-3 lg:flex">{([['video', '-rotate-6', '0s'], ['image', 'rotate-3', '-2s'], ['wifi', '-rotate-3', '-4s']] as [AssetName, string, string][]).map(([name, tilt, d]) => <span key={name} className={tilt}><span className="animate-float grid h-16 w-16 place-items-center rounded-2xl border-2 border-white bg-white shadow-[4px_4px_0_#13b8e0]" style={{ animationDelay: d }}><Asset name={name} className="h-11 w-11" /></span></span>)}</div><span className="rise inline-flex items-center gap-2 rounded-full border border-[#13b8e0]/40 bg-[#111d57] px-4 py-2 text-xs font-semibold text-[#13b8e0] shadow-[0_0_24px_rgba(19,184,224,.15)]" style={delay(0)}><Sparkles className="h-3.5 w-3.5" /> {eyebrow}</span><h2 className="mt-7 font-heading text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">{title.split('\n').map((line, i) => <span key={line} className="block overflow-hidden pb-[.06em]"><span className="line-rise block" style={delay(.2 + i * .12)}>{line}</span></span>)}</h2><p className="rise mt-7 max-w-md text-lg leading-8 text-white/65" style={delay(.5)}>{text}</p><div className="rise mt-9" style={delay(.65)}><GlossyButton href="/contact">Book a free consultation</GlossyButton></div></div><Image src="/cta-editor.png" alt="A tilted code editor showing a widget tree and source code" width={912} height={700} sizes="(min-width: 1024px) 58vw, 100vw" className="tilt-in pointer-events-none h-auto w-full select-none mix-blend-screen [filter:hue-rotate(180deg)_saturate(1.15)] lg:-mr-[14%] lg:-mt-20 lg:w-[118%] lg:max-w-none lg:self-start" style={delay(.75)} /></div></section> }

export function SiteShell({ children }: { children: React.ReactNode }) { return <><Navbar /><Motion>{children}</Motion><Footer /></> }

export const CheckList = ({ items }: { items: string[] }) => <ul className="space-y-3">{items.map(item => <li key={item} className="flex items-start gap-3 font-medium text-[#0b1437]"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-[#0b1437] bg-[#13b8e0]"><Check className="h-3.5 w-3.5 text-[#0b1437]" strokeWidth={3} /></span>{item}</li>)}</ul>
