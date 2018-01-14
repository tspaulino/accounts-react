import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message, Icon } from 'semantic-ui-react'

class Alert extends Component {
  componentWillMount() {
    const { revokeAlert, id } = this.props

    // Schedule alerts to be
    // removed after 7 seconds
    this.timer = setTimeout(() => revokeAlert(id), 7000)
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { content, type } = this.props
    const props = { [type]: type }
    return (
      <Message {...props}>
        <Icon name="warning" />
        {content}
      </Message>
    )
  }
}

Alert.propTypes = {
  revokeAlert: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Alert
