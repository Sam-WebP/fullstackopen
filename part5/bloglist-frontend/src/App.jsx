import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import DisplayBlogs from './components/DisplayBlogs'
import CreateBlog from './components/CreateBlog'
import React from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertColor, setAlertColor] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(window.localStorage.getItem('loggedInUser'))

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
    setCreateBlogVisible(false)
    setUserLoggedIn(false)
  }

  return (
    <div>
      <div style={userLoggedIn ? { display : 'none' } : {}}>
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
          alertColor={alertColor}
          setUser={setUser}
          setAlertColor={setAlertColor}
          setUserLoggedIn={setUserLoggedIn}
        /> 
      </div>

      <div style={!userLoggedIn ? { display : 'none' } : {}}>
        <DisplayBlogs 
          blogs={blogs} 
          alertMessage={alertMessage}
          alertColor={alertColor}
        />
      </div>

      <div style={createBlogVisible || !userLoggedIn ? { display: 'none' } : {}}>
        <button onClick={() => setCreateBlogVisible(true)}>
          new blog
        </button>
      </div>
      
      <div style={!createBlogVisible ? { display : 'none' } : {}}>
        <CreateBlog 
          handleCancel={handleCancel}
          setAlertMessage={setAlertMessage}
          setAlertColor={setAlertColor}
          setBlogs={setBlogs}
          user={user}
          blogService={blogService}
          blogs={blogs}
        />
      </div>

      <div style={!userLoggedIn ? { display : 'none' } : {}}>
        <button onClick={handleLogout}>logout</button>
      </div>
    
    </div>
  )
}

export default App