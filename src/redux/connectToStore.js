import { connect } from 'react-redux'

/**
 * Simple wrapper around `connect`.
 */
const connectToStore = (component) =>
  connect(component.mapState, component.mapProps)(component)

export default connectToStore
