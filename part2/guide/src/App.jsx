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
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App