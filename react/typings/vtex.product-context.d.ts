declare module 'vtex.product-context' {
  import { ContextType } from 'react'

  interface ProductContext {
    product: Product
    selectedItem: SKU
  }

  interface Product {
    productName: string
    productId: string
    description: string
    titleTag: string
    metaTagDescription: string
    linkText: string
    productReference: string
    categories: string[]
    categoryId: string
    categoriesIds: string[]
    categoryTree: {
      id: string
      name: string
      href: string
    }
    brand: string
    properties: Array<{
      name: string
      values: string
    }>
    specificationGroups: {
      name: string
      specifications: Array<{
        name: string
        values: string
      }>
    }
    items: SKU[]
    itemMetadata: {
      items: {
        id: string
        name: string
        imageUrl: string
        seller: string
      }
    }
    productClusters: Array<{
      id: string
      name: string
    }>
    clusterHighlights: Array<{
      id: string
      name: string
    }>
  }

  interface SKU {
    itemId: string
    name: string
    nameComplete: string
    complementName: string
    ean: string
    referenceId: Array<{
      Key
      Value
    }>
    measurementUnit: string
    unitMultiplier: string
    images: Array<{
      imageId: string
      imageLabel: string
      imageTag: string
      imageUrl: string
      imageText: string
    }>
    sellers: Array<{
      sellerId: string
      sellerName: string
      addToCartLink: string
      sellerDefault: string
      commertialOffer: {
        discountHighlights: {
          name: string
        }
        Price: string
        ListPrice: string
        spotPrice: string
        PriceWithoutDiscount: string
        RewardValue: string
        PriceValidUntil: string
        AvailableQuantity: number
        Tax: string
        CacheVersionUsedToCallCheckout: string
        Installments: Array<{
          Value: number
          InterestRate: number
          TotalValuePlusInterestRate: number
          NumberOfInstallments: number
          Name: string
        }>
      }
    }>
    variations: Array<{
      name: string
      values: string
    }>
  }

  export const ProductContext: Context<ProductContext>
}
