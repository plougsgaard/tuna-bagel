import React from 'react'
import { Link } from 'react-router'
import { NoopLink } from '../../components/links'

const Header = ({ addFormVisible, toggleForm }) => {
  return (
    <div>
      <ul className='breadcrumb'>
        <li><Link to='/'>Home</Link></li>
        <li className='active'>Profile</li>
      </ul>
      <h4>As yet the information presented here has no significance since it's not used anywhere else.</h4>
    </div>
  )
}

export default Header
