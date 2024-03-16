import React from 'react'
import loginService from '/src/services/login'
import blogService from '/src/services/blogs'
import MessagePopup from './MessagePopup'

const Login = ({ 
  username, 
  password, 
  setUsername, 
  setPassword, 
  alertColor, 
  alertMessage,
  setUser,
  setAlertMessage,
  setAlertColor
  }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const confirmUser = await loginService.loginUser(username, password)
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

  return (
    <>
      <h2>Log in to application</h2>
      <MessagePopup alertColor={alertColor} alertMessage={alertMessage} />
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

export default Login