import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import { validateRequiredFields } from '../../helpers/validators'
import { FormFieldError, OneLineError, AlertError } from '../../components/errors'
import { TextGroup, TypeaheadGroup, NumberGroup } from '../../components/forms'

const formName = 'addFood'
const fields = [
  'name',
  'brand',
  'calories',
  'carbohydrates',
  'sugars',
  'proteins',
  'fat',
  'saturated',
  'fibres',
  'salt'
]
const validate = validateRequiredFields([
  'carbohydrates',
  'sugars',
  'proteins',
  'fat',
  'saturated',
  'fibres',
  'salt'
])

const BaseForm = ({
  fields: {
    name,
    brand,
    calories,
    carbohydrates,
    sugars,
    proteins,
    fat,
    saturated,
    fibres,
    salt
  },
  handleSubmit,
  submitting,
  error,
  dispatch,
  brands 
}) => (
  <div className='panel panel-default'>
    <form className='form panel-body' onSubmit={handleSubmit}>
      {error && <AlertError { ...error } />}
      <fieldset className=''>
        <div className='row'>
          <div className='col-xs-6'>
            <TextGroup label='Description' entity={name}/>
          </div>
          <div className='col-xs-6'>
            <TypeaheadGroup 
              label='Brand' 
              entity={brand} 
              suggestions={brands}
              dispatchChange={(newValue) => {
                dispatch({
                  'type': 'redux-form/CHANGE',
                  'field': brand.name,
                  'value': newValue,
                  'touch': false,
                  'form': formName
                })
              }}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Calories' entity={calories} unit='kcal' />
          </div>
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Carbohydrates' entity={carbohydrates} />
          </div>
        {/*</div>
        <div className='row'>*/}
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Sugars' entity={sugars} />
          </div>
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Proteins' entity={proteins} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Fat' entity={fat} />
          </div>
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Saturated' entity={saturated} />
          </div>
        {/*</div>
        <div className='row'>*/}
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Fibres' entity={fibres} />
          </div>
          <div className='col-sm-3 col-xs-6'>
            <NumberGroup label='Salt' entity={salt} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-10'>
            
          </div>
          <div className='col-md-2'>
            <div className='form-group'>
              <div className='col-lg-2 col-lg-offset-2'>
                <button type='submit' className='btn btn-success' disabled={submitting}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
)

const formProps = {
  form: formName,
  fields,
  validate
}
export default reduxForm(formProps)(BaseForm)
