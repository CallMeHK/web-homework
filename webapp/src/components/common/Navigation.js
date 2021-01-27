import React from 'react'
import { arrayOf, string } from 'prop-types'
import { useHistory } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'

export const Navigation = ({ routes }) => {
  const history = useHistory()

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            data-testid="toggle-nav-open"
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap variant="h6">
            Very cool app
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} variant="persistent">
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon data-testid="toggle-nav-closed" />
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map(([linkName, goToUrl], index) => (
            <ListItem
              button
              key={linkName + index}
              onClick={() => {
                history.push(goToUrl)
                handleDrawerClose()
              }}
            >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={linkName} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  )
}

Navigation.propTypes = {
  routes: arrayOf(arrayOf(string)).isRequired
}
