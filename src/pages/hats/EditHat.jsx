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
  <form onSubmit={handleSubmit} className='form-horizontal'>
    <input className='input-group-field' type='text' placeholder='Stetson??' {...name} />
    <div className=''>
      <button type='submit' className='button' disabled={submitting}>Save</button>
      <span onClick={handleCancel}>Cancel</span>
      {error && OneLineError({ ...error })}
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
