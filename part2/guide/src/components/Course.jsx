import React from 'react'

// const course = {
//     id: 1,
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       }
//     ]
//   }


// const Part = ({ parts }) => {
//   return (
//     <div>{course.parts.map(part => part.name)}</div>
//   )
// }

const Course = ({ course }) => {
  
  return (
    <>
        <h1>{course.name}</h1>

        {course.parts.map(parts => 
          <div key={parts.id}>
            {parts.name} {parts.exercises}
          </div>)}

        <div>
            total of {course.parts.map(parts => parts.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0,)} exercises     
        </div>
    </>
  )
}

export default Course