'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

const emailAddress = 'visqora@gmail.com'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const company = String(formData.get('company') ?? '')
    const phone = String(formData.get('phone') ?? '')
    const service = String(formData.get('service') ?? '')
    const message = String(formData.get('message') ?? '')
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company: ${company}`,
      phone && `Phone: ${phone}`,
      `Service: ${service}`,
      '',
      message,
    ].filter(Boolean).join('\n')

    setSubmitted(true)
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`
  }

  const fieldClass = 'mt-2 w-full rounded-xl border border-[#dbe2ee] px-4 py-3 outline-none transition focus:border-[#3b58ec] focus:ring-2 focus:ring-[#3b58ec]/20'

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#e4e9f2] p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">Name*<input name="name" autoComplete="name" required className={fieldClass} placeholder="Your name" /></label>
        <label className="text-sm font-semibold">Email*<input name="email" autoComplete="email" required type="email" className={fieldClass} placeholder="you@company.com" /></label>
        <label className="text-sm font-semibold">Company<input name="company" autoComplete="organization" className={fieldClass} placeholder="Company name" /></label>
        <label className="text-sm font-semibold">Phone<input name="phone" autoComplete="tel" type="tel" className={fieldClass} placeholder="+91 ..." /></label>
      </div>
      <label className="mt-5 block text-sm font-semibold">What can we help with?
        <select name="service" className={`${fieldClass} bg-white`}>
          <option>Not sure yet</option>
          <option>Web & mobile apps</option>
          <option>AI solutions</option>
          <option>Data & analytics</option>
          <option>Workflow automation</option>
          <option>Backend, APIs & cloud</option>
        </select>
      </label>
      <label className="mt-5 block text-sm font-semibold">Tell us a little more*<textarea name="message" required rows={5} className={`${fieldClass} resize-none`} placeholder="What are you trying to improve?" /></label>
      <button type="submit" className="mt-6 min-h-12 w-full rounded-full bg-[#3b58ec] px-6 py-4 font-bold text-white transition hover:bg-[#304bd4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b58ec] focus-visible:ring-offset-2">Draft email <ArrowRight className="ml-2 inline h-4 w-4" /></button>
      <p className="mt-3 text-sm text-[#5b6478]">This opens your email app with the enquiry filled in. Nothing is stored by this website.</p>
      {submitted && <p role="status" className="mt-3 text-sm font-semibold text-[#168963]">Your email app should now be open. Send the draft to complete your enquiry.</p>}
    </form>
  )
}