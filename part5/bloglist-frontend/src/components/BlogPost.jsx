import React, { useState } from 'react'

const BlogPost = ({ blog }) => {
  const [buttonText, setButtonText] = useState('view')

  const toggleView = () => {
    setButtonText(buttonText === 'view' ? 'hide' : 'view')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleView}>{buttonText}</button>

      {buttonText !== 'view' && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            Likes {blog.likes} <button>like</button>
          </div>
          <div>
            {blog.author}
          </div>
        </div>
      )}

    </div>
  )
}

export default BlogPost
