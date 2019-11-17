import React, { useState, useEffect } from 'react';
import Bar from './Bar/Bar';
import sorts from '../../SortAlgs/sorts';
import './Visualizer.css'

export default function Visualizer(props) {

  const [sortedArr, setSortedArr] = useState([]);

  const [randomizedArr, setRandomizedArr] = useState([]);

  const [pieceOne, setPieceOne] = useState(-1);
  const [pieceTwo, setPieceTwo] = useState(-1);

  const [sortOrder, setSortOrder] = useState([]);
  const { sortType } = props;

  const sort = [];

  const genRandomizedArr = (numVals, maxVal) => {
    let random = [];
    for (let i = 0; i <= numVals; i++) {
      random.push(Math.floor(Math.random() * maxVal) + 1);
    }
    setRandomizedArr(random);
    setSortedArr(random);
    sortData();
  }

  const sortData = () => {
    let sorted = [];
    if (sortType === 'quick-sort') {
      sorted = quickSort([...randomizedArr]);

    } else if (sortType === 'merge-sort') {
      sorted = mergeSort([...randomizedArr]);
      // } else if (sortType === 'heap-sort') {
      //   sorted = sorts.heapSort(numArr);
    }
    setSortedArr(sorted);
  }

  const quickSort = (arr, start = 0, end = arr.length) => {
      if (start >= end) { return arr; }
      let pivot = partition(arr, start, end);
      quickSort(arr, start, pivot);
      quickSort(arr, pivot + 1, end);
      return arr;
  };

  const partition = (arr, start, end) => {
    let pivot = arr[end - 1];
    let i = start;
    for (let j = start; j < end - 1; j++) {
      if (arr[j] <= pivot) {
        swap(arr, j, i);
        i++;
      }
    }
    swap(arr, i, end - 1);
    return i;
  };

  const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    sort.push(i);
    sort.push(j);
    setSortOrder([...sort]);
  };

  const mergeSort = (arr) => {
    setTimeout(() => {
      setSortedArr(arr);
      if (arr.length <= 1) { return arr; }

      const mid = Math.floor(arr.length / 2)
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
      mergeSort(left);
      mergeSort(right);
      merge(left, right, arr);
      setSortedArr(arr);

      return arr;
    }, 1)

  };

  const merge = (left, right, arr) => {
    let leftInd = 0;
    let rightInd = 0;
    let outputInd = 0;

    while (leftInd < left.length && rightInd < right.length) {
      if (left[leftInd] < right[rightInd]) {
        setPieceOne(outputInd);
        setPieceTwo(leftInd);
        arr[outputInd++] = left[leftInd++];
      } else {
        setPieceOne(outputInd);
        setPieceTwo(right);
        arr[outputInd++] = right[rightInd++];
      }
    }
    while (leftInd < left.length) {
      setPieceOne(outputInd);
      setPieceTwo(leftInd);
      arr[outputInd++] = left[leftInd++]
    }
    while (rightInd < right.length) {
      setPieceOne(outputInd);
      setPieceTwo(right);
      arr[outputInd++] = right[rightInd++]
    }
    setSortedArr(arr);
    return arr;
  };

  const animate = () => {
    sortData();
    let sort = [...sortOrder]
    let clone = [...randomizedArr]

    for (let i = 0; i < sort.length; i += 2) {
      setTimeout(() => {
        let first = sort[i];
        let second = sort[i + 1];

        setPieceOne(first);
        setPieceTwo(second);

        let temp = clone[first];
        clone[first] = clone[second];
        clone[second] = temp;

        setRandomizedArr([...clone]);

      }, 10 + (10 * i))
    }
  }

  // useEffect(() => {
  //   setSortedArr(sortData());
  // });


  return (
    <section className="viz-display">
      <button type="button" className="randomize-button" onClick={() => genRandomizedArr(220, 300)}>Generate new array</button>
      {/* <button type="button" className="testing" onClick={() => sortData()}>Sort!</button> */}
      <button type="button" className="animate" onClick={() => animate()}>Animate!</button>
      <ul className="display-nums">
        { // sortedArr === undefined
          randomizedArr.map((val, index) => (
            <Bar
              key={index}
              length={val}
              selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'}
            // cursor={index === cursor ? 'cursor' : ''}
            />
          ))
          // : sortedArr.map((val, index) => (
          //   <Bar
          //     key={index}
          //     length={val}
          //     selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'}
          //   />
          // ))
        }
      </ul>

    </section>
  )
}