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

class PostsSection extends Component {
  state = {
    postsList: [],
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
  }

  componentDidMount() {
    this.getAllPosts()
  }

  getAllPosts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

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

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccessCardView = () => {
    const {postsList, isLiked} = this.state

    return (
      <ul className="posts-card">
        {postsList.map(each => (
          <PostsLibrary
            item={each}
            key={each.postId}
            changeLikeStatus={this.changeLikeStatus}
            isLiked={isLiked}
          />
        ))}
      </ul>
    )
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
        return null
    }
  }

  render() {
    return this.renderAllProducts()
  }
}

export default PostsSection
