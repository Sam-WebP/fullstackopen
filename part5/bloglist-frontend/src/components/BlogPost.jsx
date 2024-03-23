import React, { useState } from 'react'

const BlogPost = ({ blog, blogService }) => {
  const [buttonText, setButtonText] = useState('view')
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const [blogDeleted, setBlogDeleted] = useState(null)

  const toggleView = () => {
    setButtonText(buttonText === 'view' ? 'hide' : 'view')
    console.log("🚀 ~ toggleView ~ blog:", blog)
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
      await blogService.update(blog.id, newObject)
      setBlogLikes(blog.likes + 1)
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const removeBlog = async (event) => {
    try {
      event.preventDefault()

      if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog)
        setBlogDeleted(true)
      }
      
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
    <>
      {!blogDeleted && (
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleView}>{buttonText}</button>
          {buttonText !== 'view' && (
            <>
              <div>
                {blog.url}
              </div>
              <div>
                Likes {blogLikes} <button onClick={blogLiked}>like</button>
              </div>
              <div>
                {blog.user ? (
                  <div>Posted by {blog.user.username}</div>
                ) : (
                  <div>Posted by Anonymous</div>
                )}
              </div>
              <div>
                <button onClick={removeBlog}>Remove</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default BlogPost
