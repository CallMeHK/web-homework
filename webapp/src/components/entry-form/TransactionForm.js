import React from 'react'
import { arrayOf, string, bool, number, shape, func } from 'prop-types'
import { transaction, user, merchant, initialEditStateType } from '../../utils/types'
import { useForm, Controller, useWatch } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { css } from '@emotion/core'
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CREATE_TRANSACTION from '../../gql/create_transaction.gql'
import UPDATE_TRANSACTION from '../../gql/update_transaction.gql'
import { useMutation } from '@apollo/client'
import { currency } from '../../utils/currency'



export const TransactionForm = ({ data, formCallback, editValues, edit }) => {
  const { control, errors, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched'
  })
  const [createOrEditTransaction, { _data }] = useMutation(edit ? UPDATE_TRANSACTION : CREATE_TRANSACTION)

  const { merchants, users } = data

  const clearField = (fieldName, value = '') => setValue(fieldName, value)

  const clearAllFields = () => {
    clearField('user')
    clearField('merchant')
    clearField('paymentType')
    clearField('description')
    clearField('amount')
  }

  // update this transactrion thing to work with edit when edit true
  const onSubmit = async submittedForm => {
    const { user, merchant, description, amount, paymentType } = submittedForm
    const integerAmount = currency.convertToInteger(amount)

    const response = await createOrEditTransaction({
      variables: {
        ...(edit && { id: editValues.txId }),
        userId: user,
        merchantId: merchant,
        description,
        amount: integerAmount,
        credit: paymentType === 'Credit',
        debit: paymentType === 'Debit'
      }
    })

    formCallback(edit ? response.data.updateTransaction : response.data.createTransaction)
    clearAllFields()
    reset()
  }

  return (
    <form>
      <Controller
        name="user"
        control={control}
        defaultValue={edit ? editValues.user : ''}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <FormControl css={largeTextFieldStyle}>
            <InputLabel>User Name</InputLabel>
            <Select native value={value} onChange={onChange} onBlur={onBlur}>
              <option aria-label="None" value="" />
              <>
                {users.map(({ firstName, lastName, id }) => (
                  <option key={id} value={id}>
                    {`${firstName} ${lastName}`}
                  </option>
                ))}
              </>
            </Select>
            {errors.user && <div style={{ color: 'red' }}>Required</div>}
          </FormControl>
        )}
      />
      <Controller
        name="merchant"
        control={control}
        defaultValue={edit ? editValues.merchant : ''}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <FormControl css={largeTextFieldStyle}>
            <InputLabel>Merchant</InputLabel>
            <Select native value={value} onChange={onChange} onBlur={onBlur}>
              <option aria-label="None" value="" />
              <>
                {merchants.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </>
            </Select>
            {errors.merchant && <div style={{ color: 'red' }}>Required</div>}
          </FormControl>
        )}
      />
      <Controller
        name="paymentType"
        control={control}
        defaultValue={edit ? editValues.paymentType : ''}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <FormControl css={largeTextFieldStyle}>
            <InputLabel>Payment Type</InputLabel>
            <Select native value={value} onChange={onChange} onBlur={onBlur}>
              <option aria-label="None" value="" />
              <>
                {['Credit', 'Debit', 'Other'].map(elt => (
                  <option key={elt} value={elt}>
                    {elt}
                  </option>
                ))}
              </>
            </Select>
            {errors.paymentType && <div style={{ color: 'red' }}>Required</div>}
          </FormControl>
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue={edit ? editValues.description : ''}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <>
            <TextField
              label="Description"
              onBlur={onBlur}
              css={largeTextFieldStyle}
              onChange={onChange}
              value={value}
            />
            {errors.description && <div style={{ color: 'red', marginLeft: 10 }}>Required</div>}
          </>
        )}
      />
      <Controller
        name="amount"
        control={control}
        defaultValue={edit ? editValues.amount : ''}
        rules={{ required: true, validate: validateAmount }}
        render={({ onChange, onBlur, value }) => (
          <div>
            <TextField label="Amount" css={largeTextFieldStyle} onBlur={onBlur} onChange={onChange} value={value} />
            {errors.amount && <div style={{ color: 'red', marginLeft: 10 }}>{errors.amount.message || 'Required'}</div>}
          </div>
        )}
      />
      <Divider />
      <div css={formSpacerStyle} />

      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        {edit ? 'Update' : 'Submit'}
      </Button>
    </form>
  )
}

TransactionForm.propTypes = {
  data: shape({
    transactions: arrayOf(transaction),
    users: arrayOf(user),
    merchants: arrayOf(merchant)
  }).isRequired,
  formCallback: func.isRequired,
  editValues: initialEditStateType,
  edit: bool
}

const validateAmount = amount => {
  const standardError = 'Please enter dollars and cents (Ex 249.99)'

  const amtArray = amount.split('.')

  const isSplitCorrectly = amtArray.length === 2
  const isCentsCorrectLength = amtArray[1] && amtArray[1].length === 2
  const isCentsInteger = !isNaN(amtArray[1]) && parseInt(amtArray[1]) >= 0
  const isDollarsInteger = !isNaN(amtArray[0]) && parseInt(amtArray[0]) >= 0

  const isValidFormat = isSplitCorrectly && isCentsCorrectLength && isCentsInteger && isDollarsInteger

  if (!isValidFormat) return standardError
  else if (parseInt(amtArray[0] + amtArray[1])) return true
  return standardError
}

const largeTextFieldStyle = css`
  width: 90%;
  margin: 10px;
`

const formSpacerStyle = css`
  height: 10px;
`
