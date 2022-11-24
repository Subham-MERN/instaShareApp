import './index.css'

const CommentsSection = props => {
  const {item} = props

  const x = {
    userName: item.user_name,
    comment: item.comment,
  }
  const {userName, comment} = x
  return (
    <li className="comment-list-item user-text">
      <span className="user-comment-text">{userName}</span>
      <p className="cmment-text-para">{comment}</p>
    </li>
  )
}
export default CommentsSection
