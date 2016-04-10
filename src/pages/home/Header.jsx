import React from 'react'
import { Link } from 'react-router'
import { NoopLink } from '../../components/links'

const Header = ({ }) => {
  return (
    <div>
      <ul className='breadcrumb'>
        <li className='active'>Home</li>
      </ul>
    </div>
  )
}

export default Header
