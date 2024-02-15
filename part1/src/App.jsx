// const Header = ({ course }) => <h1>{course}</h1>;


// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.parts[0]}/>
//       <Part part={props.parts[1]}/>
//       <Part part={props.parts[2]}/>
//     </div>
//   );
// };

// const Part = (props) => {
//   return (
//     <p>
//       {props.part.name} {props.part.exercises}
//     </p> 
//   )
// }

// const Total = ({ exercises }) => {
//   const total = exercises.reduce((sum, part) => sum + part.exercises, 0);
//   return <p>Number of exercises {total}</p>;
// };

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts}/>
//       <Total exercises={course.parts}/>
//     </div>
//   );
// };

// export default App;

// import { useReducer, useState } from 'react'

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     setTotal(left + right)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     const updatedRight = right + 1
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   }

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='left' />
//       <Button handleClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks}/>
//     </div>
//   )
// }

// export default App

/////////////
// import { useState } from "react"

// const Display = props => <div>{props.value}</div>

// const Button = (props) => (
//   <button onClick={props.handleClick}>
//     {props.text}
//   </button>
// )

// const App = () => {
//   const [value, setValue] = useState(10)
  
//   // const setToValue = (newValue) => () => {
//   //   console.log('value now', newValue)  // print the new value to console
//   //   setValue(newValue)
//   // }

//   const setToValue = (newValue) => {
//     console.log('value now', newValue)
//     setValue(newValue)
//   }
  
//   return (
//     <div>
//       <Display value={value} />
//       <Button handleClick={() => setToValue(1000)} text="thousand" />
//       <Button handleClick={() => setToValue(0)} text="reset" />
//       <Button handleClick={() => setToValue(value + 1)} text="increment" />
//     </div>
//   )
// }

// export default App

///////////////////////////////////////////////////////

// import { useState } from "react"

// const Button = ({ handleClick, text}) => (

//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

// const App = () => {

// const [goodValue, setGood] = useState(0)
// const [neutralValue, setNeutral] = useState(0)
// const [badValue, setBad] = useState(0)
// const [averageValue, setAverage] = useState(0)
// const [totalValue, setTotal] = useState(0)
// const [positiveValue, setPositive] = useState(0)

// const handleGood = () => {
//   const updatedValue = goodValue + 1
//   setGood(updatedValue)
//   const total = updatedValue + neutralValue + badValue
//   setTotal(total)
//   setAverage(((updatedValue + (badValue * -1)) / total))
//   setPositive((updatedValue/total) * 100)
// }

// const handleNeutral = () => {
//   const updatedValue = neutralValue + 1
//   setNeutral(updatedValue) 
//   const total = goodValue + updatedValue + badValue
//   setTotal(total)
//   setAverage(((goodValue + (badValue * -1)) / total))
//   setPositive((goodValue/total) * 100)
// }

// const handleBad = () => {
//   const updatedValue = badValue + 1
//   setBad(updatedValue)
//   const total = goodValue + neutralValue + updatedValue
//   setTotal(total)
//   setAverage(((goodValue + (updatedValue * -1)) / total))
//   setPositive((goodValue/total) * 100)
// }

// return (
//   <div>
//     <h1>give feedback</h1>

//     <Button handleClick={handleGood} text="good"/>
//     <Button handleClick={handleNeutral} text="neutral"/>
//     <Button handleClick={handleBad} text="bad"/>

//     <h1>statistics</h1>
//     <div>Good {goodValue}</div>
//     <div>Neutral {neutralValue}</div>
//     <div>bad {badValue}</div>
//     <div>all {totalValue}</div>
//     <div>average {averageValue}</div>
//     <div>positive {positiveValue} %</div>

//   </div>
  
// )
// }

// export default App

import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => (
  <>
    <h1>statistics</h1>
    <div>Good {good}</div>
    <div>Neutral {neutral}</div>
    <div>Bad {bad}</div>
    <div>All {total}</div>
    <div>Average {average}</div>
    <div>Positive {positive} %</div>
  </>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good => good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral => neutral + 1)
  }

  const handleBad = () => {
    setBad(bad => bad + 1)
  }

  const total = good + neutral + bad
  const average = total === 0 ? 0 : ((good - bad) / total).toFixed(2)
  const positive = total === 0 ? 0 : ((good / total) * 100).toFixed(1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App
