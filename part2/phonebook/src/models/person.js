console.log("persons.js being run now")
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

// const validateNumber = (num) => {
//   if (num[3] === '-' || num[2] === '-') {
//     return true
//   }
//   return false
// }

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
   name: {
    type: String,
    minLength: 3,
    required: true
   },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        const indexToCheck = v[2] === '-' ? 2 : v[3] === '-' ? 3 : null
        if (indexToCheck !== null) {
          return v.split('').every((char, index) => {
            if (index === indexToCheck) return char === '-'
            return char >= '0' && char <= '9'
          })
        }
        return false;
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Person', personSchema)