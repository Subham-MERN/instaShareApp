import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import PostsLibrary from '../PostsLibrary'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchResults extends Component {
  state = {
    postsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {val} = this.props

    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${val}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: each.post_details,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))

      this.setState({
        postsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  increaseLike = uid => {
    this.setState(prevState => ({
      postsList: prevState.postsList.map(eachItem => {
        if (uid === eachItem.postId) {
          const updatedLikeCount = eachItem.likesCount + 1
          return {...eachItem, likesCount: updatedLikeCount}
        }
        return eachItem
      }),
    }))
  }

  decreaseLike = uid => {
    this.setState(prevState => ({
      postsList: prevState.postsList.map(eachItem => {
        if (uid === eachItem.postId) {
          const updatedLikeCount = eachItem.likesCount - 1
          return {...eachItem, likesCount: updatedLikeCount}
        }
        return eachItem
      }),
    }))
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccessCardView = () => {
    const {postsList} = this.state
    let k = ''
    if (postsList.length > 0) {
      k = (
        <>
          <h1 className="search-title-text">Search Results</h1>
          <ul className="posts-card">
            {postsList.map(each => (
              <PostsLibrary
                item={each}
                key={each.postId}
                increaseLike={this.increaseLike}
                decreaseLike={this.decreaseLike}
              />
            ))}
          </ul>
        </>
      )
    } else {
      k = (
        <div className="search-error-view-container">
          <img
            src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1669221244/Group_htb79t.png"
            alt="search not found"
            className="search-failure-img"
          />
          <h1 className="no-results-heading">Search Not Found</h1>
          <p className="no-results-para">
            Try different keyword or search again
          </p>
        </div>
      )
    }

    return k
  }

  renderFailureView = () => (
    <div className="posts-error-view-container">
      <img
        src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1668665697/Icon_uom79e.svg"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="product-failure-heading-text">
        Something went wrong. Please try again
      </h1>

      <button
        type="button"
        onClick={this.getAllPosts}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessCardView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return this.renderAllProducts()
  }
}

export default SearchResults
