import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector , useDispatch } from 'react-redux'
import {increment , decrement , incrementByAmount } from './src/features/counter/counterSlice'

function App() {
  const count = useSelector((state)=>state.counter.value)
  const dispatch = useDispatch()
  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Hello world!
        <div>counter : {count}</div>
        <button onClick={()=>dispatch(increment(count ))}>increment</button>
        <br />
        <button onClick={() => dispatch(decrement(count ))}>decrement</button>
        <br />
        <button onClick={() => dispatch(incrementByAmount(5))}>jump</button>
      </h1>
    </>
  )
}

export default App
