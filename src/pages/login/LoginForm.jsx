import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import { validateRequiredFields } from '../../helpers/validators'
import { FormFieldError, OneLineError } from '../../components/errors'

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
  <form className='form-horizontal' onSubmit={handleSubmit}>
    <fieldset className=''>
      <legend>Credentials</legend>
      <div className='form-group'>
        <label className='col-lg-2 control-label' forName='inputEmail'>
          Email
        </label>
        <div className='col-lg-10'>
          <input
            type='text'
            className='form-control'
            id='inputEmail'
            placeholder='somebody@example.com'
            autoFocus
            {...email} />
          <FormFieldError {...email} />
        </div>
      </div>
      <div className='form-group'>
        <label className='col-lg-2 control-label' forName='inputPassword'>
          Password
        </label>
        <div className='col-lg-10'>
          <input
            type='password'
            className='form-control'
            id='inputPassword'
            {...password} />
            <FormFieldError {...password} />
        </div>
      </div>
      <div className='form-group'>
        {error && OneLineError({ ...error })}
      </div>
      <div className='form-group'>
        <div className='col-lg-10 col-lg-offset-2'>
          <Link to='/landing' className='btn btn-default' disabled={submitting}>Cancel</Link>
          {' '}
          <button type='submit' className='btn btn-primary' disabled={submitting}>Let me in</button>
        </div>
      </div>
    </fieldset>
  </form>
)

export default reduxForm({
  form: 'login',
  fields,
  validate
})(BaseForm)
