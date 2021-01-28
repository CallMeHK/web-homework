export const romanMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

export const convertToRoman = number => {
  const r = (acc, val) => {
    const { _number, _numeral } = acc
    if (_number === 0) return acc

    const [numeral, numeralValue] = val
    const timesToAddNumeral = Math.floor(_number / numeralValue)

    const numeralsToAdd = Array(timesToAddNumeral)
      .fill(numeral)
      .join("")
    const numberToSubtract = timesToAddNumeral * numeralValue

    return {
      _number: _number - numberToSubtract,
      _numeral: _numeral + numeralsToAdd
    }
  }

  const { _numeral } = Object.entries(romanMap).reduce(r, { _number: number, _numeral: '' })
  return _numeral
}
