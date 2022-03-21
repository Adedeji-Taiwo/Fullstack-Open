import React from 'react'

const Notification = ({message}) => {

     const color = message !== null && (message.includes("Deleted") || message.includes("removed") || message.includes("failed") ) ? true : false;


    if (message === null) {
        return null;
    }

  return (
    <div className= {color ? "error" : "success"}>
        {message}
    </div>
  )
}

export default Notification;