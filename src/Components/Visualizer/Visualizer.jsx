import React, { useState, useEffect } from 'react';
import Bar from './Bar/Bar';
import './Visualizer.css'

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export default function Visualizer(props) {

  const [sortedArr, setSortedArr] = useState([]);
  const [randomizedArr, setRandomizedArr] = useState([]);

  const [pieceOne, setPieceOne] = useState(-1);
  const [pieceTwo, setPieceTwo] = useState(-1);

  const [sortOrder, setSortOrder] = useState([]);

  const [dimensions, setDimensions] = useState({
    hSize: 3,
    wSize: 1
  })

  const { sortType } = props;

  let sort = [];

  const determineScaling = (height, width) => {
    let h = dimensions.hSize;
    let w = dimensions.wSize;
    if (height <= 900) {
      h = 1;
    }

    if (width <= 500) {
      w = .6;
    }

    if (width > 500 && width <= 1000) {
      w = 1;
    }

    if (width > 1000 && width <= 1800) {
      w = 2.2;
    }

    if (width > 1800) {
      w = 3.5;
    }
    return {h, w}
  }

  useEffect(() => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    const dims = determineScaling(height, width);

    const h = dims.h;
    const w = dims.w;
    setDimensions({hSize: h, wSize: w});
    console.log(dimensions);
  }, [])

  useEffect(() => {

    const debouncedHandleResize = debounce(function handleResize() {
      let height = window.innerHeight;
      let width = window.innerWidth;

      const dims = determineScaling(height, width);

      const h = dims.h;
      const w = dims.w;

      setDimensions({
        hSize: h,
        wSize: w,
      })
      console.log(dimensions);
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })


  // let height = window.innerHeight;
  // let width = window.innerWidth;
  // let hSize = 3;
  // let wSize = 3.5

  // if (height <= 900) {
  //   hSize = 1;
  // }

  // if (width <= 500) {
  //   wSize = .6;
  // }

  // if (width > 500 && width <= 1200) {
  //   wSize = 1.5;
  // }

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
    setSortOrder([]);
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
        setSortOrder([...sort]);
      }
      arr[j + 1] = elem;
    }
    return arr;
  }

  const animate = () => {
    sortData();
    let pattern = sort.length === 0 ? [...sortOrder] : [...sort];
    let clone = [...randomizedArr];
    for (let i = 0; i < pattern.length; i += 2) {
      setTimeout(() => {
        let first = pattern[i];
        let second = pattern[i + 1];

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
              hSize={dimensions.hSize}
              wSize={dimensions.wSize}
              selected={index === pieceOne || index === pieceTwo ? 'selected' : 'not-selected'}
            />
          ))
          }
        </ul>
      </section>
    </>
  )
}