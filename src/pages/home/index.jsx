import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import lifecycle from '../../helpers/lifecycle'

import { VelocityComponent } from 'velocity-react'

import {
  loadFoods,
  showAddForm,
  hideAddForm,
  handleAddFood,
  deleteFood,
  resetTransientState
} from '../../redux/actions/foods'
import {
  loadBrands
} from '../../redux/actions/brands'

import Header from './Header'
import FoodShallowList from './FoodShallowList'

const HomePage = ({
  dispatch, foods, brands, // redux
  params: { foodId }, // router
  state, setState // withState
}) => {
  const markFn = (id) =>
    setState({
      ...state,
      markedFoodId: state.markedFoodId !== id ? id : null })

  return (
    <div>
      <Header />
      <div className='row'>
        <div className='col-md-6'>
          <FoodShallowList
            foods={foods}
            markFn={markFn}
            markedId={state.markedFoodId} />
        </div>
        <div className='col-md-6'>
          <FoodShallowList
            foods={brands}
            markFn={markFn}
            markedId={state.markedFoodId} />
        </div>
      </div>
    </div>
  )
}

export default compose(
  connect(({ foods, brands }) => ({ foods, brands })),
  withState('state', 'setState', {
    markedFoodId: null
  }),
  lifecycle({
    enter: (d) => {
      d(loadBrands())
      d(loadFoods())
    },
    leave: (d) => {
      d(resetTransientState())
    }
  })
)(HomePage)
