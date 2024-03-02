const dummy = (blogs) => {
  return blogs.length ** 0
}

const favouriteBlog = (blogs) => {
  let highestLikes = 0
  blogs.map(blog => {
    if (blog.likes >= highestLikes) {
      highestLikes = blog.likes
    }
  })

  const highestBlogIndex = blogs.findIndex(blog => 
    blog.likes === highestLikes
  )

  return {
    title: blogs[highestBlogIndex].title,
    author: blogs[highestBlogIndex].author,
    likes: blogs[highestBlogIndex].likes
  }
}

module.exports = {
  dummy,
  favouriteBlog,
}