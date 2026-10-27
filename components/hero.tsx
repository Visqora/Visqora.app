'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Check, Smartphone, Zap } from 'lucide-react'
import { Instrument_Serif } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'

type Key = { t: number; x: number; y: number; s: number }

const T = (x: number, y: number, s: number) => `translate(${x}px, ${y}px) scale(${s})`
const keyframes = (path: Key[]) => path.map((k) => ({ offset: k.t, transform: T(k.x, k.y, k.s), easing: 'cubic-bezier(.45,.05,.3,1)' }))
const DURATION = 3200
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic' })

function Orb({ orbRef }: { orbRef: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={orbRef} aria-hidden className="orb"><div className="orb-shell"><i className="orb-spark" /><i className="orb-spark orb-spark-b" /><div className="orb-core" /></div></div>
}

// Two glossy orbs roam for ~3s, then dock at top and bottom centre while the copy and ripple arcs fade in.
export function Hero() {
  const hero = useRef<HTMLElement>(null)
  const a = useRef<HTMLDivElement>(null)
  const b = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [on, setOn] = useState(false)

  useEffect(() => {
    let timer = 0
    let resizeTimer = 0
    const play = () => {
      const el = hero.current, A = a.current, B = b.current
      if (!el || !A || !B) return
      const w = el.clientWidth, h = el.clientHeight
      setSize({ w, h })
      setOn(false)
      clearTimeout(timer)
      for (const orb of [A, B]) orb.getAnimations().forEach((anim) => anim.cancel())

      const dockA = { x: w / 2, y: -.02 * h }
      const dockB = { x: w / 2, y: h * 1.02 }
      const breathe = (orb: HTMLDivElement, dock: { x: number; y: number }, dy: number, delay: number) =>
        orb.animate([{ transform: T(dock.x, dock.y, 1) }, { transform: T(dock.x, dock.y + dy, 1.02) }, { transform: T(dock.x, dock.y, 1) }], { duration: 6000, iterations: Infinity, easing: 'ease-in-out', delay })

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        A.style.transform = T(dockA.x, dockA.y, 1)
        B.style.transform = T(dockB.x, dockB.y, 1)
        setOn(true)
        return
      }

      // Large orb starts mid-left and docks at the top; the small one grows from the right and docks at the bottom.
      const roamA = A.animate(keyframes([
        { t: 0, x: .38 * w, y: .52 * h, s: .45 },
        { t: .32, x: .33 * w, y: .6 * h, s: .6 },
        { t: .55, x: .42 * w, y: .72 * h, s: .8 },
        { t: .74, x: .22 * w, y: .78 * h, s: .95 },
        { t: .86, x: .44 * w, y: .4 * h, s: 1.05 },
        { t: 1, x: dockA.x, y: dockA.y, s: 1 },
      ]), { duration: DURATION, fill: 'forwards' })
      B.animate(keyframes([
        { t: 0, x: .53 * w, y: .49 * h, s: .07 },
        { t: .2, x: .76 * w, y: .14 * h, s: .35 },
        { t: .42, x: .6 * w, y: .74 * h, s: .7 },
        { t: .6, x: .78 * w, y: .36 * h, s: .95 },
        { t: .78, x: .66 * w, y: .2 * h, s: 1.05 },
        { t: 1, x: dockB.x, y: dockB.y, s: 1 },
      ]), { duration: DURATION, fill: 'forwards' })
      timer = window.setTimeout(() => setOn(true), DURATION - 700)
      roamA.onfinish = () => { breathe(A, dockA, 8, 0); breathe(B, dockB, -8, 3000) }
    }
    play()
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(play, 200) }
    addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      removeEventListener('resize', onResize)
      for (const orb of [a.current, b.current]) orb?.getAnimations().forEach((anim) => anim.cancel())
    }
  }, [])

  // Concentric arcs radiating from the docked orbs, fading out with distance.
  const rMax = Math.hypot(size.w, size.h)
  const radii: number[] = []
  for (let r = 170; r < rMax * .75; r += 64) radii.push(r)

  const fade = `transition-all duration-1000 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`

  return <section ref={hero} className="relative grid -mt-[76px] h-[100svh] min-h-[596px] overflow-hidden bg-[#f7f9fc]">
    {/* Texture: a fading blueprint grid plus film grain, so the flat surface feels printed rather than default. */}
    <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(11,20,55,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,20,55,.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_30%,transparent_80%)]" />
    <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-[.14] mix-blend-multiply" />

    <svg aria-hidden viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 z-[1] h-full w-full transition-opacity duration-[1200ms] ${on ? 'opacity-100' : 'opacity-0'}`}>
      <defs>
        <filter id="hero-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" /></filter>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".35" stopColor="#fff" stopOpacity=".15" /><stop offset=".65" stopColor="#fff" stopOpacity=".15" /><stop offset="1" stopColor="#fff" /></linearGradient>
        <mask id="hero-mask"><rect width="100%" height="100%" fill="url(#hero-fade)" /></mask>
      </defs>
      {[-40, size.h + 40].map((cy) => <g key={cy} filter="url(#hero-soft)" mask="url(#hero-mask)">{radii.map((r) => <circle key={r} cx={size.w / 2} cy={cy} r={r} fill="none" stroke="#3b58ec" strokeWidth={7} strokeOpacity={Math.max(0, .55 - r / rMax) * .35} />)}</g>)}
    </svg>

    <Orb orbRef={a} />
    <Orb orbRef={b} />

    {/* Editorial corner labels */}
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 z-[3] hidden items-end justify-between px-8 pb-7 font-mono text-[11px] uppercase tracking-[.18em] text-[#0b1437]/55 md:flex ${fade}`}><span className="flex items-center gap-3">Scroll <span className="relative block h-10 w-px overflow-hidden bg-[#0b1437]/15"><span className="hero-scroll absolute inset-x-0 top-0 h-1/2 bg-[#3b58ec]" /></span></span><span>Software · AI · Automation — ©2026</span></div>

    {/* Floating stickers, desktop only so they never crowd the copy */}
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-[3] hidden lg:block ${fade}`} style={{ transitionDelay: on ? '.5s' : '0s' }}>
      <Sticker className="left-[5%] top-[44%] -rotate-6" icon={<Bot className="h-4 w-4" />} delay="0s">AI that actually ships</Sticker>
      <Sticker className="right-[6%] top-[30%] rotate-[5deg]" tone="bg-[#13b8e0] text-[#0b1437]" icon={<Zap className="h-4 w-4" />} delay="-2s">Zero busywork</Sticker>
      <Sticker className="bottom-[20%] left-[10%] rotate-3" tone="bg-[#0b1437] text-white" icon={<Smartphone className="h-4 w-4" />} delay="-4s">Web + mobile</Sticker>
      <Sticker className="right-[9%] top-[50%] -rotate-[4deg]" icon={<BarChart3 className="h-4 w-4" />} delay="-1s">Data → clarity</Sticker>
      <div className="absolute bottom-[11%] right-[13%] grid h-28 w-28 place-items-center">
        <svg viewBox="0 0 100 100" className="hero-spin absolute inset-0 h-full w-full"><defs><path id="hero-badge" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs><text className="fill-[#0b1437] font-mono text-[9px] font-bold uppercase"><textPath href="#hero-badge" textLength="236" lengthAdjust="spacing">Free first call ✦ Free first call ✦</textPath></text></svg>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#3b58ec] text-white shadow-[3px_3px_0_#0b1437]"><ArrowUpRight className="h-5 w-5" /></span>
      </div>
    </div>

    <div className={`hero-copy relative z-[4] grid place-content-center justify-items-center px-5 py-[clamp(96px,17svh,150px)] text-center ${on ? 'on' : ''}`}>
      <h1 className="text-[clamp(34px,min(6vw,8.5svh),86px)] font-extrabold leading-[.95] tracking-[-.05em] text-[#0b1437]">
        We turn your{' '}<span className="relative inline-block">messy<svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[.18em] w-full overflow-visible"><path d="M2 12 C 40 2, 70 20, 104 9 S 168 4, 198 11" fill="none" stroke="#13b8e0" strokeWidth="6" strokeLinecap="round" className={`hero-draw ${on ? 'on' : ''}`} /></svg></span><br className="hidden sm:block" />{' '}problems into<br className="hidden sm:block" />{' '}
        <span className={`${serif.className} font-normal italic tracking-[-.02em] text-[#3b58ec]`}>working tech.</span>
      </h1>
      <p className="mt-6 max-w-[42ch] text-base leading-7 text-[#5b6478] sm:text-lg sm:leading-8">Custom software, AI and automations for growing businesses. One clear path from the first conversation to launch day and beyond.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full border-2 border-[#0b1437] bg-[#3b58ec] py-2 pl-6 pr-2 text-sm font-bold shadow-[4px_4px_0_#0b1437] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0b1437] active:translate-x-1 active:translate-y-1 active:shadow-none"><span className="text-white">Book a free consultation</span><span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#0b1437] transition group-hover:-rotate-45"><ArrowRight className="h-4 w-4" /></span></Link>
        <Link href="/work" className="group inline-flex items-center gap-2 rounded-full border-2 border-[#0b1437] bg-white px-6 py-[15px] text-sm font-bold text-[#0b1437] transition hover:bg-[#0b1437]"><span className="transition group-hover:text-white">See what we&apos;ve shipped</span><ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45 group-hover:text-[#13b8e0]" /></Link>
      </div>
      <ul className="mt-6 flex [@media(max-height:860px)]:hidden flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#5b6478]">{['Free first call', 'No tech team needed', 'Built in the open'].map((item) => <li key={item} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#13b8e0]" strokeWidth={3} />{item}</li>)}</ul>
    </div>
  </section>
}

function Sticker({ className, tone = 'bg-white text-[#0b1437]', icon, delay, children }: { className: string; tone?: string; icon: React.ReactNode; delay: string; children: React.ReactNode }) {
  return <span className={`absolute ${className}`}><span className={`animate-float inline-flex items-center gap-2 rounded-full border-2 border-[#0b1437] px-4 ${tone} py-2 text-sm font-bold shadow-[3px_3px_0_#0b1437]`} style={{ animationDelay: delay }}>{icon}{children}</span></span>
}
