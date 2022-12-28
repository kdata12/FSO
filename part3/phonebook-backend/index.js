require('dotenv').config()
const express = require('express')
const cors = require('cors')

const People = require('./models/people')

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('build'))


app.get('/api/persons', (request, response) => {
    People.find({}).then(peopleData => {
        response.json(peopleData)
    })
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phone book has info for ${persons.length} people<p>
        <p> ${new Date} <p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    People.find({id: id}).then(result => {
        return response.json(result)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const deletePerson = getPerson(request)
    persons = persons.filter(p => p.id !== deletePerson.id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new People({
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        return response.json(result)
    })
})


const getPerson = (request) => {
    return persons.find(p => p.id === Number(request.params.id))
}

const PORT = 3001
app.listen(
    PORT,
    () => {
        console.log(`Starting server on port ${PORT}`)
        console.log(`http://localhost:${PORT}/api/persons`)
    }
)


