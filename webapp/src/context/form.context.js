import React from 'react'
import { func } from 'prop-types'
import { currency } from '../utils/currency'

export const FormContext = React.createContext({})
export const useFormContext = () => React.useContext(FormContext)

export const FormContextProvider = ({ children, setData }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [initialEditState, setInitialEditState] = React.useState({})

  const openEditModal = transaction => {
    const { id, user, merchant, amount, credit, debit, description } = transaction

    setInitialEditState({
      txId: id,
      user: user.id,
      merchant: merchant.id,
      amount: currency.convertToString(amount),
      paymentType: credit ? 'Credit' : debit ? 'Debit' : 'Other',
      description
    })
    setIsModalOpen(true)
  }

  const value = {
    isModalOpen,
    setIsModalOpen,
    initialEditState,
    setInitialEditState,
    openEditModal,
    setData
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

FormContextProvider.propTypes = {
  setData: func.isRequired
}
