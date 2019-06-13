declare module 'vtex.render-runtime' {
  import { Component, ComponentType, ReactElement, ReactType } from 'react'
  export { Helmet } from 'react-helmet'

  export interface RenderContext {
    culture: {
      locale: string
      currency: string
    }
  }

  export const NoSSR: ReactElement
  export const canUseDOM: boolean

  export const useRuntime = () => RenderContext
}
