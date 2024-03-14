import React from 'react'
import MessagePopup from './MessagePopup'
import Logout from './Logout'
import CreateBlog from './CreateBlog'
import Blog from './Blog'

const AllBlogs = ({ blogs, username, handleLogout, createBlog, newBlog, handleInputChange, alertColor, alertMessage }) => {
    return (
      <>
        <h2>Blogs</h2>
          <MessagePopup alertColor={alertColor} alertMessage={alertMessage} />
          <Logout username={username} handleLogout={handleLogout} />
          <br />
          <CreateBlog createBlog={createBlog} newBlog={newBlog} handleInputChange={handleInputChange} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </>
    )
  }

export default AllBlogs