import React from 'react'
import './Bar.css'

export default function Bar(props) {
  const { length, selected, cursor, hSize, wSize } = props;

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