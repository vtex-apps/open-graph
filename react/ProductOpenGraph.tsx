import React, { FunctionComponent, useContext, Fragment } from 'react'
import {
  Helmet,
  useRuntime,
  RenderContext,
  canUseDOM,
} from 'vtex.render-runtime'
import { ProductContext, SKU } from 'vtex.product-context'

interface MetaTag {
  name: string
  content: string
}

const ProductOpenGraph: FunctionComponent = () => {
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

  const hostname = canUseDOM ? location.hostname : (global as any).__hostname__
  const pathname = canUseDOM ? location.pathname : (global as any).__pathname__
  const url = `https://${hostname}${pathname}`

  const metaTags = [
    { name: 'og:type', content: 'product' },
    { name: 'og:title', content: product.titleTag },
    { name: 'og:url', content: url },
    selectedItem ? { name: 'product:sku', content: selectedItem.itemId } : null,
    { name: 'product:condition', content: 'new' },
    { name: 'product:brand', content: product.brand },
    { name: 'product:retailer_item_id', content: product.productReference },
    { name: 'product:price:currency', content: `${currency}` },
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

const productImage = (selectedItem?: SKU): (MetaTag | {})[] => {
  if (!selectedItem) {
    return []
  }

  const LIMIT_IMAGES = 3

  return selectedItem.images
    .slice(0, LIMIT_IMAGES)
    .reduce<MetaTag[]>(
      (acc, image) => [...acc, { name: 'og:image', content: image.imageUrl }],
      []
    )
}

const productAvailability = (selectedItem?: SKU): MetaTag => {
  const seller =
    selectedItem &&
    selectedItem.sellers.find(
      ({ commertialOffer }) => commertialOffer.AvailableQuantity > 0
    )

  const availability = seller ? 'instock' : 'oos'

  return { name: 'product:availability', content: `${availability}` }
}

const productPrice = (selectedItem?: SKU): MetaTag | null => {
  const seller =
    selectedItem &&
    selectedItem.sellers.find(
      ({ commertialOffer }) => commertialOffer.AvailableQuantity > 0
    )

  if (!seller) {
    return null
  }

  return {
    name: 'product:price:amount',
    content: `${seller.commertialOffer.Price}`,
  }
}

export default ProductOpenGraph
