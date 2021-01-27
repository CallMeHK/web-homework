import React from 'react'
import { TxTableRow } from './TxTableRow'
import { fireEvent, render } from '@testing-library/react'
import { FormContext } from '../../context/form.context'
import '@testing-library/jest-dom/extend-expect'
import * as Apollo from '@apollo/client'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('TxTableRow', () => {
  let props
  let useMutationStub
  let data

  beforeEach(() => {
    props = {
      openEditModal: jest.fn(),
      setData: jest.fn()
    }
    // jest.spyOn(Form, 'useFormContext').mockImplementation(() => ({}))

    data = {
      __typename: 'Transaction',
      id: 'txid',
      user: { __typename: 'User', firstName: 'tifa', id: '203ddf…', lastName: 'lockhart' },
      merchant: { __typename: 'Merchant', description: 'a shop with …', name: 'shop' },
      description: 'afweawef',
      debit: true,
      credit: false,
      amount: 100,
      insertedAt: '2021-01-27T04:36:49'
    }

    useMutationStub = jest.fn()

    jest.spyOn(Apollo, 'useMutation').mockImplementation(() => [useMutationStub])
  })
  describe('row fields', () => {
    it('should display some row fields when collapse is closed', async () => {
      const wrapper = render(
        <FormContext.Provider value={props}>
          <TxTableRow transaction={data} />
        </FormContext.Provider>
      )

      const userName = wrapper.getByTestId('transaction-userName-txid')
      const transactionDate = wrapper.getByTestId('transaction-transactionDate-txid')
      const merchantName = wrapper.getByTestId('transaction-merchantName-txid')
      const amount = wrapper.getByTestId('transaction-amount-txid')

      const payment = wrapper.queryByTestId('payment')

      expect(userName).toHaveTextContent('tifa lockhart')
      expect(transactionDate).toHaveTextContent('2021-01-27T04:36:49')
      expect(merchantName).toHaveTextContent('shop')
      expect(amount).toHaveTextContent('1.00')
      expect(payment).not.toBeInTheDocument()
    })
    it('should display all row fields when collapse is open', async () => {
      const wrapper = render(
        <FormContext.Provider value={props}>
          <TxTableRow transaction={data} />
        </FormContext.Provider>
      )

      fireEvent.click(wrapper.getByTestId('down-icon'))

      const payment = await wrapper.findByTestId('payment')
      const transactionDescription = await wrapper.findByTestId('transactionDescription')
      const merchantDescription = await wrapper.findByTestId('merchantDescription')
      const upIcon = await wrapper.findByTestId('up-icon')

      expect(payment).toHaveTextContent('Debit')
      expect(transactionDescription).toHaveTextContent('afweawef')
      expect(merchantDescription).toHaveTextContent('a shop with …')
      expect(upIcon).toBeInTheDocument()
    })
  })
})
