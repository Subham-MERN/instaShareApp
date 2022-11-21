import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import CommentsSection from '../CommentsSection'

import './index.css'

const PostsLibrary = props => {
  const {item, isLiked, changeLikeStatus} = props
  const {
    userName,
    profilePic,
    postDetails,
    likesCount,
    comments,
    createdAt,
    postId,
    userId,
  } = item

  const x = {
    imageUrl: postDetails.image_url,
    caption: postDetails.caption,
  }

  const {imageUrl, caption} = x
  const iconStyles = {fontSize: '1.9em'}

  const changeLikeBtn = async () => {
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeStatus = {like_status: isLiked}

    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatus),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.message)
  }

  return (
    <li className="posts-container">
      <div className="dp-name-container">
        <div className="dp-image-card">
          <img src={profilePic} alt="post author profile" className="dp-img" />
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
              className="post-list-btns"
              onClick={changeLikeBtn}
            >
              <FcLike style={iconStyles} />
            </button>
          ) : (
            <button
              type="button"
              className="post-list-btns"
              onClick={changeLikeBtn}
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
        <li className="likes-text">{likesCount} likes</li>
        <li>
          <p className="caption-text">{caption}</p>
        </li>
        {comments.map(each => (
          <CommentsSection item={each} key={each.user_id} />
        ))}
        <li className="time-text">{createdAt}</li>
      </ul>
    </li>
  )
}
export default PostsLibrary
