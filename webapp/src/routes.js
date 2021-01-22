import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import Container from '@material-ui/core/Container'
import { Navigation } from './components/common/Navigation'
import { EntryPage } from './entry/entry'

function AppRouter() {
  return (
    <Router>
      <Container>
        <Navigation />
        <div css={menuSpacer} />

        <div className="main-content" css={contentStyle}>
          <Route component={Home} exact path="/" />
          <Route component={EntryPage} exact path="/entry" />
          <Route component={() => <div>Content for /another route</div>} exact path="/another" />
        </div>
      </Container>
    </Router>
  )
}

export default AppRouter

const menuSpacer = css`
  height: 100px;
`

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  padding: 8px;
`

const navStyle = css`
  grid-row: 1;

  & > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
