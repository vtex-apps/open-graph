import React from 'react'
import { render } from '@vtex/test-tools/react'
import { ProductContext } from 'vtex.product-context'
import ProductTags from '../ProductTags'

const renderComponent = (product: any) => {
  const helpers = render(
    <ProductContext.Provider value={product}>
      <ProductTags />
    </ProductContext.Provider>
  )

  return helpers
}

test('should render', () => {
  const product = {}
  const { debug } = renderComponent(product)

  debug()
})