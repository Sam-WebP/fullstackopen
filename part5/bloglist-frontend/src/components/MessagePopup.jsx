import React from 'react'

const MessagePopup = ({ alertMessage, alertColor }) => {
  if (!alertMessage) return null

  const style = {
    color: alertColor,
    borderColor: alertColor,
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: '3px',
    margin: '3px',
  }

  return (
    <div style={style}>
      {alertMessage}
    </div>
  )
}

export default MessagePopup