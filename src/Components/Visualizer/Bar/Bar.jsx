import React from 'react'
import './Bar.css'

export default function Bar(props) {
  const { length, selected } = props;
  const style = {
    height: '2px',
    width: `${length * 10}px`
  }
  return (
    <li style={style} className={selected} />
  );
}