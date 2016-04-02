import React from 'react'
import { Link } from 'react-router'
import { NoopLink } from '../../components/links'

const Details = ({ handleDelete, food: { name, id } }) => {
  return (
    <div>
      <h3>You have clicked a food item. Here are some facts about it.</h3>
      <h4>Name: {name}</h4>
      <NoopLink 
        className='btn btn-danger'
        style={{ margin: '0 0.5em' }}
        onClick={handleDelete}>Delete</NoopLink>
    </div>
  )
}

export default Details
