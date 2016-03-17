import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

import { NoopLink } from '../../components/links'
import { loadHats, addHat, handleSaveHat, editMarkHat, editUnmarkHat } from '../../redux/actions/hats'

import EditHatForm from './EditHat'

const Hat = ({ hat, isEditing = false, editMark, editUnmark }) => {
  const toggle = isEditing ? () => editUnmark(hat.id) : () => editMark(hat.id)
  return (
    <div>
      <NoopLink
        onClick={toggle}
        className={isEditing ? 'list-group-item active' : 'list-group-item'} >
        {hat.name}
      </NoopLink>
      {isEditing && <span className='list-group-item list-group-item-info'>
        <EditHatForm
          onSubmit={handleSaveHat(hat.id)}
          formKey={String(hat.id)}
          entry={hat}
          handleCancel={() => editUnmark(hat.id)}/>
      </span>}
    </div>
  )
}

const HatsList = ({ hats, editMark, editUnmark }) => {
  return (
    <div className='list-group'>
      {_.map(hats.entries, (h) =>
        <Hat
          key={h.id}
          isEditing={_.find(hats.editing, { id: h.id })}
          editMark={editMark}
          editUnmark={editUnmark}
          hat={h} />)}
    </div>
  )
}

class HatsPage extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    console.log('HatsPage:componentWillMount')
    this.props.dispatch(loadHats())
  }
  render () {
    const { dispatch, hats } = this.props
    const { body } = hats
    return (
      <div>
        <h1>All the hats</h1>
        <p>I could go on and on but I won't.</p>
        <p><button
          className='btn btn-success'
          onClick={() => this.props.dispatch(addHat('New Hat'))} >
          Throw a hat in the mix</button></p>
        <div className='page-header'>
          <h3>And here's the complete list</h3>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <HatsList
              hats={hats}
              editMark={(id) => dispatch(editMarkHat(id))}
              editUnmark={(id) => dispatch(editUnmarkHat(id))}
              />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ hats }) => ({ hats })
export default connect(mapState)(HatsPage)
