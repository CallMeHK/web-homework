import React from 'react'
import { TxRowDropdown } from './TxRowDropdown'
import { waitFor, fireEvent, render } from '@testing-library/react'
import { FormContext } from '../../context/form.context'
import '@testing-library/jest-dom/extend-expect'
import * as Apollo from '@apollo/client'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})

describe('TxRowDropdown', () => {
  let props
  let deleteStub
  let data

  beforeEach(() => {
    props = {
      openEditModal: jest.fn(),
      setData: jest.fn()
    }

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

    deleteStub = jest.fn()

    jest.spyOn(Apollo, 'useMutation').mockImplementation(() => [deleteStub])
  })
  describe('Delete', () => {
    it('should call delete and setdata callback', async () => {
      const wrapper = render(
        <FormContext.Provider value={props}>
          <TxRowDropdown transaction={data} />
        </FormContext.Provider>
      )

      fireEvent.click(await wrapper.findByTestId('dropdown'))
      fireEvent.click(await wrapper.findByTestId('delete'))

      expect(deleteStub).toHaveBeenCalledWith({ variables: { id: 'txid' } })
      await waitFor(() => {
        expect(props.setData).toHaveBeenCalledTimes(1)
      })
      const newData = props.setData.mock.calls[0][0]({
        merchants: [],
        users: [],
        transactions: [
          {
            id: 'txid'
          },
          {
            id: 'not-txid'
          }
        ]
      })

      expect(newData).toEqual({
        merchants: [],
        users: [],
        transactions: [
          {
            id: 'not-txid'
          }
        ]
      })
    })
  })

  describe('Edit', () => {
    it('should call openEditModal and close dropdown', async () => {
      const wrapper = render(
        <FormContext.Provider value={props}>
          <TxRowDropdown transaction={data} />
        </FormContext.Provider>
      )

      fireEvent.click(await wrapper.findByTestId('dropdown'))
      fireEvent.click(await wrapper.findByTestId('edit'))

      expect(props.openEditModal).toHaveBeenCalledWith(data)
      await waitFor(() => {
        expect(wrapper.queryByTestId('edit')).not.toBeInTheDocument()
      })
    })
  })
})
