import React from 'react'

const Alert = ({ children, type }) => (
  <div className={`callout ${type}`}>
    {children}
    {/*<button className='close-button' type='button' onClick={}>&times;</button>*/}
  </div>
)

export const AlertSuccess = ({ children }) => (
  <Alert type='success'>{children}</Alert>
)
