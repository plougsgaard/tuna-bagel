import React from 'react'
import Autosuggest from 'react-autosuggest'

export const TextGroup = ({ label, entity }) => {
  const inputId = `input${label}`
  const { touched, error, visited, active, value } = entity
  const hasError = touched && error
  const hasSuccess = !hasError && visited && !active && value
  const className = hasError
    ? 'form-group has-feedback has-warning'
    : hasSuccess
      ? 'form-group has-feedback has-success'
      : 'form-group has-feedback'
  return (
    <div className={className}>
      <label className='control-label' forName={inputId}>
        {label}
      </label>
      <input
        type='text'
        className='form-control'
        id={inputId}
        placeholder=''
        {...entity} />
      {hasError && <span className="form-control-feedback icon-warning"></span>}
      {hasSuccess && <span className="form-control-feedback icon-check"></span>}
    </div>
  )
}

export const TypeaheadGroup = ({ label, entity, dispatchChange, suggestions: { entries } }) => {
  const getSuggestions = () =>
    _.filter(entries, (s) => _.includes(_.lowerCase(s.name), _.lowerCase(entity.value)))
  const inputId = `input${label}`
  const { touched, error, visited, active, value } = entity
  const hasError = touched && error
  const hasSuccess = !hasError && visited && !active && value
  const className = hasError
    ? 'form-group has-feedback has-warning'
    : hasSuccess
      ? 'form-group has-feedback has-success'
      : 'form-group has-feedback'
  return (
    <div className={className}>
      <label className='control-label' forName={inputId}>
        {label}
      </label>
      <Autosuggest
        theme={{
          suggestionsContainer: 'suggestion-container',
          suggestion: 'suggestion-item',
          suggestionFocused: 'suggestion-item-focused'
        }}
        suggestions={getSuggestions()}
        getSuggestionValue={(s) => s.name}
        renderSuggestion={(s) => s.name}
        inputProps={{
          ...entity,
          id: inputId,
          className: 'form-control',
          onChange: (event, { newValue, method }) => {
            dispatchChange(newValue)
          },
          value: entity.value || ''
        }} />
      {hasError && <span className="form-control-feedback icon-warning"></span>}
      {hasSuccess && <span className="form-control-feedback icon-check"></span>}
    </div>
  )
}

export const NumberGroup = ({ entity, label, unit }) => {
  const inputId = `input${label}`
  const { touched, error, visited, active, value } = entity
  const hasError = touched && error
  const hasSuccess = !hasError && visited && !active && value
  const className = hasError
    ? 'form-group has-feedback has-warning'
    : hasSuccess
      ? 'form-group has-feedback has-success'
      : 'form-group has-feedback'
  return (
    <div className={className}>
      <label className='control-label' forName={inputId}>
        {label}
      </label>
      <span className='badge unit-badge'>{unit || 'g'}</span>
      <input
        type='number'
        className='form-control'
        id={inputId}
        {...entity} />
      {hasError && <span className="form-control-feedback icon-warning"></span>}
      {hasSuccess && <span className="form-control-feedback icon-check"></span>}
    </div>
  )
}
