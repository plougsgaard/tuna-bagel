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
import AddFoodForm from './AddFood'
import FoodTable from './FoodTable'
import Details from './Details'

const FoodPage = ({ dispatch, foods, brands, params: { foodId } }) => {
  const { addFormVisible } = foods
  const toggleForm = (e) => dispatch(addFormVisible ? hideAddForm() : showAddForm())
  const editingFood = foodId && _.find(foods.entries, { id: foodId })
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
      {editingFood && (
        <Details
          handleDelete={(e) => dispatch(deleteFood(foodId))}
          food={editingFood}/>
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
