import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount = () => {
    fetch('http://localhost:8200/auth/login', { method: 'post' }).then(
      (res) => { console.log(res) },
      (err) => { console.error(err) }
    )
  }
  render = () => {
    return (
      <p>tuna-bagel!</p>
    )
  }
}

export default App
