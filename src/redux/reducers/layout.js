import { NAVBAR_TOGGLE_COLLAPSE } from '../actions/layout'

export default function layoutReducer (state = {
  navbarCollapsed: true
}, action = {}) {
  const { type, payload } = action
  switch (type) {
    case NAVBAR_TOGGLE_COLLAPSE:
      return {
        ...state,
        navbarCollapsed: !state.navbarCollapsed
      }
    default:
      return state
  }
}
