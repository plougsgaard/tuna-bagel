import { connect } from 'react-redux'

const connectToStore = (component) =>
  connect(component.mapState, component.mapProps)(component)

export default connectToStore
