/**
 * Create Reducer
 *
 * @link https://github.com/emmenko/redux-react-router-async-example/blob/master/lib/utils/create-reducer.js
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

export default (initialState, actionHandlers) => (state = initialState, payload) => {
  const fn = actionHandlers[payload.type]

  // Check if handler exists
  if (!fn) return state

  return { ...state, ...fn(state, payload) }
}
