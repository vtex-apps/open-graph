import { useQuery } from 'react-apollo'

import GET_SETTINGS from '../queries/getSettings.graphql'

const DEFAULT_DISABLE_OFFERS = false

interface Settings {
  disableOffers: boolean
}

const useAppSettings = (): Settings => {
  const { data } = useQuery(GET_SETTINGS)

  if (data?.publicSettingsForApp?.message) {
    const { disableOffers } = JSON.parse(data.publicSettingsForApp.message)

    return {
      disableOffers: disableOffers || DEFAULT_DISABLE_OFFERS,
    }
  }

  return {
    disableOffers: DEFAULT_DISABLE_OFFERS,
  }
}

export default useAppSettings
