export function formatIndianCurrency(amount, withSymbol = false) {
  const rupee = '₹';

  const value = amount.toString();

  let lastThree = value.substring(value.length - 3);

  const otherNumbers = value.substring(0, value.length - 3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return withSymbol ? rupee + res : res;
}
