import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

import AddFoodForm from './AddFood'

import { NoopLink } from '../../components/links'
import { 
  loadFoods,
  showAddForm,
  hideAddForm,
  editMarkFood,
  editUnmarkFood,
  handleAddFood,
  resetTransientState
} from '../../redux/actions/foods'
import { loadBrands } from '../../redux/actions/brands'

const Food = ({ food, isEditing = false, editMark, editUnmark }) => {
  const toggle = isEditing ? () => editUnmark(food.id) : () => editMark(food.id)
  return (
    <div>
      <NoopLink
        onClick={toggle}
        className={isEditing ? 'list-group-item active' : 'list-group-item'} >
        {food.name}
      </NoopLink>
      {isEditing && <span className='list-group-item list-group-item-info'>
        <p>Editing of foods not implemented. Yo.</p>
      </span>}
    </div>
  )
}

const FoodsList = ({ foods, editMark, editUnmark }) => {
  return (
    <div className='list-group'>
      {_.map(foods.entries, (food) =>
        <Food
          key={food.id}
          isEditing={_.find(foods.editing, { id: food.id })}
          editMark={editMark}
          editUnmark={editUnmark}
          food={food} />)}
    </div>
  )
}

class FoodPage extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    console.log('FoodPage:componentWillMount')
    this.props.dispatch(loadFoods())
    this.props.dispatch(loadBrands())
  }
  componentWillUnmount () {
    console.log('FoodPage:componentWillUnmount')
    this.props.dispatch(resetTransientState())
  }
  render () {
    const { dispatch, foods, brands } = this.props
    const showHideFormLink = foods.showAddForm
      ? <NoopLink onClick={(e) => dispatch(hideAddForm())}>close the form cause you didn't really wanna add stuff anyway</NoopLink>
      : <NoopLink onClick={(e) => dispatch(showAddForm())}>add food specifications</NoopLink> 
    return (
      <div>
        <ul className='breadcrumb'>
          <li><Link to='/'>Home</Link></li>
          <li className='active'>Food</li>
        </ul>
        <h1>My food is all about your food</h1>
        <p>You may {showHideFormLink} here or just enjoy browsing your portfolio.</p>
        {foods.showAddForm && (
          <div className='row'>
            <div className='col-md-12'>
            <AddFoodForm 
              onSubmit={handleAddFood}
              brands={brands} />
            </div>
          </div>
        )}
        <h1>Here's the food we have</h1>
        <p>I could go for some enchiladas.</p>
        <div className='row'>
          <div className='col-md-6'>
            <FoodsList
              foods={foods}
              editMark={(id) => dispatch(editMarkFood(id))}
              editUnmark={(id) => dispatch(editUnmarkFood(id))}
              />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ foods, brands }) => ({ foods, brands })
export default connect(mapState)(FoodPage)
