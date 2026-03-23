import { useParams } from 'react-router'
import { DocsWorkspace } from '~/components/docs/DocsWorkspace'

export default function DocsBySlug() {
  const params = useParams()
  const slug = params.slug ?? 'welcome-to-synchro'
  return <DocsWorkspace slug={slug} />
}
