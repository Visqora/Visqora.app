'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Draggable, InertiaPlugin)
export { gsap, useGSAP, Draggable }

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const FINE = '(pointer: fine)'
const EASE = 'expo.out'

// Page-wide choreography, opted into with data attributes so pages can stay server components:
// data-split (heading lines rise) · data-stagger (children cascade in) · data-count (numbers count up)
// data-parallax="px" · data-magnetic · data-marquee · data-glow (cursor-tracked light) · data-hscroll (pinned horizontal track)
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const $ = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root.current)
    const onView = (trigger: Element) => ({ trigger, start: 'top 85%', once: true })

    mm.add(MOTION_OK, () => {
      for (const el of $('[data-split]')) SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.1, stagger: .09, ease: EASE, scrollTrigger: onView(el) }),
      })

      // transition:none while tweening, otherwise Tailwind's `transition` class drags every frame; clearProps hands hover back to CSS.
      for (const el of $('[data-stagger]')) gsap.fromTo(el.children, { y: 48, opacity: 0, transition: 'none' }, { y: 0, opacity: 1, duration: 1, stagger: .08, ease: EASE, clearProps: 'all', scrollTrigger: onView(el) })

      for (const el of $('[data-count]')) {
        const end = Number(el.dataset.count), n = { v: 0 }
        gsap.to(n, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: onView(el), onUpdate: () => { el.textContent = String(Math.round(n.v)) } })
      }

      for (const el of $('[data-parallax]')) {
        const d = Number(el.dataset.parallax) || 40
        gsap.fromTo(el, { y: d }, { y: -d, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      }

      // Marquees loop forever and speed up with scroll velocity, easing back to cruise speed. data-marquee-reverse runs left→right.
      for (const el of $('[data-marquee]')) {
        const [from, to] = el.hasAttribute('data-marquee-reverse') ? [-50, 0] : [0, -50]
        const loop = gsap.fromTo(el, { xPercent: from }, { xPercent: to, duration: Number(el.dataset.marquee) || 30, ease: 'none', repeat: -1 })
        ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: (self) => {
          gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6), duration: .2, overwrite: true })
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: .2, ease: 'power2.out' })
        } })
      }
    })

    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      for (const track of $('[data-hscroll]')) {
        const section = track.closest('section')!
        const bar = section.querySelector('[data-hscroll-bar]')
        const distance = () => track.scrollWidth - track.clientWidth
        const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance() + innerHeight * .5}`, pin: true, scrub: .6, invalidateOnRefresh: true, refreshPriority: 1 } }) // refresh first so triggers below account for the pin spacer
        tl.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0)
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
        for (const [i, card] of [...track.children].entries()) tl.fromTo(card, { opacity: .25 }, { opacity: 1, duration: .15 }, i * .25)
      }
    })

    mm.add(`${MOTION_OK} and ${FINE}`, () => {
      const off: (() => void)[] = []
      for (const el of $('[data-magnetic]')) {
        const x = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' }), y = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3.out' })
        const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .4) }
        const leave = () => { gsap.to(el, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .35)' }) }
        el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
      }
      for (const el of $('[data-glow], .card, .glow')) {
        const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`) }
        // On leave the glow returns to its resting spot (the CSS fallback position).
        const leave = () => { el.style.removeProperty('--mx'); el.style.removeProperty('--my') }
        el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
      }
      return () => off.forEach((fn) => fn())
    })
  }, { scope: root })

  return <div ref={root}>{children}</div>
}

// Trailing dot that swells over links and shows a label over anything with data-cursor="Label". Desktop pointers only; the native cursor stays.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    gsap.matchMedia().add(`${MOTION_OK} and ${FINE}`, () => {
      const el = dot.current!
      const x = gsap.quickTo(el, 'x', { duration: .35, ease: 'power3.out' }), y = gsap.quickTo(el, 'y', { duration: .35, ease: 'power3.out' })
      let shown = false
      const move = (e: PointerEvent) => {
        if (!shown) { shown = true; gsap.set(el, { x: e.clientX, y: e.clientY }); gsap.to(el, { autoAlpha: 1, duration: .3 }) }
        x(e.clientX); y(e.clientY)
        const target = (e.target as Element).closest?.('[data-cursor], a, button')
        const text = target?.getAttribute('data-cursor') ?? ''
        label.current!.textContent = text
        gsap.to(el, { scale: text ? 4.5 : target ? 2.2 : 1, duration: .4, ease: 'power3.out', overwrite: 'auto' })
      }
      const leave = () => { shown = false; gsap.to(el, { autoAlpha: 0, duration: .2 }) }
      addEventListener('pointermove', move)
      document.documentElement.addEventListener('pointerleave', leave)
      return () => { removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave) }
    })
  })

  return <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] -ml-2 -mt-2 grid h-4 w-4 place-items-center rounded-full bg-[#3b58ec]/85 opacity-0 invisible"><span ref={label} className="text-[3px] font-bold uppercase tracking-wider text-white" /></div>
}
