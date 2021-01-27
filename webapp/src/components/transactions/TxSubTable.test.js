import React from 'react'
import renderer from 'react-test-renderer'
import { TxSubTable } from './TxSubTable'

describe('TxSubTable', () => {
  describe('Other payment', () => {
    it('should render other', () => {
      const tree = renderer
        .create(
          <TxSubTable
            credit={false}
            debit={false}
            description="transactionDescription"
            merchant={{ description: 'merchantDescription' }}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Credit payment', () => {
    it('should render Credit', () => {
      const tree = renderer
        .create(
          <TxSubTable
            credit={true}
            debit={false}
            description="transactionDescription"
            merchant={{ description: 'merchantDescription' }}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Debit payment', () => {
    it('should render Debit', () => {
      const tree = renderer
        .create(
          <TxSubTable
            credit={false}
            debit={true}
            description="transactionDescription"
            merchant={{ description: 'merchantDescription' }}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
