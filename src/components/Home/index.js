import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import StoriesSection from '../StoriesSection'
import PostsSection from '../PostsSection'
import SearchResults from '../SearchResults'
import ConfigurationContext from '../../context/ConfigurationContext'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const renderHome = () => (
    <ConfigurationContext.Consumer>
      {value => {
        const {searchActive, searchInput} = value

        return (
          <>
            <Header />
            {searchActive ? (
              <SearchResults val={searchInput} />
            ) : (
              <>
                <StoriesSection />
                <hr className="ruler" />
                <PostsSection />
              </>
            )}
          </>
        )
      }}
    </ConfigurationContext.Consumer>
  )

  return renderHome()
}

export default Home
