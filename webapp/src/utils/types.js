import { arrayOf, string, bool, number, shape, func } from 'prop-types'

export const merchant = shape({
  id: string,
  name: string
})

export const user = shape({
  id: string,
  firstName: string,
  lastName: string
})

export const transaction = shape({
  id: string,
  user_id: string,
  description: string,
  merchant_id: string,
  debit: bool,
  credit: bool,
  amount: number,
  merchant: shape({
    id: string,
    description: string,
    name: string
  }),
  user: shape({
    id: string,
    firstName: string,
    lastName: string
  })
})

export const initialEditStateType = shape({
    txId: string,
    user: string,
    merchant: string,
    amount: string,
    paymentType: string,
    description: string
})