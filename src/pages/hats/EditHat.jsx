import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import { validateRequiredFields } from '../../helpers/validators'
import { FormFieldError, OneLineError } from '../../components/errors'

const fields = ['name']
const validate = validateRequiredFields()

const BaseForm = ({
  fields: {
    name
  },
  handleSubmit,
  handleCancel,
  submitting,
  error
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <div className='input-group'>
        <span className='input-group-addon'>Name</span>
        <input className='form-control' type='text' autoFocus placeholder='Name' {...name} />
        <span className='input-group-btn'>
          <button type='submit' className='btn btn-success' disabled={submitting}>Save</button>
        </span>
        {error && OneLineError({ ...error })}
      </div>
    </div>
  </form>
)

const mapStateToProps = (state, { entry, handleCancel }) => ({
  initialValues: entry,
  handleCancel
})

export default reduxForm({
  form: 'editHat',
  fields,
  validate
},
mapStateToProps)(BaseForm)
