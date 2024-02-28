console.log("index.js running now")
import dotenv from 'dotenv'
dotenv.config();
console.log("This is right after the dotenv config in the index.js", process.env.MONGODB_URI);
import express from 'express'
import cors from 'cors'
import Person from './models/person.js'
const app = express()

let persons = [
  {
    "id": "5",
    "name": "Samuel Moran",
    "number": "0412988339"
  },
  {
    "name": "Arto Hellas",
    "number": "2134",
    "id": "1"
  },
  {
    "id": "6144",
    "name": "poreedanh",
    "number": "34534534535"
  },
  {
    "id": "8e31",
    "name": "Adding another one",
    "number": "34"
  },
  {
    "id": "050f",
    "name": "asdffsa fda asdf",
    "number": "342432"
  }
]

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   const person = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

//   persons = persons.concat(person)

//   response.json(person)
// })

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)
  
//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

// app.get('/api/persons', (request, response) => {
//   response.json(persons);
// });

app.delete('/api/persons/:id', (request, response) => {
  console.log("app.delete run")
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.statusMessage(204).end()
})

const PORT = process.env.PORT || 3001
console.log("Port being listened to is", PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})