import React from 'react'

const CreateBlog = ({ createBlog, newBlog, handleInputChange, handleCancel }) => {
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
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
       </> 
    )
  }

  export default CreateBlog