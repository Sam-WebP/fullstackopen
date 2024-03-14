import React from 'react'
import MessagePopup from './MessagePopup'

const Login = ({ username, password, handleLogin, setUsername, setPassword, alertColor, alertMessage }) => {

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