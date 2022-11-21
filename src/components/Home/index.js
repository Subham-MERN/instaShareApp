import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'
import StoriesSection from '../StoriesSection'
import PostsSection from '../PostsSection'
import SearchResults from '../SearchResults'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const searchActive = false

  return (
    <>
      <Header />
      {searchActive ? (
        <SearchResults />
      ) : (
        <>
          <StoriesSection />
          <hr className="ruler" />
          <PostsSection />
        </>
      )}
    </>
  )
}

export default Home
