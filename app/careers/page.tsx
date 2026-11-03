import { SiteShell, CTA, Button } from '@/components/site'
import { PageHero } from '@/app/pages'
import { Asset } from '@/components/asset'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({ title: 'Careers', description: 'Learn about career opportunities and working with the Visqora Technologies team.', path: '/careers' })

export default function Careers() {
  return <SiteShell>
    <PageHero eyebrow="Careers" asset="developer" title="Build *useful things* with us." text="Our work is guided by clarity, craft and the details people feel." />
    <main className="mx-auto max-w-3xl px-5 py-20 lg:px-8"><div className="glow rounded-[2rem] border-2 border-[#0b1437] bg-white p-8 shadow-[8px_8px_0_#0b1437] sm:p-10">
      <Asset name="team" className="mb-5 block h-20 w-20" /><span className="inline-flex items-center gap-2 rounded-full bg-[#fff] px-3 py-1 text-xs font-bold text-[#5b6478]"><span className="h-2 w-2 rounded-full bg-[#f3b73f]" /> Not hiring right now</span>
      <h2 className="mt-5 text-3xl font-extrabold tracking-[-.045em]">No open roles <span className="font-accent text-[#3b58ec]">right now</span></h2>
      <p className="mt-4 leading-8 text-[#5b6478]">We are not actively hiring, but thoughtful people are welcome to introduce themselves.</p>
      <Button href="mailto:visqora@gmail.com" className="mt-7">Say hello</Button>
    </div></main>
    <CTA title="Follow the journey" text="See what we’re building and how we think on LinkedIn." />
  </SiteShell>
}
