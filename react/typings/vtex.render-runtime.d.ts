declare module 'vtex.render-runtime' {
  import { Component, ComponentType, ReactElement, ReactType } from 'react'
  export { Helmet } from 'react-helmet'

  export interface RenderContextProps {
    runtime: any
  }

  export const NoSSR: ReactElement
  export const canUseDOM: boolean

}
