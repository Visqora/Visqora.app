import Link from 'next/link'
import { ArrowRight, ArrowUpRight, GitBranch, Radar, ShieldCheck } from 'lucide-react'
import type { projects } from '@/lib/projects'
import { Asset } from '@/components/asset'
import { TECH_LOGO } from '@/lib/tech'

type Project = (typeof projects)[number]

// Live-looking mock UI for each product card (home + /work). data-parallax/data-count are picked up by components/motion.tsx.
export function ProductVisual({ product }: { product: Project }) {
  if (product.accent === 'orange') {
    return <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#10151d] p-6"><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#ff6b2c_1px,transparent_1px),linear-gradient(90deg,#ff6b2c_1px,transparent_1px)] [background-size:32px_32px]" /><div data-parallax="22" className="relative w-full max-w-md border border-white/10 bg-[#151c26] p-5 shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="font-mono text-xs text-white/45">agent-run / trace-084</span><span className="flex items-center gap-1.5 text-xs font-bold text-[#ff7040]"><Radar className="h-3.5 w-3.5" /> Cause found</span></div><div className="mt-5 flex items-center gap-2">{[0, 1, 2, 3, 4].map((step) => <div key={step} className={`h-3 flex-1 ${step === 2 ? 'bg-[#ff7040]' : 'bg-white/15'}`} />)}</div><p className="mt-6 text-sm font-semibold text-white">Retrieval selected archived policy</p><p className="mt-2 text-xs text-white/45">Verified with counterfactual replay</p></div></div>
  }

  return <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#eafafe] p-6"><div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-[#18b8d8]/25" /><div className="absolute bottom-4 right-8 h-36 w-36 rounded-full border border-[#3049c9]/15" /><div data-parallax="22" className="relative w-full max-w-md border border-[#c8e6ec] bg-white p-5 shadow-[0_22px_55px_rgba(24,90,120,.14)]"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-[#10234f]"><ShieldCheck className="h-4 w-4 text-[#18aaca]" /> Dependency scan</span><span className="text-xs font-semibold text-[#168963]">Complete</span></div><div className="mt-5 grid grid-cols-3 gap-3"><div className="border-l-2 border-[#18b8d8] pl-3"><strong data-count="118" className="block text-xl text-[#10234f]">118</strong><span className="text-[11px] text-[#69758a]">packages</span></div><div className="border-l-2 border-[#f3b73f] pl-3"><strong data-count="4" className="block text-xl text-[#10234f]">4</strong><span className="text-[11px] text-[#69758a]">findings</span></div><div className="border-l-2 border-[#3049c9] pl-3"><strong data-count="9" className="block text-xl text-[#10234f]">9</strong><span className="text-[11px] text-[#69758a]">rules</span></div></div><div className="mt-5 flex items-center gap-2 text-xs text-[#69758a]"><GitBranch className="h-3.5 w-3.5 text-[#3049c9]" /> Exact dependency paths included</div></div></div>
}

// Whole card is the link (stretched ::after); the optional live-product link sits above it.
export function ProductCard({ product, heading: H = 'h2' }: { product: Project; heading?: 'h2' | 'h3' }) {
  return <article data-cursor="View" className="card group flex flex-col rounded-[2rem]">
    <ProductVisual product={product} />
    <div className="flex flex-1 flex-col border-t-2 border-[#0b1437]/10 p-7 sm:p-8">
      <div className="flex items-center justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#3b58ec]">{product.label}</p><span aria-hidden className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0b1437] text-[#0b1437] transition duration-300 group-hover:-rotate-45 group-hover:bg-[#13b8e0]"><ArrowRight className="h-4 w-4" /></span></div>
      <H className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#0b1437]"><Link href={`/work/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">{product.title}</Link></H>
      <p className="mt-3 leading-7 text-[#5b6478]">{product.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">{product.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#0b1437]/10 py-1 pl-2 pr-3 text-xs font-bold text-[#5b6478]">{TECH_LOGO[tag] && <Asset name={TECH_LOGO[tag]} className="h-5 w-5" />}{tag}</span>)}</div>
      {product.liveUrl && <a href={product.liveUrl} target="_blank" rel="noreferrer" className="relative z-10 mt-6 inline-flex w-fit items-center gap-1 text-sm font-bold text-[#168963] hover:underline">Live product <ArrowUpRight className="h-4 w-4" /></a>}
    </div>
  </article>
}
