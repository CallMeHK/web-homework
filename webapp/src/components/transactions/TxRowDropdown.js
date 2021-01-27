import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useMutation } from '@apollo/client'
import DELETE_TRANSACTION from '../../gql/delete_transaction.gql'
import { useFormContext } from '../../context/form.context'
import { transaction } from '../../utils/types'

export const TxRowDropdown = ({ transaction }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const form = useFormContext()
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

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
        aria-controls="long-menu"
        aria-haspopup="true"
        aria-label="more"
        onClick={handleToggle}
        ref={anchorRef}
        data-testid={'dropdown'}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper anchorEl={anchorRef.current} open={open} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem data-testid="edit" onClick={handleEdit}>
                    Edit
                  </MenuItem>
                  <MenuItem data-testid="delete" onClick={removeTransaction}>
                    Delete
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

TxRowDropdown.propTypes = {
  transaction: transaction.isRequired
}
