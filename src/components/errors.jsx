import React from 'react'

export const getBadProgrammerOutput = () => ({
  payload: {
    error: `Bad Programmer`,
    message: `If you see this it means the programmer has failed miserably. Shame!`,
    statusCode: 501
  }
})

export const OneLineError = ({ output, isBoom }) => {
  const { 
    payload: {
      error, message, statusCode 
    }
  } = isBoom
    ? output
    : getBadProgrammerOutput()
  return (
    <p style={{
      color: '#FF0033'
    }}>
      <span style={{
        fontWeight: 'bold'
      }}>
        {error}
      </span>
      {' '}
      <span>
        {message}
      </span>
    </p>
  )
}
