import React, { useState } from 'react'

const BlogPost = ({ blog, blogService }) => {
  const [buttonText, setButtonText] = useState('view')
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const toggleView = () => {
    setButtonText(buttonText === 'view' ? 'hide' : 'view')
  }

  const blogLiked = async (event) => {
    try {
      event.preventDefault()
      const newObject = {
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }
      const updatedBlog = await blogService.update(blog.id, newObject)
      setBlogLikes(blog.likes + 1)
    } catch (error) {
      console.error('Error updating blog:', error)
    }
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
            Likes {blogLikes} <button onClick={blogLiked}>like</button>
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
