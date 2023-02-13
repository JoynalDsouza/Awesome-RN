export function formatIndianCurrency(amount, withSymbol = false) {
  const rupee = '₹';
  const value = amount.toString();
  const parts = value.split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  if (parts.length === 2) {
    return withSymbol ? rupee + res + '.' + parts[1] : res + '.' + parts[1];
  } else {
    return withSymbol ? rupee + res : res;
  }
}
