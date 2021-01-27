jest.mock('../components/entry-form/TransactionForm', () => {
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
import renderer from 'react-test-renderer'
import { waitFor, fireEvent, render } from '@testing-library/react'
import { EntryPage } from './entry'
import * as Apollo from '@apollo/client'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('entry-page', () => {
  let useQueryStub
  beforeEach(() => {
    useQueryStub = jest.spyOn(Apollo, 'useQuery')
  })
  describe('EntryPage', () => {
    describe('Loading', () => {
      it('should render loading experience', () => {
        useQueryStub.mockImplementation(() => ({ loading: true }))
        const tree = renderer.create(<EntryPage />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
    describe('Error', () => {
      it('should render error experience', () => {
        useQueryStub.mockImplementation(() => ({ error: true }))
        const tree = renderer.create(<EntryPage />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Experience loaded', () => {
      it('should render error experience', async () => {
        useQueryStub.mockImplementationOnce((_, { onCompleted }) => {
          onCompleted({ merchants: [], users: [] })
          return {}
        })
        useQueryStub.mockImplementation(() => ({}))
        const wrapper = render(<EntryPage />)

        expect(await wrapper.findByTestId('formStub')).toBeInTheDocument()
      })
    })
  })
})
