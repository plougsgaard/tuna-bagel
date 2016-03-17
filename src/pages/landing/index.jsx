import React from 'react'
import { Link } from 'react-router'

const LandingPage = () => {
  return (
    <div>

      <div className='jumbotron'>
        <h1>Hello there fellow internet person</h1>
        <p>I <i>was</i> gonna make a compelling sales pitch but then I lost interest and wandered off to do other things.</p>
        <p><Link to='/signup' className='btn btn-primary btn-md'>Kindly procure me a user</Link></p>
        <p><Link to='/login' className='btn btn-secondary btn-md'>I simply wish to sign in</Link></p>
      </div>

    </div>
  )
}

export default LandingPage
