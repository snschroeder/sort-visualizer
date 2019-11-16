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
          <option value="merge-sort">merge sort</option>
          <option value="heap-sort">heap sort</option>
        </select>
        {/* <button type="submit" className="submit-button">Sort!</button> */}
      </form>
      <Visualizer sortType={sortType} />
    </>
  )
}

export default Search;