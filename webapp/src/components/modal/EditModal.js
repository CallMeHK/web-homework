import React from 'react'
import Card from '@material-ui/core/Card'
import { css } from '@emotion/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { TransactionForm } from '../entry-form/TransactionForm'
import { useModalContext } from '../../context/modal.context'

export const EditModal = ({ merchants, users, setData }) => {
  const modal = useModalContext()

  const handleClose = () => {
    modal.setOpen(false)
  }

  const handleEdit = editedTransaction => {
    setData(old => ({
      ...old,
      transactions: [...old.transactions.filter(row => row.id !== editedTransaction.id), editedTransaction]
    }))
    modal.setOpen(false)
  }

  return (
    <div>
      <Modal
        open={modal.open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div css={modalContainerStyle}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Edit Transaction
              </Typography>
              <Typography variant="body2" component="p">
                Please edit the transaction information below to the best of your ability.
              </Typography>
              <TransactionForm
                data={{ merchants, users }}
                formCallback={handleEdit}
                editValues={modal.initialEditState}
                edit
              />
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  )
}

const modalContainerStyle = css`
  max-width: 720px;
  position: absolute;
`
