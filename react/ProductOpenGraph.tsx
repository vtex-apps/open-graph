import React, { useContext, Fragment } from 'react'
import {
  Helmet,
  useRuntime,
  RenderContext,
  canUseDOM,
} from 'vtex.render-runtime'
import { ProductContext, SKU, Product } from 'vtex.product-context'

import useAppSettings from './hooks/useAppSettings'

// eslint-disable-next-line no-var
declare var global: {
  __hostname__: string
  __pathname__: string
}

interface MetaTag {
  property: string
  content: string
}

function ProductOpenGraph() {
  const { disableOffers } = useAppSettings()
  const productContext = useContext(ProductContext) as ProductContext
  const runtime = useRuntime() as RenderContext
  const hasValue = productContext?.product

  if (!hasValue) {
    return null
  }

  const { product, selectedItem } = productContext
  const {
    culture: { currency },
    getSettings,
  } = runtime

  const hostname = canUseDOM ? window.location.hostname : global.__hostname__
  const pathname = canUseDOM ? window.location.pathname : global.__pathname__
  const url = `https://${hostname}${pathname}`

  const { titleTag = '', productName = '' } = product || {}

  let title = titleTag || productName

try {
  
  const settings = getSettings('vtex.store')
  
    if (!settings.removeStoreNameTitle) {
      const { storeName, titleTag: storeTitleTag } = settings
      const suffix = (storeTitleTag || storeName) && ` - ${storeTitleTag || storeName}`
      
      if (suffix) {
        title += suffix
      }
    }
} catch (e) {
  
  console.error('Failed to suffix store name in title.', e)
  
}

  const metaTags = [
    { property: 'og:type', content: 'product' },
    { property: 'og:title', content: title },
    { property: 'og:url', content: url },
    { property: 'og:description', content: product.metaTagDescription },
    selectedItem
      ? { property: 'product:sku', content: selectedItem.itemId }
      : null,
    selectedItem
      ? { property: 'product:retailer_part_no', content: product.productId } // Used in the Synerise integration
      : null,
    { property: 'product:retailer_item_id', content: product.productReference },
    { property: 'product:condition', content: 'new' },
    { property: 'product:brand', content: product.brand },
    { property: 'product:price:currency', content: `${currency}` },
    ...productCategories(product),
    ...productImage(selectedItem),
    productPrice({ selectedItem, disableOffers }),
    productAvailability(selectedItem),
  ].filter(Boolean) as MetaTag[]

  return (
    <Fragment>
      <Helmet meta={metaTags} />
    </Fragment>
  )
}

function productImage(selectedItem?: SKU): Array<MetaTag | {}> {
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
  const seller = selectedItem?.sellers.find(
    ({ commertialOffer }) => commertialOffer.AvailableQuantity > 0
  )

  const availability = seller ? 'instock' : 'oos'

  return { property: 'product:availability', content: `${availability}` }
}

function productPrice({
  selectedItem,
  disableOffers,
}: {
  selectedItem?: SKU
  disableOffers: boolean
}): MetaTag | null {
  const seller = selectedItem?.sellers.find(
    ({ commertialOffer }) => commertialOffer.AvailableQuantity > 0
  )

  if (!seller) {
    return null
  }

  if (disableOffers) {
    return null
  }

  return {
    property: 'product:price:amount',
    content: `${seller.commertialOffer.spotPrice}`,
  }
}

function productCategories(product?: Product) {
  if (!product?.categories?.length) {
    return []
  }

  return product.categories.map(category => ({
    property: 'product:category',
    content: category,
  }))
}

export default ProductOpenGraph
