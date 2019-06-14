import React, { Fragment, FunctionComponent } from 'react'

export const Helmet: FunctionComponent<HelmetProps> = ({ meta }) => {
  return (
    <Fragment>
      {meta.map(tag => (
        <span key={tag.property + tag.content} data-testid={tag.property}>
          {tag.content}
        </span>
      ))}
    </Fragment>
  )
}

interface HelmetProps {
  meta: MetaTag[]
}

interface MetaTag {
  property: string
  content: string
}

export const useRuntime = () => ({
  culture: {
    locale: 'en-US',
    currency: 'USD',
  },
})
