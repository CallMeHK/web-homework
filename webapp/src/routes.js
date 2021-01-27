import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import Container from '@material-ui/core/Container'
import { Navigation } from './components/common/Navigation'

import { Home } from './home'
import { Transactions } from './transactions'
import { EntryPage } from './entry'

function AppRouter() {
  return (
    <Router>
      <Container>
        <Navigation routes={([['Home', '/'], ['Transactions', '/transactions'], ['Enter Transaction', '/entry']])} />
        <div css={menuSpacer} />

        <div className="main-content" css={contentStyle}>
          <Route component={Home} exact path="/" />
          <Route component={Transactions} exact path="/transactions" />
          <Route component={EntryPage} exact path="/entry" />
        </div>
      </Container>
    </Router>
  )
}

export default AppRouter

const menuSpacer = css`
  height: 100px;
`

const contentStyle = css`
  grid-row: 2;
`
