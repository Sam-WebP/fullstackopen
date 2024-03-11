import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import React from 'react'

const Login = ({ username, password, handleLogin, setUsername, setPassword }) => {


  return (
    <>
      <h2>Log in to application</h2>
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
    </>
    
  )

}

const AllBlogs = ({ blogs, username, handleLogout }) => {
  return (
    <>
      <h2>blogs</h2>
        <Logout username={username} handleLogout={handleLogout} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </>
  )
}

const Logout = ({ username, handleLogout }) => {
  return (
    <>
      <div>
        {username} logged in <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    console.log("🚀 ~ useEffect ~ loggedUserJSON:", loggedUserJSON)

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("🚀 ~ useEffect ~ user:", user)

      if (user && user.token) {
        setUser(user)
        setUsername(user.username)
        blogService.setToken(user.token)
      }

    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    
    const mockUser = {
      username: username,
      token: 'mock-token'
    }
    
    window.localStorage.setItem('loggedInUser', JSON.stringify(mockUser))
    blogService.setToken(mockUser.token)
    setUser(mockUser)
    setUsername(mockUser.username)
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    console.log("Account Logged Out")
  }

  return (
    <div>

    {user === null ? (
     <Login
       username={username}
       password={password}
       handleLogin={handleLogin}
       setUsername={setUsername}
       setPassword={setPassword}
     />
    ) : (
     <AllBlogs blogs={blogs} username={username} handleLogout={handleLogout} />
    )}
  
    </div>
  )
}

export default App