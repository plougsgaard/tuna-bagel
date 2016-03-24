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
  resetTransientState
} from '../../redux/actions/foods'
import {
  loadBrands
} from '../../redux/actions/brands'

import Header from './Header'
import AddFoodForm from './AddFood'
import FoodTable from './FoodTable'

const FoodPage = ({ dispatch, foods, brands }) => {
  const { addFormVisible } = foods
  const toggleForm = (e) => dispatch(addFormVisible ? hideAddForm() : showAddForm())
  return (
    <div>
      <Header 
        addFormVisible={addFormVisible} 
        toggleForm={toggleForm} />
      {foods.addFormVisible && (
        <AddFoodForm
          onSubmit={handleAddFood}
          brands={brands} />
      )}
      <FoodTable 
        foods={foods} />
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
)(FoodPage)
