import React from 'react'
import { user, merchant } from '../../utils/types'
import { arrayOf } from 'prop-types'
import Card from '@material-ui/core/Card'
import { css } from '@emotion/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
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
    form.setData(old => {
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
        aria-describedby='simple-modal-description'
        aria-labelledby='simple-modal-title'
        onClose={handleClose}
        open={form.isModalOpen}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div css={modalContainerStyle}>
          <Card>
            <CardContent>
              <div css={modalTopRowStyle}>
                <Typography color='textSecondary'>Edit Transaction</Typography>
                <div css={closeButtonContainerStyle}>
                  <IconButton color='inherit' edge='start' onClick={handleClose}>
                    <CancelPresentationIcon />
                  </IconButton>
                </div>
              </div>
              <Typography component='p' variant='body2'>
                Please edit the transaction information below to the best of your ability.
              </Typography>
              <TransactionForm
                data={{ merchants, users }}
                edit
                editValues={form.initialEditState}
                formCallback={handleEdit}
              />
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  )
}

EditModal.propTypes = {
  merchants: arrayOf(merchant),
  users: arrayOf(user)
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
