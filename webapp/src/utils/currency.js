const convertToInteger = amount => {
  const splitAmount = amount.split('.')
  const integerAmount = parseInt(splitAmount[0] + splitAmount[1])
  return integerAmount
}

const convertToString = amount => {
  return (amount / 100).toFixed(2).toString()
}

const currency = {
  convertToInteger,
  convertToString
}

export { currency }
