import { CTA, SiteShell } from '@/components/site'
import { PageHero } from '@/app/pages'
import { ProductCard } from '@/components/product-visual'
import { projects } from '@/lib/projects'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({ title: 'Work', description: 'Explore software and AI products designed and engineered by Visqora Technologies.', path: '/work' })

export default function Work() {
  return <SiteShell>
    <PageHero eyebrow="Visqora Technologies products" asset="rocket" title="Ideas we built *all the way through.*" text="Products from Visqora Technologies, with clear explanations of what each one solves." />
    <main className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div data-stagger className="grid gap-6 md:grid-cols-2">{projects.map((project) => <ProductCard key={project.slug} product={project} />)}</div></main>
    <CTA />
  </SiteShell>
}
