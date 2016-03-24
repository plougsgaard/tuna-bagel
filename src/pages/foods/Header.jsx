import React from 'react'
import { Link } from 'react-router'
import { NoopLink } from '../../components/links'

const Header = ({ addFormVisible, toggleForm }) => {
  const showHideFormLink = (
    <NoopLink 
      className='btn btn-xs btn-info'
      style={{ margin: '0 0.5em' }}
      onClick={toggleForm}
    >
      {addFormVisible
        ? 'close the form again'
        : 'add food'}
    </NoopLink>
  )
  return (
    <div>
      <ul className='breadcrumb'>
        <li><Link to='/'>Home</Link></li>
        <li className='active'>Food</li>
      </ul>
      <h1>My food is all about your food</h1>
      <p>You may presently {showHideFormLink} or enjoy browsing your portfolio.</p>
    </div>
  )
}

export default Header
