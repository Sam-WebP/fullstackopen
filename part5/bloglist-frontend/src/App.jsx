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
    blogService.getAll()
      .then(blogs => {
        // console.log(blogs) // Check the structure here
        setBlogs(blogs)
      })
      .catch(error => {
        console.log('Error getting all blogs', error)
      })
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

      {!userLoggedIn && (
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
      )}

      {userLoggedIn && (
        <>
          <h1>Blogs</h1>
          <p>{username} is logged in <button onClick={handleLogout}>logout</button></p>

          {createBlogVisible && (
            <CreateBlog
              handleCancel={handleCancel}
              setAlertMessage={setAlertMessage}
              setAlertColor={setAlertColor}
              setBlogs={setBlogs}
              user={user}
              blogService={blogService}
              blogs={blogs}
            />
          )}

          {!createBlogVisible && (
            <button onClick={() => setCreateBlogVisible(true)}>
              new blog
            </button>
          )}

          <DisplayBlogs
            blogs={blogs}
            alertMessage={alertMessage}
            alertColor={alertColor}
            blogService={blogService}
          />
        </>
      )}

    </div>
  )
}

export default App