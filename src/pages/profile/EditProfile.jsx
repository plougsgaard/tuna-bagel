import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import Transition from 'react-motion-ui-pack'

import { validateRequiredFields } from '../../helpers/validators'
import { FormFieldError, OneLineError, AlertError } from '../../components/errors'
import { TextGroup, TypeaheadGroup, NumberGroup } from '../../components/forms'

const formName = 'editProfile'
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
  <div className=''>
    <form className='form' onSubmit={handleSubmit}>
      {error && <AlertError { ...error } />}
      <fieldset className=''>
        <div className='row'>
          <div className='col-md-12'>
            <TextGroup label='Name' entity={name}/>
          </div>
        </div>
      </fieldset>
      <div className='row'>
        <div className='col-md-12'>
          <button type='submit' className='btn btn-success pull-right' disabled={submitting}>Save</button>
        </div>
      </div>
    </form>
  </div>
)

const mapStateToProps = (state, { entry, handleCancel }) => ({
  initialValues: entry,
  handleCancel
})

export default reduxForm({
  form: formName,
  fields,
  validate
},
mapStateToProps)(BaseForm)
