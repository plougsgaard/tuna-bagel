import React from 'react'

export const LoginForm = ({
  onSubmit
}) => (
  <div className='row'>
    <div className='medium-6 medium-centered large-4 large-centered columns'>

      <form onSubmit={onSubmit}>
        <div className='row column log-in-form'>
          <h4 className='text-center'>Log In</h4>
          <label>Email
            <input type='text' placeholder='somebody@example.com' />
          </label>
          <label>Password
            <input type='password' placeholder='Password' />
          </label>
          <input id='show-password' type='checkbox' />
          <label htmlFor='show-password'>Show password</label>
          <button onClick={onSubmit}><a type='submit' className='button expanded'>Log In</a></button>
          <p className='text-center'><a href='#'>Forgot your password?</a></p>
        </div>
      </form>

    </div>
  </div>
)
