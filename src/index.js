/**
 * App
 *
 * Client application
 * entry point
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import store from './store'
import App from './components/App'

// Render App
ReactDOM.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('app')
)

// Enable Webpack hot module
// replacement for React components
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default

    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
