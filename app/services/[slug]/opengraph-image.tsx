import { renderOgImage, ogSize, ogContentType } from '@/lib/og-image'
import { getService } from '@/lib/services'

export const alt = 'Visqora Technologies service'
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  return renderOgImage({
    eyebrow: 'Service',
    title: service ? service.promise : 'Technology that works the way your business does.',
  })
}
