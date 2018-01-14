import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import SignIn from './auth/SignIn'
// import SignUp from './auth/SignUp'
import NoMatch from './NoMatch'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/auth/sign-in" component={SignIn} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)
