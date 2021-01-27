import React from 'react'
import { FormContextProvider, FormContext } from './form.context'
import { waitFor, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('FormContext', () => {
  describe('openEditModal', () => {
    describe('Debit', () => {
      it('should pass the correct arguments to setInitialState', async () => {
        const data = {
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
        const setDataStub = jest.fn()

        const wrapper = render(
          <FormContextProvider setData={setDataStub}>
            <FormContext.Consumer>
              {value => (
                <div>
                  <button data-testid="setInitialEditState" onClick={() => value.openEditModal(data)}>
                    setInitialEditState
                  </button>
                  <p>{value.initialEditState && value.initialEditState.amount}</p>
                  <p>{value.initialEditState && value.initialEditState.paymentType}</p>
                </div>
              )}
            </FormContext.Consumer>
          </FormContextProvider>
        )

        fireEvent.click(await wrapper.findByTestId('setInitialEditState'))

        expect(await wrapper.findByText('1.00')).toBeInTheDocument()
        expect(await wrapper.findByText('Debit')).toBeInTheDocument()
      })
    })

   describe('credit', () => {
      it('should pass the correct arguments to setInitialState', async () => {
        const data = {
          __typename: 'Transaction',
          id: 'txid',
          user: { __typename: 'User', firstName: 'tifa', id: '203ddf…', lastName: 'lockhart' },
          merchant: { __typename: 'Merchant', description: 'a shop with …', name: 'shop' },
          description: 'afweawef',
          debit: false,
          credit: true,
          amount: 100,
          insertedAt: '2021-01-27T04:36:49'
        }
        const setDataStub = jest.fn()

        const wrapper = render(
          <FormContextProvider setData={setDataStub}>
            <FormContext.Consumer>
              {value => (
                <div>
                  <button data-testid="setInitialEditState" onClick={() => value.openEditModal(data)}>
                    setInitialEditState
                  </button>
                  <p>{value.initialEditState && value.initialEditState.amount}</p>
                  <p>{value.initialEditState && value.initialEditState.paymentType}</p>
                </div>
              )}
            </FormContext.Consumer>
          </FormContextProvider>
        )

        fireEvent.click(await wrapper.findByTestId('setInitialEditState'))

        expect(await wrapper.findByText('1.00')).toBeInTheDocument()
        expect(await wrapper.findByText('Credit')).toBeInTheDocument()
      })
    })

   describe('other', () => {
      it('should pass the correct arguments to setInitialState', async () => {
        const data = {
          __typename: 'Transaction',
          id: 'txid',
          user: { __typename: 'User', firstName: 'tifa', id: '203ddf…', lastName: 'lockhart' },
          merchant: { __typename: 'Merchant', description: 'a shop with …', name: 'shop' },
          description: 'afweawef',
          debit: false,
          credit: false,
          amount: 100,
          insertedAt: '2021-01-27T04:36:49'
        }
        const setDataStub = jest.fn()

        const wrapper = render(
          <FormContextProvider setData={setDataStub}>
            <FormContext.Consumer>
              {value => (
                <div>
                  <button data-testid="setInitialEditState" onClick={() => value.openEditModal(data)}>
                    setInitialEditState
                  </button>
                  <p>{value.initialEditState && value.initialEditState.amount}</p>
                  <p>{value.initialEditState && value.initialEditState.paymentType}</p>
                </div>
              )}
            </FormContext.Consumer>
          </FormContextProvider>
        )

        fireEvent.click(await wrapper.findByTestId('setInitialEditState'))

        expect(await wrapper.findByText('1.00')).toBeInTheDocument()
        expect(await wrapper.findByText('Other')).toBeInTheDocument()
      })
    })
  })
})
