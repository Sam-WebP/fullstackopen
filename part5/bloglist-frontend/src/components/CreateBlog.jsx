import React from 'react'
import { useState } from 'react'

const CreateBlog = ({ 
  handleCancel,
  setAlertColor,
  setBlogs,
  user,
  blogService,
  blogs,
  setAlertMessage
}) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    if (user && user.token) {
      const createdBlog = await blogService.create(newBlog, user.token)
      console.log('Blog added:', createdBlog)
      setAlertMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setAlertColor('green')
      setNewBlog({ title: '', author: '', url: '' })
      setBlogs([...blogs, createdBlog])
    } else {
      console.error('Token is missing. User must be logged in to create a blog.')
    }
  }

    return (
      <>
        <h2>Create New</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            <label>Title:</label>
            <input
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              name="author"
              value={newBlog.author}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>URL:</label>
            <input
              name="url"
              value={newBlog.url}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
       </> 
    )
  }

  export default CreateBlog