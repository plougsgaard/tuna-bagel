import React from 'react'
import _ from 'lodash'
import { compose } from 'recompose'

import { NoopLink } from '../../components/links'

import { VelocityTransitionGroup } from 'velocity-react'

const FoodItem = ({
  markFn,
  markedId
}) => ({
  id,
  name,
  style
}) => {
  return (
    <li
      key={`FoodItem${id}`}
      className='list-group-item list-group-item-with-hover'
      onClick={() => markFn(id)}>
        <div className='list-group-item-heading'>{name}</div>
      <VelocityTransitionGroup
        enter={{ animation: 'slideDown' }}
        leave={{ animation: 'slideUp' }}>
        {id === markedId &&
          <p className='list-group-item-text'>
            Lorem ipsum dolor sit amet, te mei mediocrem assentior,
            sit te vocent apeirian voluptaria.
          </p>}
      </VelocityTransitionGroup>
    </li>
  )
}

const FoodShallowList = ({
  foods: {
    entries
  },
  markFn,
  markedId
}) => {
  const items = _.chain(entries)
    //.reject(({ id }) => id === markedId)
    .map(FoodItem({ markFn, markedId }))
    .value()
  return (
    <div className='panel panel-primary'>
      <div className='panel-heading'>
        <h3 className='panel-title'>Foods</h3>
      </div>
      <VelocityTransitionGroup
        className='list-group'
        runOnMount={true}
        component='ul'>
        {items}
      </VelocityTransitionGroup>
    </div>
  )
}

export default FoodShallowList
