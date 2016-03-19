import React from 'react'
import { Link } from 'react-router'
import { MenuLink } from '../links'

const LeftMenu = ({}) => (
  <ul className='nav navbar-nav'>
    <MenuLink to='/' onlyActiveOnIndex>Home</MenuLink>
    <MenuLink to='/food'>Food</MenuLink>
    <MenuLink to='/hats'>Hats</MenuLink>
    <MenuLink to='/about'>About</MenuLink>
  </ul>
)

const RightMenu = ({}) => (
  <ul className='nav navbar-nav navbar-right'>
    <MenuLink to='/profile'>Profile</MenuLink>
  </ul>
)

export const TopBar = ({ collapsed, toggleCollapse }) => (
  <div className='navbar navbar-default'>
    <div className='container'>
      <div className='navbar-header'>
        <Link to='/' className='navbar-brand'>Tuna Bagel</Link>
        <button onClick={toggleCollapse} className={`${collapsed ? 'navbar-toggle collapsed' : 'navbar-toggle'}`} type='button'>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
      </div>
      <div className={`navbar-collapse ${collapsed ? 'collapse' : 'collapse in'}`}>
        <LeftMenu />
        <RightMenu />
      </div>
    </div>
  </div>
)
