import React, { useState, useEffect } from 'react';
import Bar from './Bar/Bar';
import sorts from '../../SortAlgs/sorts';
import './Visualizer.css'

export default function Visualizer(props) {
  const [numArr, setNumArr] = useState([]);

  const [currArr, setCurrArr] = useState([]);

  const [pieceOne, setPieceOne] = useState(0);
  const [pieceTwo, setPieceTwo] = useState(0)
  const { sortType } = props;

  const genRandomizedArr = (numVals, maxVal) => {
    let random = [];
    for (let i = 0; i <= numVals; i++) {
      random.push(Math.floor(Math.random() * maxVal));
    }
    setNumArr(random);
  }

  const sortData = () => {
    //let sorted = [];
    if (sortType === 'quick-sort') {
      setNumArr(quickSort(numArr));
    // } else if (sortType === 'merge-sort') {
    //   sorted = sorts.mergeSort(numArr);
    // } else if (sortType === 'heap-sort') {
    //   sorted = sorts.heapSort(numArr);
    }
    //setNumArr(sorted)
  }

  const quickSort = (arr, start = 0, end = arr.length) => {
    setCurrArr(arr);
    // setTimeout(() => {
      if (start >= end) { return arr; }
      let pivot = partition(arr, start, end);
      quickSort(arr, start, pivot);
      quickSort(arr, pivot + 1, end);
      return arr;
  
    // }, 100)
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
    setTimeout(() => {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      setPieceOne(i);
      setPieceTwo(j);
    }, 10)

  };

  // useEffect(() => {
  //   setNumArr(numArr);
  // });

  return (
    <section className="viz-display">
      <button type="button" className="randomize-button" onClick={() => genRandomizedArr(200, 100)}>Generate new array</button>
      <button type="button" className="testing" onClick={() => sortData()}>Sort!</button>
      <ul className="display-nums">
        {numArr.map((val, index) => (
          <Bar key={index} length={val} selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'} />
        ))}
      </ul>

    </section>
  )
}