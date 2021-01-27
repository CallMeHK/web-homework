import { currency } from './currency'

describe('currency', () => {
  describe('#convertToInteger', () => {
    it('should return cents from dollar and cent string', () => {
      expect(currency.convertToInteger('12.34')).toEqual(1234)
    })
  })
  describe('#convertToString', () => {
    it('should return dollar and cent string from cent integer', () => {
      expect(currency.convertToString(1234)).toEqual('12.34')
    })
  })
})
