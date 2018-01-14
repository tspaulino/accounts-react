import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../redux/auth'
import './Auth.scss'

const AuthWrapper = (ComposedComponent) => {
  class Auth extends Component {
    componentWillMount() {}

    render() {
      return (
        <div className="auth">
          <ComposedComponent {...this.props} />
        </div>
      )
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth })
  const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

  return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default AuthWrapper
