const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log('Invalid Format')
  console.log('Use correct format: node mongo.js <password> [person] [number]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kevinvong:${password}@cluster0.tcqqs07.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneBook = mongoose.model('Person', phoneBookSchema)

//node mongo.js yourpassword Anna 040-1234556
if (process.argv.length === 5) {
  const personName = process.argv[3] //format is string

  const personNumber = process.argv[4] //format is string
  //3rd arg must be string i.e starts with a quotation -> "Anna hubert"
  if (typeof personName !== 'string') {
    console.log("Please enter a valid 'string' for person name i.e. 'Albert Einstein'")
    process.exit(1)
  }

  //add to database
  mongoose
    .connect(url)
    .then(result => {
      const personEntry = new PhoneBook({
        name: personName,
        number: personNumber
      })

      return personEntry.save()
    })
    .then(() => {
      console.log(`added ${personName} ${personNumber} to phonebook`)
      return mongoose.connection.close()
    })
    .catch(err => console.log(err))
}

//node mongo.js yourpassword
if (process.argv.length === 3) {
  //ways to authenticate password? --> if program was able to connect to database

  mongoose
    .connect(url)
    .then(result => {
      console.log('phonebook:')
      PhoneBook
        .find({})
        .then(data => {
          data.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
          mongoose.connection.close()
        })
    })
}

