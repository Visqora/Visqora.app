'use client'

import Link from 'next/link'

export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1437] px-5 text-center text-white">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.22em] text-[#13b8e0]">Something went wrong</p>
        <h1 className="mt-4 text-5xl font-extrabold">We lost the thread.</h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-white/60">Try loading this page again. If the problem continues, let us know.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={retry} className="min-h-11 rounded-full bg-white px-5 py-3 font-bold text-[#0b1437]">Try again</button>
          <Link className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 py-3 font-bold" href="/contact">Contact us</Link>
        </div>
      </div>
    </main>
  )
}