import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import LostPassword from './auth/LostPassword'
import ResetPassword from './auth/ResetPassword'
import NoMatch from './misc/NoMatch'
import Dashboard from './dashboard/Dashboard'

import Route from './routes/Route'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/lost-password" component={LostPassword} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/dashboard" authenticated component={Dashboard} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)
