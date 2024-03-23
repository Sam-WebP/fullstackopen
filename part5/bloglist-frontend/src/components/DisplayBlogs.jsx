import React from 'react'
import { useState } from 'react'
import BlogPost from './BlogPost'

const DisplayBlogs = ({
  blogs,
  alertMessage,
  alertColor,
  }) => {

  return (
    <>
      {blogs.map(blog => <BlogPost key={blog.id} blog={blog} />)}
      <div>
        {alertMessage && <div style={{ color: alertColor }}>{alertMessage}</div>}
      </div>
    </>
  )
}

export default DisplayBlogs
  