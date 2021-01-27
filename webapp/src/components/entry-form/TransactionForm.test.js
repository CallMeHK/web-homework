import React from 'react'
import { TransactionForm, validateAmount } from './TransactionForm'
import { waitFor, fireEvent, render } from '@testing-library/react'
import * as Apollo from '@apollo/client'
import '@testing-library/jest-dom/extend-expect'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('TransactionForm', () => {
  let props
  let useMutationStub

  beforeEach(() => {
    props = {
      data: {
        transactions: [],
        users: [{ id: 'u', firstName: 'cloud', lastName: 'strife' }],
        merchants: [{ id: 'm', name: 'shop' }]
      },
      formCallback: jest.fn(),
      editValues: {},
      edit: false
    }
    useMutationStub = jest.fn()
    jest.spyOn(Apollo, 'useMutation').mockImplementation(() => [useMutationStub])
  })
  describe('edit: false', () => {
    it('should not submit form and show errors if incomplete', async () => {
      const wrapper = render(<TransactionForm {...props} />)

      fireEvent.click(await wrapper.findByText('Submit'))

      expect(await wrapper.findAllByText('Required')).toHaveLength(5)
      expect(useMutationStub).not.toHaveBeenCalled()
    })

    it('should submit form if complete', async () => {
      useMutationStub.mockImplementation(() => ({ data: { createTransaction: {} } }))
      const wrapper = render(<TransactionForm {...props} />)

      fireEvent.change(wrapper.queryByTestId('user'), { target: { value: 'u' } })
      fireEvent.change(wrapper.queryByTestId('merchant'), { target: { value: 'm' } })
      fireEvent.change(wrapper.queryByTestId('paymentType'), { target: { value: 'Credit' } })
      fireEvent.change(wrapper.queryByTestId('description'), { target: { value: 'testDescription' } })
      fireEvent.change(wrapper.queryByTestId('amount'), { target: { value: '1.01' } })

      fireEvent.click(await wrapper.findByText('Submit'))

      await waitFor(() => {
        expect(useMutationStub).toHaveBeenCalledWith({
          variables: {
            amount: 101,
            credit: true,
            debit: false,
            description: 'testDescription',
            merchantId: 'm',
            userId: 'u'
          }
        })
        expect(wrapper.queryByText('testDescription')).not.toBeInTheDocument()
      })
    })
  })

  describe('edit: true', () => {
    it('should submit form if complete', async () => {
      props.edit = true
      props.editValues = {
        txId: 'txid',
        user: 'u',
        merchant: 'm',
        amount: '1.00',
        paymentType: 'Credit',
        description: 'testDescription'
      }

      useMutationStub.mockImplementation(() => ({ data: { updateTransaction: {} } }))
      const wrapper = render(<TransactionForm {...props} />)

      fireEvent.change(wrapper.queryByTestId('description'), { target: { value: 'newTestDescription' } })

      fireEvent.click(await wrapper.findByText('Update'))

      await waitFor(() => {
        expect(useMutationStub).toHaveBeenCalledWith({
          variables: {
            id: 'txid',
            amount: 100,
            credit: true,
            debit: false,
            description: 'newTestDescription',
            merchantId: 'm',
            userId: 'u'
          }
        })
        expect(wrapper.queryByText('testDescription')).not.toBeInTheDocument()
      })
    })
  })

  describe('#validateAmount', () => {
    describe('reject', () => {
      it('has no decimal', () => {
        expect(validateAmount('100')).not.toBe(true)
      })
      it('has incorrect cents length', () => {
        expect(validateAmount('100.0')).not.toBe(true)
        expect(validateAmount('100.000')).not.toBe(true)
      })
      it('has noninteger values', () => {
        expect(validateAmount('100.ae')).not.toBe(true)
        expect(validateAmount('335m.00')).not.toBe(true)
        expect(validateAmount('100.-1')).not.toBe(true)
      })
    })

    describe('accepts', () => {
      it('should return true', () => {
        expect(validateAmount('100.01')).toBe(true)
      })
    })
  })
})
