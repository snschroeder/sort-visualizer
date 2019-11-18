import React from 'react'
import './Bar.css'

export default function Bar(props) {
  const { length, selected, cursor } = props;

  let height = window.innerHeight;
  let width = window.innerWidth;
  let hSize = 3;
  let wSize = 3.5

  if (height <= 900) {
    hSize = 1;
  }

  if (width <= 500) {
    wSize = .75;
  }

  if (width <= 1200) {
    wSize = 2;
  }

  const style = {
    height: `${hSize}px`,
    width: `${wSize * length}px`
  }

  let type = selected === 'selected' ? 'selected' : '';
  type = cursor === 'cursor' ? 'cursor' : type;

  return (
    <li style={style} className={type} />
  );
}