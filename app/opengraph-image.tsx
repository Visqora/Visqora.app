import { renderOgImage, ogSize, ogContentType } from '@/lib/og-image'

export const alt = 'Visqora Technologies — Vision at the Core'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: 'Custom software · AI · Automation',
    title: 'We turn business problems into working technology.',
  })
}
