import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export const MenuLink = (props, context) => {
  const active = context.router.isActive(props.to, props.onlyActiveOnIndex)
  const listProps = active ? { className: 'active' } : {}
  return (
    <li {...listProps}>
      <Link {...props} />
    </li>
  )
}
MenuLink.contextTypes = {
  router: PropTypes.object
}

export const NoopLink = (props) => {
  const onClick = (e) => {
    e.preventDefault()
    if (typeof props.onClick === 'function') {
      props.onClick(e)
    }
  }
  const newProps = {
    ...props,
    to: '',
    onClick
  }
  return (
    <Link {
      ...newProps
    } />
  )
}
