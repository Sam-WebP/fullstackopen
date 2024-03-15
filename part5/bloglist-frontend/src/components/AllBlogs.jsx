import React from 'react';
import CreateBlog from './CreateBlog';

const AllBlogs = ({
  blogs,
  createBlogVisible,
  setCreateBlogVisible,
  handleLogout,
  addBlog,
  newBlog,
  setNewBlog,
  alertMessage,
  alertColor
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog);
    setNewBlog({ title:
      '', author: '', url: '' });
    };
  
    const handleCancel = () => {
      setCreateBlogVisible(false);
    };
  
    return (
      <>
        <h1>Blogs</h1>
        {blogs.map(blog =>
          <div key={blog.id}>{blog.title}</div>
        )}
        <div>
          {alertMessage && <div style={{ color: alertColor }}>{alertMessage}</div>}
        </div>
        <button onClick={() => setCreateBlogVisible(true)} style={{ display: createBlogVisible ? 'none' : 'block' }}>
          new blog
        </button>
        {createBlogVisible && 
          <CreateBlog 
            createBlog={handleCreateBlog} 
            newBlog={newBlog} 
            handleInputChange={handleInputChange}
            handleCancel={handleCancel}
          />
        }
        <button onClick={handleLogout}>logout</button>
      </>
    );
  };
  
  export default AllBlogs;
  