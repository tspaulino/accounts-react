import React, { Component } from 'react'

import './Auth.scss'

const Auth = ComposedComponent => class extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className="auth">
        <ComposedComponent {...this.props} />
      </div>
    )
  }
}

export default Auth
