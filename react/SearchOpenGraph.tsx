import React, { Fragment } from 'react'
import { Helmet, canUseDOM } from 'vtex.render-runtime'

// eslint-disable-next-line no-var
declare var global: {
  __hostname__: string
  __pathname__: string
}

interface MetaTag {
  property: string
  content: string
}

function SearchOpenGraph(props: any) {
  const hasValues = Boolean(props.meta)

  if (!hasValues) {
    return null
  }

  const hostname = canUseDOM ? window.location.hostname : global.__hostname__
  const pathname = canUseDOM ? window.location.pathname : global.__pathname__
  const url = `https://${hostname}${pathname}`
  const { title, description } = props.meta

  // TODO: Add support for og:image property
  const metaTags: MetaTag[] = [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:url', content: url },
    { property: 'og:description', content: description ?? '' },
  ]

  return (
    <Fragment>
      <Helmet meta={metaTags} />
    </Fragment>
  )
}

export default SearchOpenGraph
