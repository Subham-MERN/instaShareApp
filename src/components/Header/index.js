import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import ConfigurationContext from '../../context/ConfigurationContext'

import './index.css'

class Header extends Component {
  state = {showContent: false, showSearchtab: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onToggleShowContent = () => {
    this.setState(prevState => ({showContent: !prevState.showContent}))
    this.setState({showSearchtab: false})
  }

  showSearchBar = () => {
    this.setState(prevState => ({
      showContent: !prevState.showContent,
      showSearchtab: !prevState.showSearchtab,
    }))
  }

  render() {
    const {showContent, showSearchtab} = this.state
    return (
      <>
        <nav className="nav-header">
          <div className="weblogo-and-title-container">
            <Link to="/" className="link-style">
              <img
                src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1668317679/Standard_Collection_8_x9wcuw.png"
                className="header-logo-img"
                alt="website logo"
              />
            </Link>
            <h1 className="header-title-text">Insta Share</h1>
          </div>
          <ul className="nav-item-desktop-container">
            <li>
              <ConfigurationContext.Consumer>
                {value => {
                  const {
                    searchInput,
                    changeSearchValue,
                    onClickChangeSearchStatus,
                  } = value
                  const onchangeSearchInput = event => {
                    changeSearchValue(event.target.value)
                  }
                  const onSubmitChangeStatus = event => {
                    event.preventDefault()
                    onClickChangeSearchStatus()
                  }

                  return (
                    <form
                      className="search-container"
                      onSubmit={onSubmitChangeStatus}
                    >
                      <input
                        type="search"
                        className="search-input"
                        value={searchInput}
                        placeholder="Search Caption"
                        onChange={onchangeSearchInput}
                      />
                      <button type="submit" className="search-desktop-btn">
                        <FaSearch />
                      </button>
                    </form>
                  )
                }}
              </ConfigurationContext.Consumer>
            </li>

            <Link className="link-mod home-link-text" to="/">
              <li>Home</li>
            </Link>

            <Link className="link-mod profile-link-text" to="/my-profile">
              <li>Profile</li>
            </Link>

            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="hamburger-icon"
            onClick={this.onToggleShowContent}
          >
            <img
              alt="abcd"
              src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1668420067/menu_foemdd.svg"
            />
          </button>
        </nav>
        {showSearchtab ? (
          <div className="searchBarTogglecontainer">
            <ConfigurationContext.Consumer>
              {value => {
                const {
                  searchInput,
                  changeSearchValue,
                  onClickChangeSearchStatus,
                } = value
                const onchangeSearchInput = event => {
                  changeSearchValue(event.target.value)
                }
                const onSubmitChangeStatus = event => {
                  event.preventDefault()
                  onClickChangeSearchStatus()
                }

                return (
                  <form
                    className="search-container"
                    onSubmit={onSubmitChangeStatus}
                  >
                    <input
                      type="search"
                      className="search-input"
                      value={searchInput}
                      placeholder="Search Caption"
                      onChange={onchangeSearchInput}
                    />
                    <button type="submit" className="search-desktop-btn">
                      <FaSearch />
                    </button>
                  </form>
                )
              }}
            </ConfigurationContext.Consumer>
          </div>
        ) : null}
        {showContent ? (
          <ul className="nav-item-mobile-container">
            <Link className="link-mod home-link-text" to="/">
              <li>Home</li>
            </Link>

            <li
              onClick={this.showSearchBar}
              className="link-mod search-link-text"
            >
              Search
            </li>

            <Link className="link-mod profile-link-text" to="/my-profile">
              <li>Profile</li>
            </Link>

            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <li>
              <button
                type="button"
                className="close-btn"
                onClick={this.onToggleShowContent}
              >
                <img
                  alt="close"
                  src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1668435229/Shape_cfnkud.svg"
                />
              </button>
            </li>
          </ul>
        ) : null}
      </>
    )
  }
}

export default withRouter(Header)
