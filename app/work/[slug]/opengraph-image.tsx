import { renderOgImage, ogSize, ogContentType } from '@/lib/og-image'
import { getProject } from '@/lib/projects'

export const alt = 'Visqora Technologies project'
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  return renderOgImage({
    eyebrow: project ? project.label : 'Our work',
    title: project ? project.title : 'Software and AI products by Visqora Technologies.',
  })
}
