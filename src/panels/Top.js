import React from 'react'
import { Link } from 'react-router-dom'
import { useSetPoint } from '../Store.jsx';

const Top = () => {
  const Point = useSetPoint((state)=>state.point)
  return (
    <div>
        <div>ПРИВЕТ</div>
        <Link  to='/'>ИДИ</Link>
        <a href='/'>Иди2</a>
        <div>{Point}</div>
    </div>
  )
}

export default Top