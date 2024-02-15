// import Note from "./components/Note"

// ./components/Note
 
//  const App = ({ notes }) => {

//   // const Note = ({ note }) => <li>{note.content}</li>
  
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(Note => 
//           <Note key={note.id} note={note}/>
//         )}
//       </ul>
//     </div>
//   )
// }

// export default App

import Course from "./components/Course"

const App = () => {
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

  return (
    <Course courses={courses} />
  )
}

export default App