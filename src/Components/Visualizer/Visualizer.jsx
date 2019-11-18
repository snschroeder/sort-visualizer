import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bar/Bar';
import './Visualizer.css'

export default function Visualizer(props) {

  const [sortedArr, setSortedArr] = useState([]);
  const [randomizedArr, setRandomizedArr] = useState([]);

  const [pieceOne, setPieceOne] = useState(-1);
  const [pieceTwo, setPieceTwo] = useState(-1);

  const { sortType } = props;

  const sort = [];

  const genRandomizedArr = (numVals, maxVal) => {
    let random = [];
    sort.length = 0;
    for (let i = 0; i <= numVals; i++) {
      random.push(Math.floor(Math.random() * maxVal) + 1);
    }
    setRandomizedArr(random);
    setSortedArr(random);
  }

  const sortData = () => {
    let sorted = [];
    if (sortType === 'quick-sort') {
      sorted = quickSort([...randomizedArr]);
    } else if (sortType === 'bubble-sort') {
      sorted = bubbleSort([...randomizedArr]);
    } else if (sortType === 'comb-sort') {
      sorted = combSort([...randomizedArr]);
    } else if (sortType === 'selection-sort') {
      sorted = selectionSort([...randomizedArr]);
    } else if (sortType === 'insertion-sort') {
      sorted = insertionSort([...randomizedArr]);
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
  };

  const combSort = (arr) => {
    let gap = arr.length;
    let shrinkRate = 1.3;
    let swapped;

    while (gap > 1 || swapped) {
      if (gap > 1) {
        gap = Math.floor(gap / shrinkRate);
      }
      swapped = false;
      for (let i = 0; i + gap < arr.length; i++) {
        if (arr[i] > arr[i + gap]) {
          swap(arr, i, i + gap);
          swapped = true;
        }
      }
    }
    return arr;
  }

  const selectionSort = (arr) => {
    let i;
    let j;
    let minIndex;
    for (i = 0; i < arr.length; i++) {
      minIndex = i;
      for (j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      swap(arr, i, minIndex);
    }
    return arr;
  }

  const bubbleSort = (arr) => {
    let swaps = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        swaps++;
      }
    }
    if (swaps > 0) {
      return bubbleSort(arr);
    }
    return arr;
  }

  const insertionSort = (arr) => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      let elem = arr[i];
      let j;
      for (j = i - 1; j >= 0 && arr[j] > elem; j--) {
        arr[j + 1] = arr[j];
        sort.push(j);
        sort.push(j + 1);
      }
      arr[j + 1] = elem;
    }
    return arr;
  }

  const animate = () => {
    sortData();
    let clone = [...randomizedArr];
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


  return (
    <>
      <section className="button-group">
        <button type="button" className="randomize-button" onClick={() => genRandomizedArr(200, 500)}>Generate new array</button>
        <button type="button" className="animate" onClick={() => animate()}>Animate!</button>
      </section>
      <section className="vizDisplay" id="viz">
        <ul className="display-nums">
          {randomizedArr.map((val, index) => (
            <Bar
              key={index}
              length={val}
              selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'}
            />
          ))
          }
        </ul>
      </section>
    </>
  )
}