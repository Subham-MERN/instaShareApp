import {Component} from 'react'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStories from '../UserStories'
import UserProfilePosts from '../UserProfilePosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    userPostsList: [],
    apiStatus: apiStatusConstants.initial,
    userStoriesList: [],
    userPostPicsList: [],
  }

  componentDidMount() {
    this.getAllUserPosts()
  }

  getFormattedData = data => ({
    id: data.id,
    image: data.image,
  })

  getAllUserPosts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const userData = fetchedData.profile

      const updatedData = {
        id: userData.id,
        userId: userData.user_id,
        userName: userData.user_name,
        profilePic: userData.profile_pic,
        followersCount: userData.followers_count,
        followingCount: userData.following_count,
        userBio: userData.user_bio,
        postsCount: userData.posts_count,
        post: userData.post,
      }

      const updatedStoriesData = userData.stories.map(each =>
        this.getFormattedData(each),
      )
      const updatedPostPicData = userData.posts.map(each =>
        this.getFormattedData(each),
      )

      this.setState({
        userPostsList: updatedData,
        apiStatus: apiStatusConstants.success,
        userStoriesList: updatedStoriesData,
        userPostPicsList: updatedPostPicData,
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
    const {userPostsList, userStoriesList, userPostPicsList} = this.state
    const {
      postsCount,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userId,
      userBio,
    } = userPostsList

    return (
      <>
        <Header />
        <div className="userposts-container">
          <h1 className="user-profile-name-text">{userName}</h1>
          <div className="user-profile-top-card-mobile">
            <img
              src={profilePic}
              alt="user profile"
              className="user-profile-dp"
            />
            <div className="user-profile-top-card-desktop">
              <h1 className="user-text-desktop">{userName}</h1>
              <ul className="follow-details-desktop">
                <li className="count-cards-desktop">
                  <span className="numbers-text-desktop">{postsCount}</span>
                  posts
                </li>
                <li className="count-cards-desktop">
                  <span className="numbers-text-desktop">{followersCount}</span>
                  followers
                </li>
                <li className="count-cards-desktop">
                  <span className="numbers-text-desktop">{followingCount}</span>
                  following
                </li>
              </ul>
              <p className="user-Id-text-desktop">{userId}</p>
              <p className="bio-text-desktop">{userBio}</p>
            </div>

            <ul className="follow-details-card">
              <li className="count-cards">
                <span className="numbers-text">{postsCount}</span>
                <h1 className="value-text">Posts</h1>
              </li>
              <li className="count-cards">
                <span className="numbers-text">{followersCount}</span>
                <span className="value-text">followers</span>
              </li>
              <li className="count-cards">
                <span className="numbers-text">{followingCount}</span>
                <span className="value-text">following</span>
              </li>
            </ul>
          </div>
          <p className="user-Id-text">{userId}</p>
          <p className="bio-text">{userBio}</p>
          <ul className="user-stories-container">
            {userStoriesList.map(data => (
              <UserStories item={data} key={data.id} />
            ))}
          </ul>
        </div>
        <hr className="ruler2" />
        <div className="post-logo-card">
          <BsGrid3X3 />
          <h1 className="posts-txt">Posts</h1>
        </div>
        {postsCount === 0 ? (
          <div className="no-posts-card">
            <div className="bi-camera-logo-bg">
              <BiCamera />
            </div>
            <h1>No Posts Yet</h1>
          </div>
        ) : (
          <ul className="post-images-cards-list">
            {userPostPicsList.map(data => (
              <UserProfilePosts item={data} key={data.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="posts-error-view-container">
        <img
          src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1668753365/Group_7522_vzbr7v.png"
          alt="failure view"
          className="something-went-wrong-img"
        />
        <p className="product-failure-heading-text">
          Something went wrong. Please try again
        </p>

        <button
          type="button"
          onClick={this.getAllUserPosts}
          className="try-again-btn"
        >
          Try Again
        </button>
      </div>
    </>
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

export default MyProfile
