import React from 'react'

const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

// The way to solve this is to break up the header, part names & exercises and the total into separate modules and then put them all together into the course

const Course = ({ course }) => {
  
  return (
    <>
        <h2>{course.name}</h2>

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