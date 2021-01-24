import React from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useMutation } from '@apollo/client'
import DELETE_TRANSACTION from '../../gql/delete_transaction.gql'
import { useFormContext } from '../../context/form.context'

export const TxRowDropdown = ({ transaction }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const form = useFormContext()
  const [deleteTransaction, { data }] = useMutation(DELETE_TRANSACTION)

  const handleEdit = () => {
    form.openEditModal(transaction)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const removeTransaction = async () => {
    await deleteTransaction({ variables: { id: transaction.id } })
    form.setData(old => {
      const transactions = old.transactions.filter(row => row.id !== transaction.id)
      return {
        ...old,
        transactions
      }
    })
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={removeTransaction}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
