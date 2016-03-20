import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import Autosuggest from 'react-autosuggest'

import { validateRequiredFields } from '../../helpers/validators'
import { FormFieldError, OneLineError } from '../../components/errors'

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
const validate = validateRequiredFields()

const TextGroup = ({ label, entity }) => {
  const inputId = `input${label}`
  return (
    <div className='form-group'>
      <label className='control-label' forName={inputId}>
        {label}
      </label>
      <input
        type='text'
        className='form-control'
        id={inputId}
        placeholder=''
        {...entity} />
    </div>
  )
}

const TypeaheadGroup = ({ label, entity, dispatch }) => {
  const suggestions = [
    {
      text: 'Apple'
    },
    {
      text: 'Banana'
    },
    {
      text: 'Cherry'
    },
    {
      text: 'Grapefruit'
    },
    {
      text: 'Lemon'
    }
  ];
  const inputId = `input${label}`
  return (
    <div className='form-group'>
      <label className='control-label' forName={inputId}>
        {label}
      </label>
      <Autosuggest
        theme={{
          suggestionsContainer: 'suggestion-container',
          suggestion: 'suggestion-item',
          suggestionFocused: 'suggestion-item-focused'
        }}
        suggestions={suggestions}
        getSuggestionValue={(s) => s.text}
        renderSuggestion={(s) => s.text}
        shouldRenderSuggestions={() => true}
        inputProps={{
          ...entity,
          id: inputId,
          className: 'form-control',
          onChange: (event, { newValue, method }) => {
            console.log('<<onChange>>', event, newValue, method, entity)
            dispatch({
              'type': 'redux-form/CHANGE',
              'field': entity.name,
              'value': newValue,
              'touch': false,
              'form': formName
            })
          },
          value: entity.value || ''
        }} />
    </div>
  )
}

const NumberGroup = ({ entity, label, unit }) => {
  const inputId = `input${label}`
  return (
    <div className='form-group'>
      <label className='control-label' forName={inputId}>
        {label}
      </label>
      <div className='input-group'>
      <input
        type='number'
        className='form-control'
        id={inputId}
        {...entity} />
        <FormFieldError {...entity} />
      <span className='input-group-addon'>{unit || 'g'}</span>
      </div>
    </div>
  )
}

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
  dispatch
}) => (
  <form className='form' onSubmit={handleSubmit}>
    <fieldset className=''>
      <div className='row'>
        <div className='col-md-6'>
          <TextGroup label='Description' entity={name}/>
        </div>
        <div className='col-md-6'>
          <TypeaheadGroup label='Brand' entity={brand} dispatch={dispatch}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-3'>
          <NumberGroup label='Calories' entity={calories} unit='kcal' />
        </div>
        <div className='col-sm-3'>
          <NumberGroup label='Carbohydrates' entity={carbohydrates} />
        </div>
      {/*</div>
      <div className='row'>*/}
        <div className='col-sm-3'>
          <NumberGroup label='Sugars' entity={sugars} />
        </div>
        <div className='col-sm-3'>
          <NumberGroup label='Proteins' entity={proteins} />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-3'>
          <NumberGroup label='Fat' entity={fat} />
        </div>
        <div className='col-sm-3'>
          <NumberGroup label='Saturated' entity={saturated} />
        </div>
      {/*</div>
      <div className='row'>*/}
        <div className='col-sm-3'>
          <NumberGroup label='Fibres' entity={fibres} />
        </div>
        <div className='col-sm-3'>
          <NumberGroup label='Salt' entity={salt} />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-10'></div>
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
)

export default reduxForm({
  form: formName,
  fields,
  validate
})(BaseForm)
