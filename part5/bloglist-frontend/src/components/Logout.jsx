import React from 'react'

const Logout = ({ username, handleLogout }) => {
  return (
    <>
      <div>
        {username} logged in <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Logout