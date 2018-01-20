import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../redux/auth'

export const Dashboard = props => (
  <div>
    <button
      type="button"
      onClick={() => props.dispatch(signOut())}
    >
      signOut
    </button>
  </div>
)

export default connect()(Dashboard)
