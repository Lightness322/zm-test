export function formatPrice(price) {
  const strPrice = String(price)

  const dotIndex = strPrice.indexOf('.')

  if (dotIndex === -1) return strPrice + '.00'

  const numbersAfterDotQty = strPrice.slice(dotIndex + 1).length

  if (numbersAfterDotQty === 2) return strPrice

  return strPrice + '0'
}
