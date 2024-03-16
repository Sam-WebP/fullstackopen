import React from 'react'

const DisplayBlogs = ({
  blogs,
  alertMessage,
  alertColor,
}) => {

return (
  <>
    <h1>Blogs</h1>
    {blogs.map(blog =>
      <div key={blog.id}>{blog.title}</div>
    )}
    <div>
      {alertMessage && <div style={{ color: alertColor }}>{alertMessage}</div>}
    </div>
  </>
)
}

export default DisplayBlogs
  