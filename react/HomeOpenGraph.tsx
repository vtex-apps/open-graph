import React, { Fragment } from 'react'
import {
  Helmet,
  useRuntime,
  RenderContext,
  canUseDOM,
} from 'vtex.render-runtime'

// eslint-disable-next-line no-var
declare var global: {
  __hostname__: string
  __pathname__: string
}

interface MetaTag {
  property: string
  content: string
}

function HomeOpenGraph() {
  const runtime = useRuntime() as RenderContext

  const { getSettings } = runtime

  const hostname = canUseDOM ? window.location.hostname : global.__hostname__
  const pathname = canUseDOM ? window.location.pathname : global.__pathname__
  const url = `https://${hostname}${pathname}`
  let title = ''
  let description = ''

  try {
    const settings = getSettings('vtex.store')

    if (settings) {
      const { storeName, titleTag, metaTagDescription } = settings

      title = titleTag ?? storeName
      description = metaTagDescription
    }
  } catch (e) {
    console.error('Failed to load store settings.', e)
  }

  // TODO: Add og:image tag, which should be customizable via admin
  const metaTags: MetaTag[] = [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:url', content: url },
    { property: 'og:description', content: description },
  ]

  return (
    <Fragment>
      <Helmet meta={metaTags} />
    </Fragment>
  )
}

export default HomeOpenGraph
