import React from 'react'
import { useState } from 'react'
import BlogPost from './BlogPost'

const DisplayBlogs = ({
  blogs,
  alertMessage,
  alertColor,
  blogService
  }) => {

  return (
    <>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => <BlogPost key={blog.id} blog={blog} blogService={blogService}/>)}
      <div>
        {alertMessage && <div style={{ color: alertColor }}>{alertMessage}</div>}
      </div>
    </>
  )
}

export default DisplayBlogs
  