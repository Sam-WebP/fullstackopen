import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import AllBlogs from './components/AllBlogs'
import React from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertColor, setAlertColor] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const confirmUser = await loginService.loginUser(username, password)
      console.log("🚀 ~ handleLogin ~ confirmUser:", confirmUser)
      window.localStorage.setItem('loggedInUser', JSON.stringify(confirmUser))
      blogService.setToken(confirmUser.token)
      setUser(confirmUser)
      setUsername(confirmUser.username)
      setPassword('')
      setAlertMessage(null)
    } catch (error) {
      console.error("Login failed:", error)
      setAlertColor('red')
      setAlertMessage('wrong username or password')
      return
    }
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
    if (user && user.token) {
      const createdBlog = await blogService.create(newBlog, user.token)
      console.log('Blog added:', createdBlog)
      setAlertMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setAlertColor('green')
      setNewBlog({ title: '', author: '', url: '' })
      setBlogs([...blogs, createdBlog])
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
       alertMessage={alertMessage}
       alertColor={alertColor}
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
          alertMessage={alertMessage}
          alertColor={alertColor}
        />
      </>
    )}
    </div>
  )
}

export default App