jest.mock('../components/transactions/TxTable', () => {
  return {
    TxTable: props => <div>table</div>
  }
})

import React from 'react'
import renderer from 'react-test-renderer'
import { waitFor, fireEvent, render } from '@testing-library/react'
import { Transactions } from './transactions'
import * as Apollo from '@apollo/client'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('transactions', () => {
  let useQueryStub
  beforeEach(() => {
    useQueryStub = jest.spyOn(Apollo, 'useQuery')
  })
  describe('Transactions', () => {
    describe('Loading', () => {
      it('should render loading experience', () => {
        useQueryStub.mockImplementation(() => ({ loading: true }))
        const tree = renderer.create(<Transactions />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
    describe('Error', () => {
      it('should render error experience', () => {
        useQueryStub.mockImplementation(() => ({ error: true }))
        const tree = renderer.create(<Transactions />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Experience loaded', () => {
      it('should render error experience', async () => {
        useQueryStub.mockImplementationOnce((_, { onCompleted }) => {
          onCompleted({ merchants: [], users: [], transactions: [] })
          return {}
        })
        useQueryStub.mockImplementation(() => ({}))
        const wrapper = render(<Transactions />)

        expect(await wrapper.findByText('table')).toBeInTheDocument()
      })
    })
  })
})
