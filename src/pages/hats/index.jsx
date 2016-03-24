import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import lifecycle from '../../helpers/lifecycle'

import {
  loadHats,
  addHat,
  handleSaveHat,
  editMarkHat,
  editUnmarkHat
} from '../../redux/actions/hats'

import HatsList from './HatsList'

const HatsPage = ({ dispatch, hats }) => {
  return (
    <div>
      <h1>All the hats</h1>
      <p>I could go on and on but I won't.</p>
      <p><button
        className='btn btn-success'
        onClick={() => dispatch(addHat('New Hat'))} >
        Throw a hat in the mix!</button></p>
      <div className='page-header'>
        <h3>And here's the complete list (of hats)</h3>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <HatsList
            hats={hats}
            editMark={(id) => dispatch(editMarkHat(id))}
            editUnmark={(id) => dispatch(editUnmarkHat(id))}
            handleSave={handleSaveHat}
            />
        </div>
      </div>
    </div>
  )
}

const mapState = ({ hats }) => ({ hats })
export default compose(
  connect(mapState),
  lifecycle({
    enter: (d) => d(loadHats())
  })
)(HatsPage)
