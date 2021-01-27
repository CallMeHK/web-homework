jest.mock('../entry-form/TransactionForm', () => {
  return {
    TransactionForm: props => (
      <button
        data-testid="formStub"
        onClick={() => {
          props.formCallback({ id: 'txid', test: 'value' })
        }}
      ></button>
    )
  }
})

import React from 'react'
import { EditModal } from './EditModal'
import { waitFor, fireEvent, render } from '@testing-library/react'
import { FormContext } from '../../context/form.context'
import '@testing-library/jest-dom/extend-expect'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('EditModal', () => {
  let props

  beforeEach(() => {
    props = {
      setIsModalOpen: jest.fn(),
      setData: jest.fn(),
      isModalOpen: true
    }

  })
  describe('handleEdit', () => {
    it('should call setData and close modal', async () => {
      const wrapper = render(
        <FormContext.Provider value={props}>
          <EditModal merchants={[]} users={[]} />
        </FormContext.Provider>
      )

      fireEvent.click(await wrapper.findByTestId('formStub'))

      await waitFor(() => {
        expect(props.setData).toHaveBeenCalledTimes(1)
        expect(props.setIsModalOpen).toHaveBeenCalledTimes(1)
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

      expect(newData.transactions[0]).toEqual({ id: 'txid', test: 'value' })
    })
  })
})
