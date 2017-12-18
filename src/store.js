/**
 * Store
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from './redux'
import initialState from './state'

// Setup Logger for
// development environment only
const logger = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  duration: true,
  diff: true
})

// Check if Chrome extension is available
// and isn't running on isomorphic environments
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose // eslint-disable-line

// Create store
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk, logger))
)

// Enable Webpack hot module
// replacement for reducers and actions
if (module.hot) {
  module.hot.accept('./redux', () => {
    store.replaceReducer(require('./redux').default)
  })
}

export default store
