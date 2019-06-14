import React, { useContext, Fragment } from 'react'
import {
  Helmet,
  useRuntime,
  RenderContext,
  canUseDOM,
} from 'vtex.render-runtime'
import { ProductContext, SKU } from 'vtex.product-context'

interface MetaTag {
  property: string
  content: string
}

declare var global: {
  __hostname__: string
  __pathname__: string
}

function ProductOpenGraph() {
  const productContext = useContext(ProductContext) as ProductContext
  const runtime = useRuntime() as RenderContext

  const hasValue = productContext && productContext.product

  if (!hasValue) {
    return null
  }

  const { product, selectedItem } = productContext
  const {
    culture: { currency },
  } = runtime

  const hostname = canUseDOM ? window.location.hostname : global.__hostname__
  const pathname = canUseDOM ? window.location.pathname : global.__pathname__
  const url = `https://${hostname}${pathname}`

  const metaTags = [
    { property: 'og:type', content: 'product' },
    { property: 'og:title', content: product.titleTag },
    { property: 'og:url', content: url },
    selectedItem
      ? { property: 'product:sku', content: selectedItem.itemId }
      : null,
    { property: 'product:condition', content: 'new' },
    { property: 'product:brand', content: product.brand },
    { property: 'product:retailer_item_id', content: product.productReference },
    { property: 'product:price:currency', content: `${currency}` },
    ...productImage(selectedItem),
    productAvailability(selectedItem),
    productPrice(selectedItem),
  ].filter(Boolean) as MetaTag[]

  return (
    <Fragment>
      <Helmet meta={metaTags} />
    </Fragment>
  )
}

function productImage(selectedItem?: SKU): (MetaTag | {})[] {
  if (!selectedItem) {
    return []
  }

  const LIMIT_IMAGES = 3

  return selectedItem.images
    .slice(0, LIMIT_IMAGES)
    .reduce<MetaTag[]>(
      (acc, image) => [
        ...acc,
        { property: 'og:image', content: image.imageUrl },
      ],
      []
    )
}

function productAvailability(selectedItem?: SKU): MetaTag {
  const seller =
    selectedItem &&
    selectedItem.sellers.find(
      ({ commertialOffer }) => commertialOffer.AvailableQuantity > 0
    )

  const availability = seller ? 'instock' : 'oos'

  return { property: 'product:availability', content: `${availability}` }
}

function productPrice(selectedItem?: SKU): MetaTag | null {
  const seller =
    selectedItem &&
    selectedItem.sellers.find(
      ({ commertialOffer }) => commertialOffer.AvailableQuantity > 0
    )

  if (!seller) {
    return null
  }

  return {
    property: 'product:price:amount',
    content: `${seller.commertialOffer.Price}`,
  }
}

export default ProductOpenGraph
