import mongoose from 'mongoose'

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://samvcl:${password}@cluster0.14w7iqr.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

const typedName = process.argv[3]
const typedNumber = process.argv[4]

if (typedName === undefined || typedNumber === undefined) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
    const person = new Person({
      name: typedName,
      phone: typedNumber,
    })

    person.save().then(result => {
      console.log(`Added ${typedName} ${typedNumber} to phonebook`)
      mongoose.connection.close()
    })
}



