import React from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react'
import './NoMatch.scss'

export const NoMatch = () => (
  <div className="nomatch">
    <Segment stacked>
      <div className="nomatch-container">
        <Header as="h1" icon>
          <Icon name="warning sign" />
          404 Error
          <Header.Subheader>
            The page you are looking for was not found.
          </Header.Subheader>
        </Header>
      </div>
    </Segment>
  </div>
)

export default NoMatch
