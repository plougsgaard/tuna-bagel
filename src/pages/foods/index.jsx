import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

import AddFoodForm from './AddFood'
import FoodTable from './FoodTable'

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
      ? <NoopLink
          className='btn btn-xs btn-info'
          style={{ margin: '0 1.5em' }}
          onClick={(e) => dispatch(hideAddForm())}>close the form cause you didn't really wanna add food anyway</NoopLink>
      : <NoopLink 
          className='btn btn-xs btn-info'
          style={{ margin: '0 0.5em' }}
          onClick={(e) => dispatch(showAddForm())}>add food</NoopLink> 
    return (
      <div>
        <ul className='breadcrumb'>
          <li><Link to='/'>Home</Link></li>
          <li className='active'>Food</li>
        </ul>
        <h1>My food is all about your food</h1>
        <p>You may presently {showHideFormLink} or enjoy browsing your portfolio.</p>
        {foods.showAddForm && (
          <div className='row'>
            <div className='col-md-12'>
            <AddFoodForm
              onSubmit={handleAddFood}
              brands={brands} />
            </div>
          </div>
        )}
        <FoodTable 
          foods={foods} />
      </div>
    )
  }
}

const mapState = ({ foods, brands }) => ({ foods, brands })
export default connect(mapState)(FoodPage)
