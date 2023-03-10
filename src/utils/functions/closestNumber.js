//binary search O(log n)
export function findClosestNumber(arr, inputNumber) {
  // let closestNumber = arr[0]; // start by assuming the first number in the array is the closest
  // for (let i = 1; i < arr.length; i++) {

  //   if (
  //     Math.abs(arr[i] - inputNumber) < Math.abs(closestNumber - inputNumber)
  //   ) {
  //     closestNumber = arr[i];
  //   }
  // }
  // return closestNumber;
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === inputNumber) {
      return arr[mid];
    }

    if (arr[mid] < inputNumber) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left === 0) {
    return arr[0];
  }
  if (left === arr.length - 1) {
    return arr[arr.length - 1];
  }

  const prevDiff = inputNumber - arr[left - 1];
  const nextDiff = arr[left] - inputNumber;

  return prevDiff < nextDiff ? arr[left - 1] : arr[left];
}
