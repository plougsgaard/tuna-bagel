import React from 'react'
import _ from 'lodash'

import { NoopLink } from '../../components/links'

import EditHatForm from './EditHat'

const Hat = ({ hat, isEditing = false, editMark, editUnmark, handleSaveHat }) => {
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
          onSubmit={handleSaveHat}
          formKey={String(hat.id)}
          entry={hat}
          handleCancel={() => editUnmark(hat.id)}/>
      </span>}
    </div>
  )
}

const HatsList = ({ hats, handleSave, editMark, editUnmark }) => {
  return (
    <div className='list-group'>
      {_.map(hats.entries, (h) =>
        <Hat
          key={h.id}
          isEditing={_.find(hats.editing, { id: h.id })}
          editMark={editMark}
          editUnmark={editUnmark}
          handleSaveHat={handleSave(h.id)}
          hat={h} />)}
    </div>
  )
}

export default HatsList
