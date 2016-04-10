import React from 'react'
import _ from 'lodash'
import { compose } from 'recompose'

const FoodItem = ({
  id,
  name
}) => {
  return (
    <a key={`FoodItem${id}`} href='/' className='list-group-item'>
      <h4 className='list-group-item-heading'>{name}</h4>
      <p className='list-group-item-text'>
      Lorem ipsum dolor sit amet, te mei mediocrem assentior, sit te vocent apeirian voluptaria.</p>
    </a>
  )
}

const FoodShallowList = ({
  foods: {
    entries
  }
}) => {
  return (
    <div className='list-group'>
      {_.map(entries, FoodItem)}
    </div>
  )
}

export default FoodShallowList
