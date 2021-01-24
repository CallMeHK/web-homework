import React from 'react'
import Card from '@material-ui/core/Card'
import { css } from '@emotion/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { TransactionForm } from '../entry-form/TransactionForm'
import { useFormContext } from '../../context/form.context'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import IconButton from '@material-ui/core/IconButton'

export const EditModal = ({ merchants, users }) => {
  const form = useFormContext()

  const handleClose = () => {
    form.setIsModalOpen(false)
  }

  const handleEdit = editedTransaction => {
    debugger
    form.setData(old => {
      console.log(old)
      return {
        ...old,
        transactions: old.transactions.map(row => {
          if (row.id === editedTransaction.id) return editedTransaction
          return row
        })
      }
    })
    form.setIsModalOpen(false)
  }

  return (
    <div>
      <Modal
        open={form.isModalOpen}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div css={modalContainerStyle}>
          <Card>
            <CardContent>
              <div css={modalTopRowStyle}>
                <Typography color="textSecondary">Edit Transaction</Typography>
                <div css={closeButtonContainerStyle}>
                  <IconButton color="inherit" onClick={handleClose} edge="start">
                    <CancelPresentationIcon />
                  </IconButton>
                </div>
              </div>
              <Typography variant="body2" component="p">
                Please edit the transaction information below to the best of your ability.
              </Typography>
              <TransactionForm
                data={{ merchants, users }}
                formCallback={handleEdit}
                editValues={form.initialEditState}
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
const modalTopRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const closeButtonContainerStyle = css`
  margin-bottom: 8px;
`
