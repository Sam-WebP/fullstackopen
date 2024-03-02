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

const mostBlogs = (blogs) => {
  let tracker = []
  let maxBlogs = 0
  let maxAuthor = ''

  blogs.forEach(blog => {
    const authorIndex = tracker.findIndex(a => a.name === blog.author)
    if (authorIndex === -1) {
      tracker.push({ name: blog.author, blogs: 1 })
      if (1 > maxBlogs) {
        maxBlogs = 1
        maxAuthor = blog.author
      }
    } else {
      tracker[authorIndex].blogs += 1
      if (tracker[authorIndex].blogs > maxBlogs) {
        maxBlogs = tracker[authorIndex].blogs
        maxAuthor = blog.author
      }
    }
  })

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  let tracker = []
  let highestLikes = 0
  let highestAuthor = ''

  blogs.forEach(blog => {
    const authorIndex = tracker.findIndex(a => a.name === blog.author)
    if (authorIndex === -1) {
      tracker.push({ name: blog.author, likes: blog.likes })
      if (highestLikes === 0) {
        highestLikes = blog.likes
        highestAuthor = blog.author
      }
    } else {
      tracker[authorIndex].likes += blog.likes
      if (tracker[authorIndex].likes > highestLikes) {
        highestLikes = tracker[authorIndex].likes
        highestAuthor = blog.author
      }
    }
  })

  return {
    author: highestAuthor,
    likes: highestLikes
  }
}

module.exports = {
  dummy,
  favouriteBlog,
  mostBlogs,
  mostLikes
}