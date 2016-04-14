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
    <div key={`FoodItem${id}`}>
      <NoopLink
        onClick={() => markFn(id)}
        className='list-group-item'>
        <div className='list-group-item-heading'>{name}</div>
      </NoopLink>
      <VelocityTransitionGroup
        enter={{ animation: 'slideDown' }}
        leave={{ animation: 'slideUp' }}>
        {id === markedId &&
          <div className='list-group-item'>
            <p className='list-group-item-text'>
              Lorem ipsum dolor sit amet, te mei mediocrem assentior,
              sit te vocent apeirian voluptaria.
            </p>
          </div>}
      </VelocityTransitionGroup>
    </div>
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
        component='div'>
        {items}
      </VelocityTransitionGroup>
    </div>
  )
}

export default FoodShallowList
