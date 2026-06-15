import { useQuery } from 'react-apollo'

import GET_SETTINGS from '../queries/getSettings.graphql'

const DEFAULT_DISABLE_OFFERS = false

interface Settings {
  disableOffers: boolean
  loading: boolean
}

const useAppSettings = (): Settings => {
  const { data, loading } = useQuery(GET_SETTINGS, { ssr: true })

  if (data?.publicSettingsForApp?.message) {
    const { disableOffers } = JSON.parse(data.publicSettingsForApp.message)

    return {
      disableOffers: disableOffers || DEFAULT_DISABLE_OFFERS,
      loading: false,
    }
  }

  return {
    disableOffers: DEFAULT_DISABLE_OFFERS,
    loading,
  }
}

export default useAppSettings
