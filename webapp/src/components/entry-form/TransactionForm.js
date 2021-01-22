import React from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { css } from '@emotion/core'
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CREATE_TRANSACTION from '../../gql/create_transaction.gql'
import { useMutation } from '@apollo/client'

export const TransactionForm = ({ data, transactionAddedCallback, editValues, edit }) => {
  const { control, watch, formState, errors, handleSubmit, reset, setValue } = useForm({
    mode: 'onTouched'
  })
  const [createTransaction, { _data }] = useMutation(CREATE_TRANSACTION)

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
    const splitAmount = amount.split('.')
    const integerAmount = parseInt(splitAmount[0] + splitAmount[1])
    const response = await createTransaction({
      variables: {
        userId: user,
        merchantId: merchant,
        description,
        amount: integerAmount,
        credit: paymentType === 'Credit',
        debit: paymentType === 'Debit'
      }
    })
    transactionAddedCallback(response.data.createTransaction)
    clearAllFields()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="user"
        control={control}
        defaultValue={editValues && editValues.user}
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
        defaultValue={editValues && editValues.merchant}
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
        defaultValue={editValues && editValues.paymentType}
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
        defaultValue={editValues && editValues.description}
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
        defaultValue={editValues && editValues.amount}
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
      {JSON.stringify(watch())}
      {JSON.stringify(formState)}
      <Divider />
      <div css={formSpacerStyle} />

      <Divider />
      <div css={formSpacerStyle} />

      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </form>
  )
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

const formWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
`

const largeTextFieldStyle = css`
  width: 90%;
  margin: 10px;
`

const smallTextFieldStyle = css`
  margin: 10px;
  @media (min-width: 601px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`

const formSpacerStyle = css`
  height: 10px;
`
