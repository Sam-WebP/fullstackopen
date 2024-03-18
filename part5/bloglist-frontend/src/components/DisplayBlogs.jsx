import React from 'react'

const DisplayBlogs = ({
  blogs,
  alertMessage,
  alertColor,
}) => {

return (
  <>
    {blogs.map(blog =>
      <div key={blog.id}>
        {blog.title} {blog.author} <button>view</button>
      </div>
    )}
    <div>
      {alertMessage && <div style={{ color: alertColor }}>{alertMessage}</div>}
    </div>
  </>
)
}

export default DisplayBlogs
  