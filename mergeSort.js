function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }
  const leftPart = array.slice(0, Math.ceil(array.length / 2));
  const rightPart = array.slice(Math.ceil(array.length / 2));
  let recArray = mergeSort(leftPart).concat(mergeSort(rightPart));
  let sortedArray = [];

  for (let i = 0; i < array.length; i++) {
    sortedArray.push(Math.min(...recArray));
    recArray.splice(recArray.indexOf(Math.min(...recArray)), 1);
  }

  return sortedArray;
}
