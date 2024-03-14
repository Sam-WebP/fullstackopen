// Token Broken when refreshing after logging in after the username db auth update
// Need to update to make the user only login if the password is correct
//  
// 

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

const AllBlogs = ({ blogs, username, handleLogout, createBlog, newBlog, handleInputChange }) => {
  return (
    <>
      <h2>Blogs</h2>
        <Logout username={username} handleLogout={handleLogout} />
        <br />
        <CreateBlog createBlog={createBlog} newBlog={newBlog} handleInputChange={handleInputChange} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </>
  )
}

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
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    
    const confirmUser = await loginService.loginUser(username, password)
    console.log("🚀 ~ handleLogin ~ confirmUser:", confirmUser)

    // const mockUser = {
    //   username: username,
    //   token: 'mock-token'
    // }
    
    window.localStorage.setItem('loggedInUser', JSON.stringify(confirmUser))
    blogService.setToken(confirmUser.token)
    setUser(confirmUser)
    setUsername(confirmUser.username)
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    console.log("Account Logged Out")
  }

  const createBlog = async (event) => {
    event.preventDefault()
    if (user && user.token) { // Ensure user and token exist
      const createdBlog = await blogService.create(newBlog, user.token); // Use user.token
      console.log('Blog added:', createdBlog)
      setNewBlog({ title: '', author: '', url: '' }) // Reset newBlog state
      setBlogs([...blogs, createdBlog]) // Update the blogs state to include the new blog
    } else {
      console.error('Token is missing. User must be logged in to create a blog.')
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
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
     
      <>
        
        <AllBlogs 
          blogs={blogs} 
          username={username} 
          handleLogout={handleLogout}
          createBlog={createBlog}
          newBlog={newBlog}
          handleInputChange={handleInputChange}
           />
      </>
     
    )}
  
    </div>
  )
}

export default App