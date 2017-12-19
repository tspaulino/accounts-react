import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import NoMatch from './NoMatch'
import { metaTags } from '../config'

const App = ({ store }) => (
  <Provider store={store}>
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/auth/sign-in" component={SignIn} />
          <Route exact path="/auth/sign-up" component={SignUp} />
          <Route component={NoMatch} />
        </Switch>
      </Router>

      <Helmet {...metaTags} />
    </Fragment>
  </Provider>
)

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
}

export default App
