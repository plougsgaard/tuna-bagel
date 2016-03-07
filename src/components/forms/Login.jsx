import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import { validateRequiredFields } from './util'
import { FormFieldError, OneLineError } from '../errors'

const fields = ['email', 'password']
const validate = validateRequiredFields()

const BaseForm = ({
  fields: {
    email,
    password
  },
  handleSubmit,
  submitting,
  error
}) => (
  <div className='row'>
    <div className='medium-6 medium-centered large-4 large-centered columns'>
      <form onSubmit={handleSubmit}>
        <div className='row column log-in-form'>
          <h4 className='text-center'>Log In</h4> 
          <label>Email <FormFieldError {...email} />
            <input type='text' placeholder='somebody@example.com' {...email} />
          </label>
          <label>Password <FormFieldError {...password} />
            <input type='password' placeholder='Password' {...password} />
          </label>
          <input id='show-password' type='checkbox' />
          <label htmlFor='show-password'>I like kittens</label>
          {error && OneLineError({ ...error })}
          <button type='submit' className='button expanded' disabled={submitting}>Let me in</button>
          <p className='text-center'><Link to='/forgot'>Need help remembering?</Link></p>
        </div>
      </form>
    </div>
  </div>
)

export default reduxForm({
  form: 'login',
  fields,
  validate
})(BaseForm)
