import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

import { authenticate } from '../../redux/auth'
import { emitAlert } from '../../redux/alerts'

export class AppRoute extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    auth: PropTypes.shape({
      status: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      authenticate: PropTypes.func.isRequired,
      emitAlert: PropTypes.func.isRequired
    }).isRequired
  }

  static defaultProps = {
    authenticated: false,
  }

  componentWillMount() {
    const { actions, authenticated } = this.props
    if (authenticated) {
      actions.authenticate().catch(() => actions.emitAlert('notAuthenticated'))
    }
  }

  render() {
    const { authenticated, auth } = this.props
    if (authenticated) {
      switch (auth.status) {
        case 'connected':
          return <Route {...this.props} />
        case 'disconnected':
          return <Redirect to="/sign-in" />
        case 'idle':
        case 'connecting':
        default:
          return ''
      }
    }

    return <Route {...this.props} />
  }
}

const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ authenticate, emitAlert }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)
