import React from 'react'
import renderer from 'react-test-renderer'
import { TxTable } from './TxTable'
import * as Row from './TxTableRow'

// no dom assertion or conditionals in this file, used snapshot instead of rtl
describe('Transactions Table', () => {
  beforeEach(() => {
    jest.spyOn(Row, 'TxTableRow').mockImplementation(props => <div data-test={JSON.stringify(props.transaction)}></div>)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  describe('No rows passed ', () => {
    it('should render an empty table', () => {
      const data = {
        merchants: [],
        transactions: [],
        users: []
      }
      const tree = renderer.create(<TxTable data={data} setData={() => {}} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Rows of transactions passed', () => {
    it('should render an empty table', () => {
      const data = {
        merchants: [],
        transactions: [
          {
            __typename: 'Transaction',
            id: '2dc97d4f-bbbe-4f58-944d-23eaa23bb3ba',
            user: { __typename: 'User', firstName: 'tifa', id: '203ddf…', lastName: 'lockhart' },
            merchant: { __typename: 'Merchant', description: 'a shop with …', name: 'shop' },
            description: 'afweawef',
            debit: true,
            credit: false,
            amount: 100,
            insertedAt: '2021-01-27T04:36:49'
          },
          {
            __typename: 'Transaction',
            id: 'b2f2f116-68e8-4b5f-9c8b-8c62425795b0',
            user: { __typename: 'User', firstName: 'tifa', id: '203ddf…', lastName: 'lockhart' },
            merchant: { __typename: 'Merchant', description: 'a shop with …', name: 'shop' },
            description: 'asdfew2',
            debit: true,
            credit: false,
            amount: 3344,
            insertedAt: '2021-01-27T04:39:59'
          },
          {
            __typename: 'Transaction',
            id: '1df91896-3da4-429c-96a6-f39519250150',
            user: { __typename: 'User', firstName: 'tifa', id: '203ddf…', lastName: 'lockhart' },
            merchant: { __typename: 'Merchant', description: 'a shop with …', name: 'shop' },
            description: 'sadf',
            debit: false,
            credit: true,
            amount: 100,
            insertedAt: '2021-01-27T05:40:23'
          }
        ],
        users: []
      }
      const tree = renderer.create(<TxTable data={data} setData={() => {}} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
