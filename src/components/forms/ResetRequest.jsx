import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import { validateRequiredFields } from './util'
import { FormFieldError, OneLineError } from '../errors'

const fields = ['email']
const validate = validateRequiredFields()

const BaseForm = ({
  fields: {
    email
  },
  handleSubmit,
  submitting,
  error
}) => (
  <div className='row'>
    <div className='medium-6 medium-centered large-4 large-centered columns'>
      <form onSubmit={handleSubmit}>
        <div className='row column log-in-form'>
          <h4 className='text-center'>Reset password</h4>
          <label>Email <FormFieldError {...email} />
            <input type='text' placeholder='somebody@example.com' {...email} />
          </label>
          {error && OneLineError({ ...error })}
          <button type='submit' className='button expanded' disabled={submitting}>Send me a reset link</button>
          <p className='text-center'><Link to='/login'>I just remembered!</Link></p>
        </div>
      </form>
    </div>
  </div>
)

export default reduxForm({
  form: 'resetRequest',
  fields,
  validate
})(BaseForm)