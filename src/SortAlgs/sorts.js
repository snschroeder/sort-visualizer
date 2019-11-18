const sorts = {
  quickSort(arr, start = 0, end = arr.length) {
    if (start >= end) { return arr; }
    let pivot = this.partition(arr, start, end);
    this.quickSort(arr, start, pivot);
    this.quickSort(arr, pivot + 1, end);
    return arr;
  },

  partition(arr, start, end) {
    let pivot = arr[end - 1];
    let i = start;
    for (let j = start; j < end - 1; j++) {
      if (arr[j] <= pivot) {
        this.swap(arr, j, i);
        i++;
      }
    }
    this.swap(arr, i, end - 1);
    return i;
  },

  swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  },

  mergeSort(arr) {
    if (arr.length <= 1) { return arr; }

    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    this.mergeSort(left);
    this.mergeSort(right);
    this.merge(left, right, arr);
    return arr;
  },

  merge(left, right, arr) {
    let leftInd = 0;
    let rightInd = 0;
    let outputInd = 0;

    while (leftInd < left.length && rightInd < right.length) {
      if (left[leftInd] < right[rightInd]) {
        arr[outputInd++] = left[leftInd++];
      } else {
        arr[outputInd++] = right[rightInd++];
      }
    }
    while (leftInd < left.length) {
      arr[outputInd++] = left[leftInd++]
    }
    while (rightInd < right.length) {
      arr[outputInd++] = right[rightInd++]
    }
    return arr;
  },

  heapify(arr, len, i) {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < len && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.heapify(arr, len, largest);
    }
    return arr;
  },

  heapSort(arr) {
    let len = arr.length;
    let i = Math.floor(len / 2 - 1);
    let j = len - 1;

    while (i >= 0) {
      this.heapify(arr, len, i);
      i--;
    }
    while (j >= 0) {
      [arr[0], arr[j]] = [arr[j], arr[0]];
      this.heapify(arr, j, 0);
      j--;
    }
    return arr;
  },
}

export default sorts;

// const mergeSort = (arr, offset = 0, start = 0) => {
  //   if (arr.length <= 1) { return arr; }

  //   const mid = Math.floor(arr.length / 2)
  //   const left = arr.slice(0, mid);
  //   const right = arr.slice(mid);
  //   mergeSort(left, mid, start);
  //   mergeSort(right, mid, mid);
  //   merge(left, right, arr, start, mid);

  //   return arr;

  // };

  // const merge = (left, right, arr, start, offset) => {
  //   let leftInd = 0;
  //   let rightInd = 0;
  //   let outputInd = 0;

  //   while (leftInd < left.length && rightInd < right.length) {
  //     if (left[leftInd] < right[rightInd]) {

  //       sort.push(outputInd + start);
  //       sort.push(leftInd + start);
  //       arr[outputInd++] = left[leftInd++];
  //     } else {

  //       sort.push(outputInd + offset);
  //       sort.push(rightInd + offset);
  //       arr[outputInd++] = right[rightInd++];
  //     }
  //   }
  //   while (leftInd < left.length) {

  //     sort.push(outputInd + start);
  //     sort.push(leftInd + start);
  //     arr[outputInd++] = left[leftInd++]
  //   }
  //   while (rightInd < right.length) {

  //     sort.push(outputInd + offset);
  //     sort.push(rightInd + offset);
  //     arr[outputInd++] = right[rightInd++]
  //   }

  //   console.log(sort);
  //   return arr;
  // };

    // const heapify = (arr, len, i) => {
  //   let largest = i;
  //   let left = i * 2 + 1;
  //   let right = left + 1;

  //   if (left < len && arr[left] > arr[largest]) {
  //     largest = left;
  //   }
  //   if (right < len && arr[right] > arr[largest]) {
  //     largest = right;
  //   }
  //   if (largest !== i) {
  //     [arr[i], arr[largest]] = [arr[largest], arr[i]];
  //     sort.push(i);
  //     sort.push(largest);
  //     heapify(arr, len, largest);
  //   }
  //   return arr;
  // };

  // const heapSort = (arr) => {
  //   let len = arr.length;
  //   let i = Math.floor(len / 2 - 1);
  //   let j = len - 1;

  //   while (i >= 0) {
  //     heapify(arr, len, i);
  //     i--;
  //   }
  //   while (j >= 0) {
  //     [arr[0], arr[j]] = [arr[j], arr[0]];
  //     heapify(arr, j, 0);
  //     j--;
  //   }
  //   return arr;
  // }