import React from 'react'

const ConfigurationContext = React.createContext({
  showSearchResults: false,

  onToggleShowContent: () => {},
})

export default ConfigurationContext
