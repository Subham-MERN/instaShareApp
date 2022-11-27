import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import Cookies from 'js-cookie'
import CommentsSection from '../CommentsSection'

import './index.css'

class PostsLibrary extends Component {
  state = {isLiked: false}

  changeLikeBtn = async () => {
    const {item, increaseLike} = this.props
    const {postId} = item
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeStatus = {like_status: true}

    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatus),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const msg = data.message
    console.log(msg)
    this.setState({isLiked: true})
    increaseLike(postId)
  }

  changeUnLikeBtn = async () => {
    const {item, decreaseLike} = this.props
    const {postId} = item

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeStatus = {like_status: false}

    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatus),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const msg = data.message
    console.log(msg)

    this.setState({isLiked: false})
    decreaseLike(postId)
  }

  render() {
    const {item} = this.props

    const {isLiked} = this.state

    const {
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      createdAt,
      userId,
    } = item
    const x = {
      imageUrl: postDetails.image_url,
      caption: postDetails.caption,
    }
    const {imageUrl, caption} = x
    const iconStyles = {fontSize: '1.9em'}

    return (
      <li className="posts-container">
        <div className="dp-name-container">
          <div className="dp-image-card">
            <img
              src={profilePic}
              alt="post author profile"
              className="dp-img"
            />
          </div>
          <Link className="user-link" to={`/users/${userId}`}>
            <p className="dp-text">{userName}</p>
          </Link>
        </div>
        <img src={imageUrl} className="posts-img" alt="post" />
        <ul className="icons-container">
          <li className="button-list">
            {isLiked ? (
              <button
                type="button"
                testid="unLikeIcon"
                className="post-list-btns"
                onClick={this.changeUnLikeBtn}
              >
                <FcLike style={iconStyles} />
              </button>
            ) : (
              <button
                type="button"
                testid="likeIcon"
                className="post-list-btns"
                onClick={this.changeLikeBtn}
              >
                <BsHeart style={iconStyles} />
              </button>
            )}
          </li>
          <li className="button-list">
            <button type="button" className="post-list-btns">
              <FaRegComment style={iconStyles} />
            </button>
          </li>
          <li className="button-list">
            <button type="button" className="post-list-btns">
              <BiShareAlt style={iconStyles} />
            </button>
          </li>
        </ul>
        <ul className="post-bottom-section-container">
          <li className="likes-text">
            <p>{likesCount} likes</p>
          </li>
          <li>
            <p className="caption-text">{caption}</p>
          </li>
          {comments.map(each => (
            <CommentsSection item={each} key={each.user_id} />
          ))}
          <li>
            <p className="time-text">{createdAt}</p>
          </li>
        </ul>
      </li>
    )
  }
}

export default PostsLibrary
