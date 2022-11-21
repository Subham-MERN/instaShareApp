import './index.css'

const UserStories = props => {
  const {item} = props
  const {image} = item
  return (
    <li className="user-story-list-item">
      <img src={image} alt="user story" className="user-stories-img" />
    </li>
  )
}
export default UserStories
