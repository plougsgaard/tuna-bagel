import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

import AddFoodForm from './AddFood'

import { NoopLink } from '../../components/links'
import { loadFoods, editMarkFood, editUnmarkFood } from '../../redux/actions/foods'

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
  }
  render () {
    const { dispatch, foods } = this.props
    return (
      <div>
        <ul className='breadcrumb'>
          <li><Link to='/'>Home</Link></li>
          <li className='active'>Food</li>
        </ul>
        <h1>Create some food</h1>
        <div className='row'>
          <div className='col-md-8'>
        <AddFoodForm />
        </div>
        </div>
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

const mapState = ({ foods }) => ({ foods })
export default connect(mapState)(FoodPage)
