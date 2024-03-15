import React from 'react'
import MessagePopup from './MessagePopup'
import Logout from './Logout'
import CreateBlog from './CreateBlog'
import Blog from './Blog'

const AllBlogs = ({
  blogs, username, handleLogout, createBlog, newBlog, handleInputChange, alertMessage, alertColor
}) => {
  const [isCreating, setIsCreating] = useState(false)

  const showCreateBlog = () => setIsCreating(true)
  const hideCreateBlog = () => setIsCreating(false)

  return (
    <>
      <h1>Blogs</h1>
      {username} logged in <button onClick={handleLogout}>logout</button>
      <button onClick={showCreateBlog} style={{ display: isCreating ? 'none' : 'block' }}>
        new blog
      </button>
      {isCreating && 
        <CreateBlog 
          createBlog={(event) => { createBlog(event); hideCreateBlog(); }} 
          newBlog={newBlog} 
          handleInputChange={handleInputChange} 
          handleCancel={hideCreateBlog} 
        />
      }
      {/* List blogs here */}
      {alertMessage && <div style={{ color: alertColor }}>{alertMessage}</div>}
    </>
  )
}

export default AllBlogs