import React from 'react'
import { render } from '@vtex/test-tools/react'
import { ProductContext } from 'vtex.product-context'

import ProductOpenGraph from '../ProductOpenGraph'
import useAppSettings from '../hooks/useAppSettings'

jest.mock('../hooks/useAppSettings', () => ({
  __esModule: true,
  default: jest.fn(() => ({ disableOffers: false, loading: false })),
}))

const mockUseAppSettings = useAppSettings as jest.MockedFunction<
  typeof useAppSettings
>

const renderComponent = (productContext: object) => {
  const helpers = render(
    <ProductContext.Provider value={productContext}>
      <ProductOpenGraph />
    </ProductContext.Provider>
  )

  return helpers
}

const priceProductContext = {
  product: {},
  selectedItem: {
    images: [],
    sellers: [
      {
        commertialOffer: {
          spotPrice: 10,
          AvailableQuantity: 1,
        },
      },
    ],
  },
}

test('should not render product:price:amount when disableOffers is true', () => {
  mockUseAppSettings.mockReturnValueOnce({ disableOffers: true, loading: false })
  const { queryByTestId } = renderComponent(priceProductContext)

  expect(queryByTestId('product:price:amount')).toBeNull()
})

test('should render product:price:amount when disableOffers is false', () => {
  const { getByTestId } = renderComponent(priceProductContext)

  expect(getByTestId('product:price:amount').innerHTML).toBe('10')
})

test('should have a brand', () => {
  const brand = 'Nike'
  const productContext = {
    product: {
      brand,
    },
  }

  const { getByTestId } = renderComponent(productContext)

  const tag = getByTestId('product:brand')

  expect(tag.innerHTML).toBe(brand)
})

test('should show availability with instock when it has item available', () => {
  const productContext = {
    product: {},
    selectedItem: {
      images: [{ imageUrl: '' }],
      sellers: [
        {
          commertialOffer: {
            AvailableQuantity: 1,
          },
        },
      ],
    },
  }

  const { getByTestId } = renderComponent(productContext)

  const tag = getByTestId('product:availability')

  expect(tag.innerHTML).toBe('instock')
})

test('should show availability with oos when no item is available', () => {
  const productContext = {
    product: {},
    selectedItem: {
      images: [{ imageUrl: '' }],
      sellers: [
        {
          commertialOffer: {
            AvailableQuantity: 0,
          },
        },
      ],
    },
  }

  const { getByTestId } = renderComponent(productContext)

  const tag = getByTestId('product:availability')

  expect(tag.innerHTML).toBe('oos')
})

test('should render price', () => {
  const spotPrice = 10
  const productContext = {
    product: {},
    selectedItem: {
      images: [{ imageUrl: '' }],
      sellers: [
        {
          commertialOffer: {
            spotPrice,
            AvailableQuantity: 1,
          },
        },
      ],
    },
  }

  const { getByTestId } = renderComponent(productContext)

  const tag = getByTestId('product:price:amount')

  expect(tag.innerHTML).toBe(`${spotPrice}`)
})

test('should render images', () => {
  const image1 = 'image_1'
  const image2 = 'image_2'
  const image3 = 'image_3'
  const image4 = 'image_4'

  const productContext = {
    product: {},
    selectedItem: {
      images: [
        { imageUrl: image1 },
        { imageUrl: image2 },
        { imageUrl: image3 },
        { imageUrl: image4 },
      ],
      sellers: [
        {
          commertialOffer: {
            AvailableQuantity: 1,
          },
        },
      ],
    },
  }

  const { getAllByTestId } = renderComponent(productContext)

  const tags = getAllByTestId('og:image')

  expect(tags).toHaveLength(3)
  expect(tags[0].innerHTML).toBe(image1)
  expect(tags[1].innerHTML).toBe(image2)
  expect(tags[2].innerHTML).toBe(image3)
})

test('should have all expected tags', () => {
  const title = 'Title'
  const brand = 'Nike'
  const refId = 'ref-1'
  const skuId = 'sku-1'
  const imageUrl = 'image-url'
  const description = 'Nice shoes'
  const spotPrice = 10.5

  const productContext = {
    product: {
      titleTag: title,
      brand,
      productReference: refId,
      metaTagDescription: description,
    },
    selectedItem: {
      itemId: skuId,
      images: [{ imageUrl }],
      sellers: [
        {
          commertialOffer: {
            spotPrice,
            AvailableQuantity: 1,
          },
        },
      ],
    },
  }

  const { getByTestId } = renderComponent(productContext)

  const value = (type: string) => getByTestId(type).innerHTML

  expect(value('og:type')).toBe('product')
  expect(value('og:title')).toBe(`${title} - Store Components`)
  expect(value('og:url')).toBeDefined()
  expect(value('og:description')).toBe(description)
  expect(value('product:sku')).toBe(skuId)
  expect(value('product:condition')).toBe('new')
  expect(value('product:brand')).toBe(brand)
  expect(value('product:retailer_item_id')).toBe(refId)
  expect(value('product:price:currency')).toBe('USD')
  expect(value('og:image')).toBe(imageUrl)
  expect(value('product:availability')).toBe('instock')
  expect(value('product:price:amount')).toBe(`${spotPrice}`)
})
