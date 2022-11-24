import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import ConfigurationContext from './context/ConfigurationContext'
import './App.css'

class App extends Component {
  state = {searchInput: '', searchActive: false}

  changeSearchValue = value => {
    this.setState({searchInput: value})
  }

  onClickChangeSearchStatus = () => {
    const {searchInput} = this.state

    if (searchInput !== '') {
      this.setState(prevState => ({
        searchActive: !prevState.searchActive,
      }))
    } else {
      this.setState({searchActive: false})
    }
  }

  render() {
    const {searchInput, searchActive} = this.state

    return (
      <ConfigurationContext.Provider
        value={{
          searchInput,
          searchActive,
          changeSearchValue: this.changeSearchValue,
          onClickChangeSearchStatus: this.onClickChangeSearchStatus,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </ConfigurationContext.Provider>
    )
  }
}

export default App
