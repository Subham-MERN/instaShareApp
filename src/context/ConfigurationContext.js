import React from 'react'

const ConfigurationContext = React.createContext({
  searchInput: '',
  searchActive: false,
  changeSearchValue: () => {},
  onClickChangeSearchStatus: () => {},
})

export default ConfigurationContext
