import { SiteShell } from '@/components/site'
import { PageHero } from '@/app/pages'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({ title: 'Terms of Use', description: 'Terms governing use of the Visqora Technologies website.', path: '/terms' })

export default function Terms() { return <SiteShell><PageHero eyebrow="Terms of use" title="A few simple expectations." text="By using this website, you agree to use it lawfully and respectfully." /><main className="mx-auto max-w-3xl px-5 py-20 text-[#5b6478] lg:px-8"><h2 className="text-2xl font-bold text-[#0b1437]">Using this site</h2><p className="mt-4 leading-8">The content on this website is provided for general information. You may not copy, redistribute or misuse our brand, code, writing or visual assets without permission.</p><h2 className="mt-12 text-2xl font-bold text-[#0b1437]">No warranty</h2><p className="mt-4 leading-8">We work to keep the information accurate, but the site is provided as-is. A conversation or enquiry does not create a client relationship or guarantee a particular result.</p><h2 className="mt-12 text-2xl font-bold text-[#0b1437]">Governing law</h2><p className="mt-4 leading-8">These terms are governed by the laws of India. Any dispute relating to this website will be subject to the courts with jurisdiction in Mumbai, India.</p></main></SiteShell> }
