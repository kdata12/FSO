const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Invalid Format')
  console.log('Use correct format: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kevinvong:${password}@cluster0.tcqqs07.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then(result => {
    Note
    .find({})
    .then(data => {
      data.forEach(note => {
        console.log(note) 
      })
      mongoose.connection.close()
    })
  })