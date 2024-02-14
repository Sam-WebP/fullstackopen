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

import { useState } from "react"

const Button = ({ handleClick, text }) => (

  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

const [goodValue, setGood] = useState(0)
const [neutralValue, setNeutral] = useState(0)
const [badValue, setBad] = useState(0)

const handleGood = () => {
  const updatedValue = goodValue + 1
  setGood(updatedValue) 
}

const handleNeutral = () => {
  console.log("before neutral", neutralValue)
  const updatedValue = neutralValue + 1
  setNeutral(updatedValue) 
  console.log("after neutral", neutralValue)
}

const handleBad = () => {
  const updatedValue = badValue + 1
  setBad(updatedValue) 
}

return (
  <div>
    <h1>give feedback</h1>

    <Button handleClick={handleGood} text="good"/>
    <Button handleClick={handleNeutral} text="neutral"/>
    <Button handleClick={handleBad} text="bad"/>

    <h1>statistics</h1>
    <div>Good {goodValue}</div>
    <div>Neutral {neutralValue}</div>
    <div>bad {badValue}</div>

  </div>
  
)


}

export default App