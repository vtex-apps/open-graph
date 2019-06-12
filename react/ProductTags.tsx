import React, { FunctionComponent, useContext, Fragment } from 'react'
import { Helmet } from 'vtex.render-runtime'
import { ProductContext } from 'vtex.product-context'

interface MetaTag {
  name: string
  content: string
}

const FacebookOpenGraph: FunctionComponent = () => {
  const productContext = useContext(ProductContext)

  const metaTags: MetaTag[] = [
    { name: 'foo', content: 'a' }
  ]

  return (
    <Fragment>
      <Helmet meta={metaTags} />
    </Fragment>
  )
}

export default FacebookOpenGraph
