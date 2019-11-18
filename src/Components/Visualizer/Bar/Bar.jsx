import React from 'react'
import './Bar.css'

export default function Bar(props) {
  const { length, selected, cursor } = props;
  const style = {
    height: '5px',
    width: `${length * 3.5}px`
  }

  let type = selected === 'selected' ? 'selected' : '';
  type = cursor === 'cursor' ? 'cursor' : type;

  return (
    <li style={style} className={type} />
  );
}