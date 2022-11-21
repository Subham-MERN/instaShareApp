import './index.css'

const UserProfilePosts = props => {
  const {item} = props
  const {image} = item
  return (
    <li className="user-posts-list-item">
      <img src={image} alt="user post" className="user-post-img" />
    </li>
  )
}
export default UserProfilePosts
