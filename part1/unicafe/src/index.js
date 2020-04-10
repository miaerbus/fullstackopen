import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
  }

  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }

  const setToBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
