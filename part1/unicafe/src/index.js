import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistic = (props) => {
  const num =
    props.value % 1 !== 0 ? Math.round(props.value * 10) / 10 : props.value
      
  return (
    <tr>
      <td>{props.text}</td>
      <td>{num} {props.unit}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const average = (good + 0 * neutral + -1 * bad) / 3
  const positive = all !== 0 ? (good / all) * 100 : 0

  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic value={good} text="good" />
          <Statistic value={neutral} text="neutral" />
          <Statistic value={bad} text="bad" />
          <Statistic value={all} text="all" />
          <Statistic value={average} text="average" />
          <Statistic value={positive} text="positive" unit="%" />
        </tbody>
      </table>
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
