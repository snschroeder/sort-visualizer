import React, { useState, useEffect } from 'react';
import Bar from './Bar/Bar';
import sorts from '../../SortAlgs/sorts';
import './Visualizer.css'

export default function Visualizer(props) {

  // const [numArr, setNumArr] = useState([]);

  const [sortedArr, setSortedArr] = useState([]);

  const [randomizedArr, setRandomizedArr] = useState([]);

  const [pieceOne, setPieceOne] = useState(0);
  const [pieceTwo, setPieceTwo] = useState(0);

  const [merging, setMerging] = useState(false);

  const [cursor, setCursor] = useState(0);
  // const [anchor, setAnchor] = useState(0);

  const [sortOrder, setSortOrder] = useState([]);
  const { sortType } = props;

  const sort = [];

  const genRandomizedArr = (numVals, maxVal) => {
    let random = [];
    for (let i = 0; i <= numVals; i++) {
      random.push(Math.floor(Math.random() * maxVal));
    }
    setRandomizedArr(random);
    setSortedArr(random);
  }

  const sortData = () => {
    //let sorted = [];
    if (sortType === 'quick-sort') {
      setSortedArr(quickSort([...randomizedArr]));

    } else if (sortType === 'merge-sort') {
      setSortedArr(mergeSort([...randomizedArr]));
      setMerging(false);
      // } else if (sortType === 'heap-sort') {
      //   sorted = sorts.heapSort(numArr);
    }
    //setNumArr(sorted)
  }

  const quickSort = (arr, start = 0, end = arr.length) => {
    setTimeout(() => {
      setSortedArr(arr);

      if (start >= end) { return arr; }
      let pivot = partition(arr, start, end);
      quickSort(arr, start, pivot);
      quickSort(arr, pivot + 1, end);
      return arr;
    }, 3)
  };

  const partition = (arr, start, end) => {

    let pivot = arr[end - 1];
    let i = start;

    let j;
    for (j = start; j < end - 1; j++) {
      // setCursor(j);
      if (arr[j] <= pivot) {
        swap(arr, j, i);
        i++;
      }
      setTimeout(() => {
        j++;
      }, 1)
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
      sort.push(i);
      sort.push(j);
      setSortOrder([...sort]);
    }, 1);
  };

  const mergeSort = (arr) => {
    setTimeout(() => {
      setSortedArr(arr);
      setMerging(true);
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
    let sort = [...sortOrder]
    let clone = [...randomizedArr]
    sort.reverse();

    let i = 0;
    console.log(sort.length)

    for (let i = 0; i < sort.length; i++) {
      setTimeout(() => {
        let first = sort.pop();
        let second = sort.pop();
        setPieceOne(first);
        setPieceTwo(second);
        console.log(pieceOne);

        let temp = clone[pieceOne];
        clone[pieceOne] = clone[pieceTwo];
        clone[pieceTwo] = temp;
        console.log(clone);
        setRandomizedArr([...clone]);
      }, 100 + (100 * i))
    }
    // while (i < sort.length) {
    //   console.log('in the while');
    //   setInterval(() => {
    //     let first = sort.pop();
    //     let second = sort.pop();
    //     setPieceOne(first);
    //     setPieceTwo(second);
    //     console.log(pieceOne);

    //     let temp = clone[pieceOne];
    //     clone[pieceOne] = clone[pieceTwo];
    //     clone[pieceTwo] = temp;
    //     console.log(clone);
    //     setRandomizedArr([...clone]);
    //     i++;
    //   }, 10)
    // }
  }

  // useEffect(() => {
  //   animate();
  // });


  return (
    <section className="viz-display">
      <button type="button" className="randomize-button" onClick={() => genRandomizedArr(300, 250)}>Generate new array</button>
      <button type="button" className="testing" onClick={() => sortData()}>Sort!</button>
      <button type="button" className="animate" onClick={() => animate()}>Animate!</button>
      <ul className="display-nums">
        {sortedArr === undefined
          ? randomizedArr.map((val, index) => (
            <Bar
              key={index}
              length={val}
              selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'}
            // cursor={index === cursor ? 'cursor' : ''}
            />
          ))
          : sortedArr.map((val, index) => (
            <Bar
              key={index}
              length={val}
              selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'}
            />
          ))}
      </ul>

    </section>
  )
}