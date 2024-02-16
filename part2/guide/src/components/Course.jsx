import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const SubjectInfo = ({ parts }) => {
  return (
    <>
      {parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
    </>
  ) 
}

const Total = ({ parts }) => {
  return (
    <strong>
      total of {parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0,)} exercises
    </strong>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <SubjectInfo parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course