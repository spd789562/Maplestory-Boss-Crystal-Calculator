const enLookup = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'G' },
  { value: 1e12, symbol: 'T' },
  { value: 1e15, symbol: 'P' },
]

const zhLookup = [
  { value: 1, symbol: '' },
  { value: 1e4, symbol: '萬' },
  { value: 1e8, symbol: '億' },
  { value: 1e12, symbol: '兆' },
  { value: 1e16, symbol: '京' },
]

const numberFormat = function numberFormat(number) {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const unitFormat = function unitFormat(lang) {
  const lookup = lang.startsWith('zh') ? zhLookup : enLookup
  return function _unitFormat(num, digits = 0) {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value
      })
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0'
  }
}

export default numberFormat
