import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <Part part="Fundamentals of React" exercises="10"></Part>
      <Part part="Using props to pass data" exercises="7"></Part>
      <Part part="State of a component" exercises="14"></Part>
    </div>
  )
}

const Total = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Header course="Half Stack application development"></Header>
      <Content></Content>
      <Total></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
