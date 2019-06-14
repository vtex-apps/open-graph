declare module 'vtex.render-runtime' {
  export { Helmet } from 'react-helmet'

  export interface RenderContext {
    culture: {
      locale: string
      currency: string
    }
  }

  export const NoSSR: ReactElement
  export const canUseDOM: boolean

  export function useRuntime(): RenderContext
}
