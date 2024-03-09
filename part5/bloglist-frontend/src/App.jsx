import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import React from 'react'

const Login = ({ username, password, handleLogin, user }) => {


  return (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

}

const AllBlogs = ({ blogs }) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h2>blogs</h2>

      {user === null && <Login username={username} password={password} handleLogin={handleLogin} user={user} />}
      {user !== <AllBlogs blogs={blogs} />}
  
      
    </div>
  )
}

export default App