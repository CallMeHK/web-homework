import { convertToRoman, romanMap } from './roman'

describe('roman', () => {
  describe('#convertToRoman', () => {
    describe('should convert numbers in the map to numerals', () => {
      Object.entries(romanMap).forEach(([result, number]) => {
        it('should convert ' + number + ' to ' + result, () => {
          expect(convertToRoman(number)).toBe(result)
        })
      })
    })

    describe('should convert other numbers into numerals', () => {
      Object.entries({
        MMMDCCXXIV: 3724,
        MMM: 3000,
        VII: 7,
        XIV: 14
      }).forEach(([result, number]) => {
        it('should convert ' + number + ' to ' + result, () => {
          expect(convertToRoman(number)).toBe(result)
        })
      })
    })
  })
})
