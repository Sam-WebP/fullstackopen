import React from 'react'

const CreateBlog = ({ createBlog, newBlog, handleInputChange }) => {
    return (
      <>
        <h2>Create New</h2>
        <form onSubmit={createBlog}>
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
          <button type="submit">Add Blog</button>
        </form>
       </> 
    )
  }

  export default CreateBlog