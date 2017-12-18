import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

import { metaTags } from '../config'

const App = ({ store }) => (
  <Provider store={store}>
    <Fragment>
      <Helmet {...metaTags} />
    </Fragment>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
}

export default App
