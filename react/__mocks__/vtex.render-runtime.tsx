import React, { Fragment, FunctionComponent } from 'react'

export const Helmet: FunctionComponent<HelmetProps> = ({ meta }) => {
  return (
    <Fragment>
      {meta.map(tag => (
        <span key={tag.name + tag.content} data-testid={tag.name}>
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
  name: string
  content: string
}

export const useRuntime = () => ({
  culture: {
    locale: 'en-US',
    currency: 'USD',
  },
})
