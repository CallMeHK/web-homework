import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#47bdff',
          fontWeight: 'bold'
        }
      },

      focused: {}
    }
  }
})

ReactDOM.render(
  <div data-app-init=''>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </ThemeProvider>
  </div>,
  document.getElementById('react-app')
)
