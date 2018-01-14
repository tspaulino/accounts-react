import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import './App.scss'

import Routes from './Routes'
import Alerts from './common/alerts/Alerts'
import { metaTags } from '../config'

const App = ({ store }) => (
  <Provider store={store}>
    <Fragment>
      <Alerts />
      <Routes />
      <Helmet {...metaTags} />
    </Fragment>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
}

export default App
