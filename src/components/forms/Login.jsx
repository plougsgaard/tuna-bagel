import React from 'react'
import { reduxForm } from 'redux-form'

const BaseForm = ({
  fields: {
    email,
    password
  },
  handleSubmit,
  submitting
}) => (
  <div className='row'>
    <div className='medium-6 medium-centered large-4 large-centered columns'>

      <form onSubmit={handleSubmit}>
        <div className='row column log-in-form'>
          <h4 className='text-center'>Log In</h4>
          <label>Email
            <input type='text' placeholder='somebody@example.com' {...email} />
          </label>
          <label>Password
            <input type='password' placeholder='Password' {...password} />
          </label>
          <input id='show-password' type='checkbox' />
          <p>{submitting ? 'yep' : 'nope'}</p>
          <label htmlFor='show-password'>Show password</label>
          <button type='submit' className='button expanded' disabled={submitting}>
            {submitting ? <i>Log In</i> : 'Log In'}
          </button>
          <p className='text-center'><a href='#'>Forgot your password?</a></p>
        </div>
      </form>

    </div>
  </div>
)

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(BaseForm)
