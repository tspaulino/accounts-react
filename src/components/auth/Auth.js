import React from 'react'
import { bindActionCreators } from 'redux'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reset } from 'redux-form'

import * as authActions from '../../redux/auth'
import { emitAlert } from '../../redux/alerts'
import './Auth.scss'

const actions = {
  ...authActions,
  emitAlert,
  resetForm: reset
}

const AuthHoc = (ComposedComponent) => {
  const Auth = (props) => {
    const { auth } = props
    if (auth.status === 'connected') return <Redirect to="/dashboard" />

    return (
      <div className="auth">
        <ComposedComponent {...props} />
      </div>
    )
  }

  Auth.propTypes = {
    auth: PropTypes.shape({
      status: PropTypes.string.isRequired
    }).isRequired
  }

  const mapStateToProps = ({ auth }) => ({ auth })
  const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

  return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default AuthHoc
