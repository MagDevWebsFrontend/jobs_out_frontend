// composables/useSeo.ts
import { useHead } from '#imports'

export function useSeo({ title, description, url, image, keywords = [] }: {
  title: string,
  description: string,
  url?: string,
  image?: string,
  keywords?: string[]
}) {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' }
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  })
}
