import './index.css'

const NotFound = props => {
  const onClickGoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dttk0z3nc/image/upload/v1668793462/erroring_2_ep5hmb.png"
        alt="page not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found <br />
        Please go back to the homepage
      </p>

      <button className="return-home-btn" type="button" onClick={onClickGoHome}>
        Home Page
      </button>
    </div>
  )
}

export default NotFound
