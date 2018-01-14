import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { revokeAlert } from '../../../redux/alerts'
import Alert from './Alert'
import './Alerts.scss'

export const Alerts = ({ items, actions }) => (
  <div className="alerts">
    {items.map(item => <Alert key={item.id} {...item} {...actions} />)}
  </div>
)

Alerts.propTypes = {
  actions: PropTypes.shape({
    revokeAlert: PropTypes.func.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

const mapStateToProps = state => ({ items: state.alerts.items })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ revokeAlert }, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
