import React from 'react'
import { MenuLink } from '../links'

const LeftMenu = ({}) => (
  <ul className='menu'>
    <MenuLink to='/' onlyActiveOnIndex>Home</MenuLink>
    <MenuLink to='/login'>Login</MenuLink>
    <MenuLink to='/about'>About</MenuLink>
    <MenuLink to='/profile'>Profile</MenuLink>
    <MenuLink to='/hats'>Hats</MenuLink>
  </ul>
)

const RightMenu = ({}) => (
  <ul className='menu'>
    <li><input type='search' placeholder='Search' /></li>
  </ul>
)

export const TopBar = ({}) => (
  <div className='top-bar' style={{
    borderBottom: '1px solid #CCC'
  }}>
    <div className='top-bar-left'>
      <LeftMenu />
    </div>
    <div className='top-bar-right'>
      <RightMenu />
    </div>
  </div>
)
