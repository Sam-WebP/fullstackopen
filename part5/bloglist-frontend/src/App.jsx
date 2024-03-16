import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import DisplayBlogs from './components/DisplayBlogs'
import React from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertColor, setAlertColor] = useState(null)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      if (user && user.token) {
        setUser(user)
        setUsername(user.username)
        blogService.setToken(user.token)
      }

    }
  }, [])

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null) 
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [alertMessage])

  const handleCancel = () => {
    setCreateBlogVisible(false)
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
       setUsername={setUsername}
       setPassword={setPassword}
       alertMessage={alertMessage}
       alertColor={alertColor}
       setUser={setUser}
       setAlertColor={setAlertColor}
     />
    ) : (
      <>
        <DisplayBlogs 
          blogs={blogs} 
          alertMessage={alertMessage}
          alertColor={alertColor}
        />
      </>
    )}
    <button onClick={() => setCreateBlogVisible(true)} style={{ display: createBlogVisible ? 'none' : 'block' }}>
      new blog
    </button>
    {createBlogVisible && 
      <CreateBlog 
        newBlog={newBlog} 
        handleCancel={handleCancel}
        setNewBlog={setNewBlog}
        setAlertMessage={setAlertMessage}
        setAlertColor={setAlertColor}
        setBlogs={setBlogs}
        user={user}
        blogService={blogService}
        blogs={blogs} 
      />
    }
    <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default App