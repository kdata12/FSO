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
    People.find({}).then(peopleData => {
        response.json(peopleData)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    People.findById(id).then(result => {
        if (result) {
            return response.json(result)
        } else {
            return response.status(400).end()
        }
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    People.findByIdAndDelete(id)
        .then(result => {
            return response.json(result).status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body

    const person = new People({
        name: name,
        number: number,
    })

    person.save()
        .then(result => {
            return response.json(result)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const { name, number } = request.body

    const person = {
        name: name,
        number: number
    }

    People.findByIdAndUpdate(id, person, { new: true, runValidators: true })
        .then(newPerson => {
            response.json(newPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(
    PORT,
    () => {
        console.log(`Starting server on port ${PORT}`)
        console.log(`http://localhost:${PORT}/api/persons`)
    }
)


