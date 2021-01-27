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
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

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
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Very cool app
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
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
              <ListItemIcon><FormatListBulletedIcon/></ListItemIcon>
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
