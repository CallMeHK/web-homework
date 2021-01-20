import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

ReactDOM.render(
  <div data-app-init="i">
    <ThemeProvider theme={darkTheme}>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </ThemeProvider>
  </div>,
  document.getElementById('react-app')
)
