import React, { useState } from 'react';
import Visualizer from '../Visualizer/Visualizer';
import './Search.css';

function Search() {
  const [sortType, setSortType] = useState('quick-sort');

  return (
    <>
      <form className="sort-form">
        <select className="search-select" onChange={(e) => setSortType(e.target.value)}>
          <option value="quick-sort">quick sort</option>
          <option value="bubble-sort">bubble sort</option>
          <option value="comb-sort">comb sort</option>
          <option value="selection-sort">selection sort</option>
          <option value="insertion-sort">insertion sort</option>
          <option value="heap-sort">heap sort</option>
        </select>
        {/* <button type="submit" className="submit-button">Sort!</button> */}
      </form>
      <Visualizer sortType={sortType} />
    </>
  )
}

export default Search;