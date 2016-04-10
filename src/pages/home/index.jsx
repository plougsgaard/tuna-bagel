import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import lifecycle from '../../helpers/lifecycle'

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

const HomePage = ({ dispatch, foods, brands, params: { foodId } }) => {
  const { addFormVisible } = foods
  const toggleForm = (e) => dispatch(addFormVisible ? hideAddForm() : showAddForm())
  const editingFood = foodId && _.find(foods.entries, { id: foodId })
  return (
    <div>
      <Header />
      <p>Humans love lists and so do you! Have fun.</p>
      <FoodShallowList foods={foods} />
    </div>
  )
}

export default compose(
  connect(({ foods, brands }) => ({ foods, brands })),
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
