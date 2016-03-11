import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

import { loadHats, addHat, handleSaveHat, editMarkHat, editUnmarkHat } from '../../redux/actions/hats'

import EditHatForm from '../../components/forms/EditHat'

const connector = connect(({ hats }) => ({
  hats
}))

const Hat = ({ hat, isEditing = false, editMark, editUnmark }) => {
  return (
    <li>
      {
        isEditing
          ? <div>
              <EditHatForm
                onSubmit={handleSaveHat(hat.id)}
                formKey={String(hat.id)}
                entry={hat}
                handleCancel={() => editUnmark(hat.id)}/>
            </div>
          : <div>
              <button className='secondary button' onClick={() => editMark(hat.id)}>Edit</button>
              <span>{hat.name}</span>
            </div>
      }
    </li>
  )
}

const HatsList = ({ hats, editMark, editUnmark }) => {
  return (
    <ul>
      {_.map(hats.entries, (h) =>
        <Hat
          key={h.id}
          isEditing={_.find(hats.editing, { id: h.id })}
          editMark={editMark}
          editUnmark={editUnmark}
          hat={h} />)}
    </ul>
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
      <div style={{ maxWidth: '800px' }}>
        <h1>Hats</h1>
        <HatsList
          hats={hats}
          editMark={(id) => dispatch(editMarkHat(id))}
          editUnmark={(id) => dispatch(editUnmarkHat(id))}
          />
        <button className='success button' onClick={() => this.props.dispatch(addHat('Saq'))}>Add a Hat</button>
      </div>
    )
  }
}

export default connector(HatsPage)
